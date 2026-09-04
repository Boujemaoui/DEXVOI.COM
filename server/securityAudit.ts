import dns from 'node:dns/promises';
import { OsintSecurityAuditResult, SecurityHeaderItem, SecurityBreachItem } from '../src/types';

interface AuditOptions {
  target: string;
}

// Anti-SSRF check: block localhost, private subnets, cloud metadata
function isPrivateOrRestrictedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().trim();

  // Loopback and local domain checks
  if (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '0.0.0.0' ||
    host === '::1' ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    host.endsWith('.arpa') ||
    host.endsWith('.test') ||
    host.endsWith('.invalid')
  ) {
    return true;
  }

  // IPv4 regex checks
  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = host.match(ipv4Regex);
  if (match) {
    const octet1 = parseInt(match[1], 10);
    const octet2 = parseInt(match[2], 10);

    // 127.0.0.0/8
    if (octet1 === 127) return true;
    // 10.0.0.0/8
    if (octet1 === 10) return true;
    // 172.16.0.0/12
    if (octet1 === 172 && octet2 >= 16 && octet2 <= 31) return true;
    // 192.168.0.0/16
    if (octet1 === 192 && octet2 === 168) return true;
    // 169.254.0.0/16 (Link-local / Cloud Metadata)
    if (octet1 === 169 && octet2 === 254) return true;
    // 0.0.0.0/8
    if (octet1 === 0) return true;
  }

  return false;
}

export async function runRealSecurityAudit({ target }: AuditOptions): Promise<OsintSecurityAuditResult> {
  if (!target || typeof target !== 'string') {
    throw new Error('Debes indicar un nombre de dominio o URL válida.');
  }

  let cleanTarget = target.trim();
  // Strip spaces and surrounding quotes
  cleanTarget = cleanTarget.replace(/^["']|["']$/g, '');

  let urlObject: URL;
  try {
    if (!/^https?:\/\//i.test(cleanTarget)) {
      urlObject = new URL(`https://${cleanTarget}`);
    } else {
      urlObject = new URL(cleanTarget);
    }
  } catch (err) {
    throw new Error(`URL no válida: "${target}". Ingresa un formato como "ejemplo.com" o "https://ejemplo.com"`);
  }

  const hostname = urlObject.hostname;
  if (!hostname || hostname.length < 3 || !hostname.includes('.')) {
    throw new Error(`Dominio inválido: "${hostname}". Debe contener un formato de dominio completo (ej: midominio.com).`);
  }

  if (isPrivateOrRestrictedHost(hostname)) {
    throw new Error(`Acceso denegado: El destino "${hostname}" corresponde a una red privada o restringida.`);
  }

  // 1. DNS & OSINT Reconnaissance in parallel
  let ip: string | null = null;
  let ipFamily: string | null = null;
  let mxRecords: string[] = [];
  let hasSpf = false;
  let hasDmarc = false;
  let dmarcRecord: string | null = null;

  try {
    const dnsLookup = await dns.lookup(hostname).catch(() => null);
    if (dnsLookup) {
      ip = dnsLookup.address;
      ipFamily = dnsLookup.family === 6 ? 'IPv6' : 'IPv4';
    }
  } catch (e) {
    // lookup error
  }

  try {
    const mx = await dns.resolveMx(hostname).catch(() => []);
    mxRecords = mx
      .sort((a, b) => a.priority - b.priority)
      .slice(0, 3)
      .map(m => `${m.exchange} (prioridad ${m.priority})`);
  } catch (e) {
    mxRecords = [];
  }

  try {
    const txtRecords = await dns.resolveTxt(hostname).catch(() => []);
    const flatTxt = txtRecords.map(r => r.join(''));
    hasSpf = flatTxt.some(t => t.toLowerCase().includes('v=spf1'));
  } catch (e) {
    hasSpf = false;
  }

  try {
    const dmarcTxt = await dns.resolveTxt(`_dmarc.${hostname}`).catch(() => []);
    const flatDmarc = dmarcTxt.map(r => r.join(''));
    const found = flatDmarc.find(t => t.toLowerCase().includes('v=dmarc1'));
    if (found) {
      hasDmarc = true;
      dmarcRecord = found;
    }
  } catch (e) {
    hasDmarc = false;
  }

  // 2. Real HTTP Request & Header Inspection
  let responseTimeMs = 0;
  let httpStatus = 200;
  let isHttps = true;
  let effectiveUrl = urlObject.toString();
  const rawHeaders: Record<string, string> = {};

  const startTime = Date.now();
  try {
    let resp: Response;
    try {
      resp = await fetch(effectiveUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DexvoiSecurityAuditor/1.0 (Defensive Security Audit)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: AbortSignal.timeout(6500),
        redirect: 'follow',
      });
    } catch (httpsErr) {
      // If HTTPS fails, try HTTP
      if (effectiveUrl.startsWith('https://')) {
        const httpFallbackUrl = effectiveUrl.replace(/^https:\/\//, 'http://');
        resp = await fetch(httpFallbackUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DexvoiSecurityAuditor/1.0 (Defensive Security Audit)',
          },
          signal: AbortSignal.timeout(6500),
          redirect: 'follow',
        });
        isHttps = false;
        effectiveUrl = httpFallbackUrl;
      } else {
        throw httpsErr;
      }
    }

    responseTimeMs = Date.now() - startTime;
    httpStatus = resp.status;
    isHttps = resp.url.startsWith('https://');
    effectiveUrl = resp.url;

    resp.headers.forEach((val, key) => {
      rawHeaders[key.toLowerCase()] = val;
    });
  } catch (netErr: any) {
    throw new Error(
      `No se pudo conectar con "${hostname}" (${netErr?.message || 'Tiempo de espera agotado'}). Verifica que el dominio esté activo y responda públicamente.`
    );
  }

  // 3. Tech stack identification (OSINT Passive Fingerprinting)
  const detectedTech: string[] = [];
  const serverBanner = rawHeaders['server'] || null;
  const poweredBy = rawHeaders['x-powered-by'] || null;

  if (serverBanner) detectedTech.push(`Servidor: ${serverBanner}`);
  if (poweredBy) detectedTech.push(`Framework: ${poweredBy}`);
  if (rawHeaders['cf-ray']) detectedTech.push('CDN: Cloudflare Perimeter');
  if (rawHeaders['x-vercel-id']) detectedTech.push('Infraestructura: Vercel Edge');
  if (rawHeaders['x-amz-cf-id']) detectedTech.push('CDN: Amazon CloudFront');
  if (rawHeaders['x-sucuri-id']) detectedTech.push('WAF: Sucuri Firewall');

  // 4. Detailed Header Analysis
  const headersList: SecurityHeaderItem[] = [];
  const breaches: SecurityBreachItem[] = [];
  let score = 100;

  // Header: Strict-Transport-Security (HSTS)
  const hstsVal = rawHeaders['strict-transport-security'];
  if (!hstsVal) {
    score -= 20;
    headersList.push({
      name: 'HTTP Strict Transport Security (HSTS)',
      headerKey: 'Strict-Transport-Security',
      value: null,
      status: 'FAIL',
      importance: 'CRÍTICA',
      description: 'Obliga a los navegadores a conectarse únicamente a través de HTTPS cifrado.',
      impact: 'Riesgo alto de ataques Man-in-the-Middle (MitM) y degradación SSL en redes Wi-Fi públicas.',
      recommendation: 'Configurar cabecera con max-age=31536000 e includeSubDomains.'
    });
    breaches.push({
      id: 'SEC-HSTS-01',
      title: 'Ausencia de HSTS (Riesgo MitM y Downgrade Attack)',
      severity: 'CRITICAL',
      category: 'Cabeceras',
      description: 'El servidor no envía la directiva Strict-Transport-Security, permitiendo que un atacante intercepte la primera petición en texto plano.',
      impact: 'Un intermediario puede forzar conexiones HTTP inseguras para capturar credenciales o cookies de sesión.',
      remediation: 'Añadir: Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"'
    });
  } else {
    const hasLongMaxAge = /max-age=(\d+)/i.test(hstsVal);
    const maxAgeMatch = hstsVal.match(/max-age=(\d+)/i);
    const maxAgeNum = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 0;

    if (maxAgeNum < 10886400) {
      score -= 8;
      headersList.push({
        name: 'HTTP Strict Transport Security (HSTS)',
        headerKey: 'Strict-Transport-Security',
        value: hstsVal,
        status: 'WARN',
        importance: 'CRÍTICA',
        description: 'HSTS está presente pero su duración es inferior a 6 meses recomendados.',
        impact: 'Periodo de blindaje insuficiente según directrices OWASP.',
        recommendation: 'Aumentar max-age a mínimo 31536000 (1 año) y considerar preload.'
      });
    } else {
      headersList.push({
        name: 'HTTP Strict Transport Security (HSTS)',
        headerKey: 'Strict-Transport-Security',
        value: hstsVal,
        status: 'PASS',
        importance: 'CRÍTICA',
        description: 'Protección HTTPS forzada correctamente activada.',
        impact: 'Previene secuestro de conexiones y degradación de protocolo.',
        recommendation: 'Mantener la directiva actualizada.'
      });
    }
  }

  // Header: Content-Security-Policy (CSP)
  const cspVal = rawHeaders['content-security-policy'];
  if (!cspVal) {
    score -= 22;
    headersList.push({
      name: 'Content Security Policy (CSP)',
      headerKey: 'Content-Security-Policy',
      value: null,
      status: 'FAIL',
      importance: 'CRÍTICA',
      description: 'Controla qué orígenes de scripts, imágenes y conexiones están permitidos.',
      impact: 'Vulnerabilidad ante Cross-Site Scripting (XSS), inyección de scripts y robo de tokens.',
      recommendation: 'Implementar una política CSP estricta con default-src \'self\'.'
    });
    breaches.push({
      id: 'SEC-CSP-02',
      title: 'Falta de Content Security Policy (Sin protección anti-XSS)',
      severity: 'CRITICAL',
      category: 'Cabeceras',
      description: 'El sitio carece de Content-Security-Policy, permitiendo la ejecución irrestricta de scripts externos si existe una vulnerabilidad en el código.',
      impact: 'Inyección de malware, robo de cookies de autenticación o manipulación del DOM.',
      remediation: 'Definir directiva Content-Security-Policy especificando dominios de script autorizados.'
    });
  } else if (cspVal.includes('unsafe-inline') || cspVal.includes('unsafe-eval')) {
    score -= 8;
    headersList.push({
      name: 'Content Security Policy (CSP)',
      headerKey: 'Content-Security-Policy',
      value: cspVal.length > 80 ? cspVal.slice(0, 80) + '...' : cspVal,
      status: 'WARN',
      importance: 'CRÍTICA',
      description: 'CSP detectada, pero contiene directivas permisivas (unsafe-inline o unsafe-eval).',
      impact: 'Reduce significativamente la efectividad de la mitigación contra ataques XSS.',
      recommendation: 'Sustituir unsafe-inline por hashes criptográficos (sha256) o nonces.'
    });
  } else {
    headersList.push({
      name: 'Content Security Policy (CSP)',
      headerKey: 'Content-Security-Policy',
      value: cspVal.length > 80 ? cspVal.slice(0, 80) + '...' : cspVal,
      status: 'PASS',
      importance: 'CRÍTICA',
      description: 'Política perimetral de scripts y recursos activa.',
      impact: 'Bloquea la inyección y ejecución de orígenes de datos no confiables.',
      recommendation: 'Revisar periódicamente los orígenes permitidos.'
    });
  }

  // Header: X-Frame-Options
  const xfoVal = rawHeaders['x-frame-options'];
  if (!xfoVal) {
    score -= 15;
    headersList.push({
      name: 'X-Frame-Options (Protección Anti-Clickjacking)',
      headerKey: 'X-Frame-Options',
      value: null,
      status: 'FAIL',
      importance: 'ALTA',
      description: 'Impide que otros sitios web incrusten tu página dentro de un iframe.',
      impact: 'Riesgo de Clickjacking: atacantes pueden engañar a usuarios para ejecutar clics involuntarios.',
      recommendation: 'Configurar cabecera con valor DENY o SAMEORIGIN.'
    });
    breaches.push({
      id: 'SEC-XFO-03',
      title: 'Vulnerabilidad de Clickjacking (Iframe Framing desprotegido)',
      severity: 'HIGH',
      category: 'Cabeceras',
      description: 'El portal no restringe el enmarcado de su interfaz en páginas web de terceros.',
      impact: 'Un atacante puede superponer botones transparentes sobre el sitio web para capturar clics de reservas o transferencias.',
      remediation: 'Añadir: X-Frame-Options "SAMEORIGIN"'
    });
  } else {
    const normalized = xfoVal.toUpperCase();
    if (normalized.includes('DENY') || normalized.includes('SAMEORIGIN')) {
      headersList.push({
        name: 'X-Frame-Options (Protección Anti-Clickjacking)',
        headerKey: 'X-Frame-Options',
        value: xfoVal,
        status: 'PASS',
        importance: 'ALTA',
        description: 'Enmarcado restringido correctamente.',
        impact: 'Protege contra secuestro de clics y camuflaje visual de interfaces.',
        recommendation: 'Correctamente configurado.'
      });
    } else {
      headersList.push({
        name: 'X-Frame-Options',
        headerKey: 'X-Frame-Options',
        value: xfoVal,
        status: 'WARN',
        importance: 'ALTA',
        description: 'Valor de cabecera inusual o no estándar.',
        impact: 'Podría no ser respetado uniformemente por todos los navegadores modernos.',
        recommendation: 'Usar DENY o SAMEORIGIN.'
      });
    }
  }

  // Header: X-Content-Type-Options
  const xctoVal = rawHeaders['x-content-type-options'];
  if (!xctoVal || !xctoVal.toLowerCase().includes('nosniff')) {
    score -= 12;
    headersList.push({
      name: 'X-Content-Type-Options (Anti-MIME Sniffing)',
      headerKey: 'X-Content-Type-Options',
      value: xctoVal || null,
      status: 'FAIL',
      importance: 'ALTA',
      description: 'Evita que el navegador intente adivinar el tipo MIME de los archivos descargados.',
      impact: 'Riesgo de ataques de confusión de tipo y ejecución de scripts camuflados en imágenes.',
      recommendation: 'Añadir: X-Content-Type-Options "nosniff".'
    });
    breaches.push({
      id: 'SEC-XCTO-04',
      title: 'Ausencia de Protección Anti-MIME Sniffing',
      severity: 'MEDIUM',
      category: 'Cabeceras',
      description: 'Sin la directiva nosniff, el navegador puede interpretar respuestas que no son ejecutables como HTML o JavaScript.',
      impact: 'Riesgo de ejecución de código en subidas de imágenes o archivos estáticos.',
      remediation: 'Añadir: X-Content-Type-Options "nosniff"'
    });
  } else {
    headersList.push({
      name: 'X-Content-Type-Options (Anti-MIME Sniffing)',
      headerKey: 'X-Content-Type-Options',
      value: xctoVal,
      status: 'PASS',
      importance: 'ALTA',
      description: 'El navegador respeta estrictamente los tipos MIME declarados.',
      impact: 'Invalida ataques de Drive-by download y ejecución de payloads disfrazados.',
      recommendation: 'Correctamente configurado.'
    });
  }

  // Header: Referrer-Policy
  const refPolVal = rawHeaders['referrer-policy'];
  if (!refPolVal) {
    score -= 8;
    headersList.push({
      name: 'Referrer-Policy (Privacidad de Navegación)',
      headerKey: 'Referrer-Policy',
      value: null,
      status: 'WARN',
      importance: 'MEDIA',
      description: 'Controla cuánta información de referencia (URL previa) se transmite a enlaces externos.',
      impact: 'Fuga de parámetros privados en URLs (tokens, IDs de cliente, términos de búsqueda).',
      recommendation: 'Establecer: Referrer-Policy "strict-origin-when-cross-origin".'
    });
  } else {
    headersList.push({
      name: 'Referrer-Policy (Privacidad de Navegación)',
      headerKey: 'Referrer-Policy',
      value: refPolVal,
      status: 'PASS',
      importance: 'MEDIA',
      description: 'Política de transmisión de procedencia definida.',
      impact: 'Protege la privacidad de las rutas internas de la empresa.',
      recommendation: 'Mantener la política actual.'
    });
  }

  // Header: Permissions-Policy
  const permPolVal = rawHeaders['permissions-policy'] || rawHeaders['feature-policy'];
  if (!permPolVal) {
    score -= 6;
    headersList.push({
      name: 'Permissions-Policy (Control de Sensores y Hardware)',
      headerKey: 'Permissions-Policy',
      value: null,
      status: 'WARN',
      importance: 'MEDIA',
      description: 'Restringe el acceso a cámara, micrófono, geolocalización y acelerómetro.',
      impact: 'APIs sensibles del dispositivo no están explícitamente bloqueadas para iframes y terceros.',
      recommendation: 'Añadir directiva Permissions-Policy restringiendo geolocation=(), camera=(), microphone=().'
    });
  } else {
    headersList.push({
      name: 'Permissions-Policy (Control de Hardware)',
      headerKey: 'Permissions-Policy',
      value: permPolVal.length > 70 ? permPolVal.slice(0, 70) + '...' : permPolVal,
      status: 'PASS',
      importance: 'MEDIA',
      description: 'Acceso a hardware del navegador controlado por cabecera.',
      impact: 'Evita abusos de permisos por parte de librerías de tracking.',
      recommendation: 'Configurado correctamente.'
    });
  }

  // OSINT Check: Server / X-Powered-By Information Leakage
  if (serverBanner && /\d+\.\d+/i.test(serverBanner)) {
    score -= 7;
    headersList.push({
      name: 'Ocultación de Versión del Servidor',
      headerKey: 'Server',
      value: serverBanner,
      status: 'WARN',
      importance: 'ALTA',
      description: 'El servidor expone públicamente el software exacto y su número de versión.',
      impact: 'Facilita a atacantes el reconocimiento de vulnerabilidades públicas (CVEs) para atacar esa versión.',
      recommendation: 'Ocultar tokens de versión con server_tokens off (Nginx) o ServerTokens Prod (Apache).'
    });
    breaches.push({
      id: 'OSINT-LEAK-05',
      title: 'Fuga de Información de Versión del Servidor (Server Banner Leak)',
      severity: 'MEDIUM',
      category: 'OSINT',
      description: `La cabecera 'Server' expone públicamente el banner "${serverBanner}".`,
      impact: 'Permite a escáneres automatizados identificar vulnerabilidades sin parchear específicas de este software.',
      remediation: 'Desactivar la divulgación de versión en la configuración del servidor web.'
    });
  } else if (serverBanner) {
    headersList.push({
      name: 'Cabecera de Servidor',
      headerKey: 'Server',
      value: serverBanner,
      status: 'PASS',
      importance: 'MEDIA',
      description: 'Servidor genérico o protegido por CDN perimetral.',
      impact: 'No revela versiones específicas vulnerables.',
      recommendation: 'Mantener configuración opaca.'
    });
  }

  if (poweredBy) {
    score -= 6;
    headersList.push({
      name: 'Ocultación de Framework (X-Powered-By)',
      headerKey: 'X-Powered-By',
      value: poweredBy,
      status: 'WARN',
      importance: 'MEDIA',
      description: `Revela el motor de backend: ${poweredBy}.`,
      impact: 'Permite acotar ataques dirigidos contra el lenguaje o framework de desarrollo.',
      recommendation: 'Eliminar la cabecera X-Powered-By de las respuestas del servidor.'
    });
  }

  // OSINT Check: SPF / DMARC Email Spoofing Defense
  if (!hasDmarc) {
    score -= 10;
    breaches.push({
      id: 'OSINT-MAIL-06',
      title: 'Sin Protección DMARC (Riesgo de Suplantación de Identidad / Phishing)',
      severity: 'HIGH',
      category: 'Email Spoofing',
      description: 'El dominio no tiene publicado un registro _dmarc en sus registros DNS públicos.',
      impact: 'Cualquier ciberdelincuente puede enviar correos fraudulentos en nombre de la empresa a sus clientes.',
      remediation: 'Publicar registro TXT en _dmarc.tudominio.com con política p=quarantine o p=reject.'
    });
  }

  if (!hasSpf) {
    score -= 6;
    breaches.push({
      id: 'OSINT-MAIL-07',
      title: 'Registro SPF No Detectado',
      severity: 'MEDIUM',
      category: 'Email Spoofing',
      description: 'No se detectó registro TXT v=spf1 que declare qué servidores pueden enviar correo legítimo.',
      impact: 'Los correos de la empresa pueden caer en spam y facilita el spoofing de identidad.',
      remediation: 'Añadir registro TXT SPF autorizando únicamente los servidores de correo legítimos.'
    });
  }

  // Final score clamping
  score = Math.max(18, Math.min(100, score));

  // Grade calculation
  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  if (score >= 95) grade = 'A+';
  else if (score >= 85) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 55) grade = 'C';
  else if (score >= 40) grade = 'D';
  else grade = 'F';

  // Summary counts
  const passed = headersList.filter(h => h.status === 'PASS').length;
  const warnings = headersList.filter(h => h.status === 'WARN').length;
  const failed = headersList.filter(h => h.status === 'FAIL').length;

  // Remediation Scripts (Ready to deploy)
  const remediationScriptNginx = `# ==============================================================================
# SCRIPT DE BLINDAJE DE CABECERAS DEXVOI - NGX_DEFENSE_V4
# Pegar dentro del bloque server { ... } en tu configuración de Nginx
# ==============================================================================

# 1. HSTS (Strict-Transport-Security) - 1 año con subdominios
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# 2. X-Frame-Options (Protección Anti-Clickjacking)
add_header X-Frame-Options "SAMEORIGIN" always;

# 3. X-Content-Type-Options (Protección Anti-MIME Sniffing)
add_header X-Content-Type-Options "nosniff" always;

# 4. Referrer-Policy (Privacidad de navegación)
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# 5. Permissions-Policy (Restricción de hardware no autorizado)
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;

# 6. Content-Security-Policy (CSP Base)
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:;" always;

# 7. Ocultar versión del servidor Nginx (Anti-OSINT Reconnaissance)
server_tokens off;
`;

  const remediationScriptApache = `# ==============================================================================
# SCRIPT DE BLINDAJE DE CABECERAS DEXVOI - APACHE_DEFENSE_V4
# Pegar en el archivo .htaccess en la raíz de tu sitio web
# ==============================================================================
<IfModule mod_headers.c>
  # 1. HSTS
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  
  # 2. Anti-Clickjacking
  Header always set X-Frame-Options "SAMEORIGIN"
  
  # 3. Anti-MIME Sniffing
  Header always set X-Content-Type-Options "nosniff"
  
  # 4. Referrer Policy
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  
  # 5. Permissions Policy
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  
  # 6. Eliminar X-Powered-By
  Header unset X-Powered-By
</IfModule>

# Ocultar versión de Apache
ServerSignature Off
`;

  return {
    target,
    normalizedUrl: effectiveUrl,
    timestamp: new Date().toISOString(),
    responseTimeMs,
    httpStatus,
    isHttps,
    score,
    grade,
    osint: {
      ip,
      ipFamily,
      serverBanner,
      poweredBy,
      detectedTech,
      mxRecords,
      hasSpf,
      hasDmarc,
      dmarcRecord,
    },
    headers: headersList,
    breaches,
    remediationScriptNginx,
    remediationScriptApache,
    summary: {
      passed,
      warnings,
      failed,
      total: headersList.length,
    }
  };
}
