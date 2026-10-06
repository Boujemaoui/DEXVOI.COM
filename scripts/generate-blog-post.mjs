import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const topicsPool = [
  {
    topic: 'Cabeceras HTTP de Seguridad para Clínicas y Restaurantes: HSTS, CSP y Permissions-Policy',
    category: 'ciberseguridad',
    categoryLabel: 'Ciberseguridad & Compliance',
    tags: ['Cabeceras HTTP', 'HSTS', 'CSP', 'Seguridad Web', 'OWASP'],
    readingTimeMinutes: 7,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Guía técnica para directores médicos y hosteleros: configuración de cabeceras HSTS, CSP y permisos perimetrales para evitar ciberataques.',
    content: `
## La primera línea de defensa perimetral: Cabeceras HTTP

Cuando un navegador solicita tu página web, el servidor responde no solo con el código visual, sino con un conjunto de instrucciones de seguridad conocidas como **cabeceras de respuesta HTTP**.

Para una clínica privada que maneja datos médicos o un restaurante con reservas exclusivas, omitir estas cabeceras es equivalente a dejar la puerta del servidor abierta.

---

### Las 4 cabeceras obligatorias que auditamos en Dexvoi

1. **Strict-Transport-Security (HSTS):** Fuerza la conexión encriptada HTTPS durante 1 año (\`max-age=31536000; includeSubDomains; preload\`), anulando ataques de degradación SSL (*SSL Stripping*).
2. **Content-Security-Policy (CSP):** Restringe las fuentes desde donde el navegador puede cargar scripts, estilos e imágenes, bloqueando el 99% de inyecciones XSS.
3. **X-Frame-Options:** Establecida en \`DENY\` o \`SAMEORIGIN\` para evitar ataques de *Clickjacking* en tus formularios de contacto.
4. **X-Content-Type-Options:** Fijada en \`nosniff\` para impedir que navegadores ejecuten archivos adjuntos maliciosos haciéndose pasar por imágenes.

---

### Diagnóstico perimetral con Dexvoi

En **Dexvoi** integramos estas directivas de forma nativa en la capa perimetral (Edge CDN), protegiendo tu plataforma sin añadir latencia.
    `
  },
  {
    topic: 'Cómo evitar reseñas falsas y sabotaje de reputación en Google Maps para Alta Gastronomía',
    category: 'seo-local',
    categoryLabel: 'SEO Local & Google Maps',
    tags: ['Reputación Digital', 'Google Maps', 'Reseñas Falsas', 'SEO Restaurantes'],
    readingTimeMinutes: 6,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Estrategias legales y técnicas para detectar, impugnar y eliminar reseñas maliciosas en Google Business Profile para restaurantes de alta cocina.',
    content: `
## El impacto destructivo de una reseña falsa de 1 estrella

Para un restaurante gastronómico donde el ticket medio supera los 60€, **una sola reseña negativa falsa puede costar miles de euros al mes en comensales perdidos**.

Muchos competidores desleales o bots automáticos publican valoraciones sin haber pisado jamás el establecimiento.

---

### Protocolo de respuesta e impugnación ante Google

1. **Monitoreo perimetral 24/7:** Detección en menos de 15 minutos de cualquier valoración anómala mediante alertas API.
2. **Impugnación por infracción de políticas de contenido:** Solicitud de retirada por conflicto de interés, contenido promocional o difamación comercial según los términos de Google.
3. **Estrategia proactiva de reseñas verificadas:** Automatización de recordatorios pos-servicio para diluir el impacto de cualquier reseña aislada.
    `
  },
  {
    topic: 'Core Web Vitals INP y LCP en 2026: Cómo Dexvoi logra tiempos de carga bajo 300ms',
    category: 'arquitectura-web',
    categoryLabel: 'Arquitectura Web & Rendimiento',
    tags: ['Core Web Vitals', 'INP', 'LCP', 'Jamstack', 'Velocidad Web'],
    readingTimeMinutes: 8,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Cómo optimizar Interaction to Next Paint (INP) y Largest Contentful Paint (LCP) para lograr puntuaciones perfectas de 100/100 en Google PageSpeed.',
    content: `
## La velocidad web como factor decisivo de posicionamiento y conversión

En 2026, Google penaliza severamente las páginas lentas. La métrica **INP (Interaction to Next Paint)** mide la capacidad de respuesta de la web ante clics del usuario, sustituyendo al antiguo FID.

---

### Cómo pasamos de 4 segundos a 250 milisegundos

- **Eliminación de monolitos pesados:** Sustitución de CMS basados en PHP por arquitecturas estáticas compiladas en Edge CDN.
- **Optimización de imágenes WebP/AVIF con compresión sin pérdidas:** Reducción de hasta un 85% del peso de los recursos visuales.
- **División inteligente de código (Code Splitting):** Carga única y exclusiva de los componentes necesarios para la vista activa.
    `
  },
  {
    topic: 'Inteligencia de Datos y Agentes de IA en Motores de Reservas sin Comisiones',
    category: 'ia-reservas',
    categoryLabel: 'IA & Automatización',
    tags: ['IA Conversacional', 'Motores Propietarios', 'Sin Comisiones', 'Fidelización'],
    readingTimeMinutes: 7,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Por qué sustituir plataformas comisionistas por agentes conversacionales de IA propios multiplica el margen neto en restaurantes y clínicas.',
    content: `
## La soberanía sobre tus clientes: Por qué prescindir de comisionistas

Pagar entre un 15% y un 25% a plataformas agregadoras por reservas de clientes recurrentes erosiona el modelo de negocio de cualquier clínica o restaurante gastronómico.

---

### La solución de automatización autónoma Dexvoi

- Integración directa en WhatsApp y web con comprensión de lenguaje natural.
- Sincronización en tiempo real con agendas médicas o planos de sala sin latencia.
- Propiedad íntegra de la base de datos de pacientes y comensales bajo estricto cumplimiento RGPD.
    `
  },
  {
    topic: 'Blindaje DNS y Mitigación de Spoofing con SPF, DKIM y DMARC en Empresas',
    category: 'ciberseguridad',
    categoryLabel: 'Ciberseguridad & Compliance',
    tags: ['Seguridad DNS', 'DMARC', 'SPF', 'DKIM', 'Anti-Phishing'],
    readingTimeMinutes: 6,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Guía técnica para evitar la suplantación de identidad corporativa y asegurar la entregabilidad de correo electrónico con registros DNS criptográficos.',
    content: `
## La amenaza invisible de la suplantación de identidad corporativa

El 91% de los ciberataques contra empresas inician mediante correos electrónicos con remitentes falsificados que imitan el dominio oficial de la compañía.

---

### La tríada obligatoria de blindaje DNS

1. **SPF (Sender Policy Framework):** Especifica qué servidores perimetrales tienen autorización para enviar correo a nombre de tu dominio.
2. **DKIM (DomainKeys Identified Mail):** Firma criptográfica asimétrica que valida que el contenido del mensaje no fue alterado durante el tránsito.
3. **DMARC (Domain-based Message Authentication):** Instrucción formal para que los receptores rechacen de plano (\`p=reject\`) cualquier correo no autenticado.

---

### Protocolo de implantación perimetral Dexvoi

Configuramos las directivas DMARC en modo rechazo estricto con informes forenses agregados (RUA/RUF) para neutralizar cualquier intento de suplantación.
    `
  },
  {
    topic: 'Dominar el Local Pack de 3 en Google Maps para Clínicas Odontológicas y Médicas',
    category: 'seo-local',
    categoryLabel: 'SEO Local & Google Maps',
    tags: ['Google Maps', 'SEO Clínicas', 'Local Pack', 'Captación Pacientes'],
    readingTimeMinutes: 8,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Estrategias de arquitectura de datos y optimización de señales locales para posicionar tu clínica en los tres primeros resultados de Google Maps.',
    content: `
## El 70% de las citas médicas privadas se deciden en el Local Pack de Google

Cuando un paciente busca "implantología dental urgente" o "dermatólogo privado cerca de mí", Google muestra únicamente los 3 perfiles locales más relevantes. Aparecer en la cuarta posición significa invisibilidad comercial.

---

### Los 4 factores determinantes del algoritmo local

- **Consistencia NAP (Name, Address, Phone):** Exactitud milimétrica de datos en directorios médicos autorizados.
- **Categorización primaria y secundaria:** Selección precisa de especialidades médicas sin canibalización.
- **Geocodificación y metadatos EXIF:** Contenido fotográfico verificado con coordenadas geoespaciales.
- **Flujo constante de reseñas con palabras clave:** Opiniones verificadas que mencionan tratamientos concretos.
    `
  },
  {
    topic: 'Arquitectura Jamstack vs Monolitos WordPress: Comparativa de Rendimiento y Seguridad 2026',
    category: 'arquitectura-web',
    categoryLabel: 'Arquitectura Web & Rendimiento',
    tags: ['Jamstack', 'WordPress', 'Seguridad Web', 'Core Web Vitals'],
    readingTimeMinutes: 7,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Análisis forense de por qué los CMS monolíticos son el principal vector de vulnerabilidades y lentitud, y cómo la arquitectura desacoplada resuelve el problema.',
    content: `
## El fin de la era monolítica en proyectos digitales de alto nivel

Más del 85% de las vulnerabilidades web explotadas en negocios medianos provienen de plugins desactualizados y bases de datos SQL expuestas en arquitecturas WordPress tradicionales.

---

### Ventajas tangibles de la arquitectura desacoplada Dexvoi

- **Superficie de ataque reducida a cero:** Sin bases de datos SQL en frontend ni paneles de administración expuestos a ataques de fuerza bruta.
- **Distribución Edge global:** Los archivos estáticos pre-renderizados se sirven desde más de 300 centros de datos Cloudflare en menos de 50ms.
- **Costes de mantenimiento predecibles:** Sin necesidad de parches de emergencia semanales ni plugins pesados de seguridad.
    `
  },
  {
    topic: 'Protocolo Zero-Trust para Clínicas Médicas: Protección de Historias Clínicas ante Ransomware',
    category: 'ciberseguridad',
    categoryLabel: 'Ciberseguridad & Compliance',
    tags: ['Zero-Trust', 'RGPD Clínicas', 'Ciberseguridad Médica', 'Ransomware'],
    readingTimeMinutes: 8,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Cómo implementar el modelo de Confianza Cero en entornos de salud privados para blindar el expediente clínico bajo estándares RGPD y ENS.',
    content: `
## Los datos médicos son el activo más codiciado en la Dark Web

El historial clínico de un paciente contiene información inalterable: diagnósticos, medicación y datos identificativos. En el mercado negro, un registro de salud cotiza hasta 50 veces más que un número de tarjeta de crédito.

---

### Principios del modelo Zero-Trust aplicado a clínicas

1. **Nunca confiar, siempre verificar:** Autenticación multifactorial (MFA) obligatoria para todo el personal asistencial.
2. **Mínimo privilegio de acceso (RBAC):** Cada facultativo accede exclusivamente a los expedientes de sus pacientes asignados.
3. **Microsegmentación de red perimetral:** Los dispositivos médicos de diagnóstico por imagen operan aislados de la red wifi de invitados y administración.
    `
  },
  {
    topic: 'Optimización de Fichas de Google Business Profile para Restaurantes con Estrella Michelin',
    category: 'seo-local',
    categoryLabel: 'SEO Local & Google Maps',
    tags: ['Google Maps Gastronomía', 'SEO Local', 'Restaurantes Michelin', 'Conversión'],
    readingTimeMinutes: 7,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Estrategias de posicionamiento en Google Maps para establecimientos de alta cocina: cartas dinámicas, fotos verificadas y conversión directa sin intermediarios.',
    content: `
## La primera impresión gastronómica ocurre en el mapa antes que en la mesa

Los comensales internacionales y locales descubren restaurantes de alta gama navegando por Google Maps. Una ficha desactualizada o con fotos de baja calidad destruye la percepción de excelencia.

---

### Pilares de optimización de marca gastronómica

- **Enlace oficial de reserva directa:** Desvío de tráfico hacia el motor de reservas propio evitando comisiones de plataformas intermediarias.
- **Metadatos de atributos gastronómicos:** Especificación exacta de menús degustación, bodega, maridaje y accesibilidad.
- **Actualización de platos de temporada con geolocalización:** Cada fotografía subida debe contener etiquetas descriptivas alineadas con la carta actual.
    `
  },
  {
    topic: 'Tiempo de Respuesta TTFB bajo 100ms en Edge Global: La Clave Oculta del SEO Técnico',
    category: 'arquitectura-web',
    categoryLabel: 'Arquitectura Web & Rendimiento',
    tags: ['TTFB', 'Edge Computing', 'Cloudflare Workers', 'SEO Técnico'],
    readingTimeMinutes: 6,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Análisis técnico del Time to First Byte (TTFB) y cómo la computación en el Edge elimina la latencia geográfica para maximizar el rastreo de Googlebot.',
    content: `
## Qué es el TTFB y por qué Googlebot abandona las webs lentas

El Time to First Byte mide el tiempo que transcurre desde que el cliente solicita una página hasta que recibe el primer byte de datos del servidor. Un TTFB superior a 600ms frena en seco el presupuesto de rastreo (*crawl budget*).

---

### Soluciones de arquitectura perimetral Dexvoi

- **Caché en Edge Anycast:** Los contenidos se almacenan en más de 300 puntos de presencia globales, respondiendo al usuario desde el centro de datos más próximo.
- **Compresión Brotli nivel 11:** Reducción de tamaño de carga superior a gzip convencional sin sobrecargar la CPU del servidor.
- **Cero consultas bloqueantes a bases de datos relacionales:** Precompilación estática de assets y aislamiento de funciones dinámicas en microservicios serverless.
    `
  },
  {
    topic: 'Auditoría de Ciberseguridad OWASP Top 10 para Negocios con Pasarelas de Pago Online',
    category: 'ciberseguridad',
    categoryLabel: 'Ciberseguridad & Compliance',
    tags: ['OWASP Top 10', 'Pasarelas de Pago', 'Stripe', 'Seguridad PCI-DSS'],
    readingTimeMinutes: 8,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Cómo blindar los procesos de checkout online frente a ataques de skimming digital, inyecciones SQL y robo de credenciales bancarias.',
    content: `
## El riesgo de Magecart y el robo de credenciales en el checkout

El secuestro de formularios digitales (*formjacking*) permite a ciberdelincuentes interceptar números de tarjeta de crédito en el momento exacto en que el cliente pulsa "Pagar".

---

### Medidas de blindaje perimetral implementadas en Dexvoi

1. **Tokens de un solo uso:** Jamás procesar datos bancarios directamente en los servidores propios; uso exclusivo de SDKs certificados PCI-DSS Nivel 1.
2. **Subresource Integrity (SRI):** Firma criptográfica de scripts externos para detectar manipulaciones en librerías de terceros en tiempo real.
3. **Políticas CSP restrictivas:** Bloqueo absoluto de cualquier conexión saliente no autorizada desde la pantalla de pago.
    `
  }
];

const categoryImages = {
  'ciberseguridad': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  'seo-local': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
  'arquitectura-web': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  'ia-reservas': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'
};

async function generateWithGemini(apiKey, existingTitles) {
  const modelsToTry = [
    'gemini-3.1-flash-lite',
    'gemini-3.8-flash',
    'gemini-flash-latest',
    'gemini-3.1-pro-preview'
  ];
  const categories = ['ciberseguridad', 'seo-local', 'arquitectura-web', 'ia-reservas'];
  const chosenCategory = categories[Math.floor(Math.random() * categories.length)];

  const prompt = `Actúa como Director Técnico y Consultor Senior de Ciberseguridad, SEO y Arquitectura Web de Élite en Dexvoi (empresa de tecnología para clínicas privadas, restaurantes gastronómicos y empresas premium).
Genera un artículo de blog técnico, original, riguroso y exhaustivo enfocado en la categoría "${chosenCategory}".
NO repitas ninguno de estos títulos ya existentes:
${existingTitles.slice(0, 15).join('\n')}

Devuelve ÚNICAMENTE un JSON válido (sin bloques de markdown ni texto adicional fuera del JSON) con los siguientes campos:
{
  "title": "Título riguroso, atractivo y optimizado para SEO en español (máx 70 caracteres)",
  "slug": "slug-url-limpio-sin-acentos-y-con-guiones",
  "category": "${chosenCategory}",
  "categoryLabel": "${chosenCategory === 'ciberseguridad' ? 'Ciberseguridad & Compliance' : chosenCategory === 'seo-local' ? 'SEO Local & Google Maps' : chosenCategory === 'arquitectura-web' ? 'Arquitectura Web & Rendimiento' : 'IA & Automatización'}",
  "excerpt": "Resumen conciso y persuasivo del artículo en español (máximo 160 caracteres)",
  "metaDescription": "Meta descripción optimizada para Google en español (máximo 155 caracteres)",
  "tags": ["3 a 5 tags técnicos en español"],
  "readingTimeMinutes": 7,
  "content": "Contenido completo en Markdown en español con introducción, subtítulos H2 (##), subtítulos H3 (###), tabla comparativa de impacto, viñetas de checklist y llamada a la acción hacia la auditoría gratuita de Dexvoi."
}`;

  for (const model of modelsToTry) {
    try {
      console.log(`[Gemini API] Intentando generar post con modelo: ${model}...`);
      const ai = new GoogleGenAI({ apiKey });
      
      const generatePromise = ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: 0.7,
          responseMimeType: 'application/json'
        }
      });
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout de 20s agotado en llamada a Gemini API')), 20000)
      );

      const res = await Promise.race([generatePromise, timeoutPromise]);

      const raw = res.text?.trim() || '';
      const clean = raw.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(clean);

      if (parsed.title && parsed.content) {
        console.log(`[Gemini API] ✅ Post generado con éxito mediante ${model}: "${parsed.title}"`);
        return {
          ...parsed,
          image: categoryImages[chosenCategory] || categoryImages.ciberseguridad
        };
      }
    } catch (err) {
      console.warn(`[Gemini API] Modelo ${model} no disponible (${err.message?.slice(0, 140)}), probando siguiente...`);
    }
  }
  return null;
}

function generateProceduralPost(existingContent) {
  const topicsMatrix = [
    {
      sector: 'Clínicas Privadas y Centros Médicos',
      tech: 'Cifrado de Extremo a Extremo y Protocolos de Acceso RGPD',
      cat: 'ciberseguridad',
      label: 'Ciberseguridad & Compliance'
    },
    {
      sector: 'Alta Restauración y Hostelería Gourmet',
      tech: 'Eliminación de Comisiones y Motor de Reservas Directo con IA',
      cat: 'ia-reservas',
      label: 'IA & Automatización'
    },
    {
      sector: 'Empresas de Servicios Profesionales B2B',
      tech: 'Dominancia en el Local 3-Pack de Google Maps y Fichas Verificadas',
      cat: 'seo-local',
      label: 'SEO Local & Google Maps'
    },
    {
      sector: 'Plataformas de Comercio y Servicios Digitales',
      tech: 'Tiempos de Carga Sub-200ms en Edge Global con Arquitectura Jamstack',
      cat: 'arquitectura-web',
      label: 'Arquitectura Web & Rendimiento'
    }
  ];

  const salt = Date.now().toString(36).slice(-4).toUpperCase();
  const choice = topicsMatrix[Math.floor(Math.random() * topicsMatrix.length)];
  const title = `${choice.tech} para ${choice.sector} [Informe 2026-${salt}]`;
  const slug = `seguridad-y-rendimiento-${choice.cat}-${salt.toLowerCase()}`;

  return {
    title,
    slug,
    category: choice.cat,
    categoryLabel: choice.label,
    tags: [choice.cat, 'Dexvoi', 'Optimización 2026', 'Rendimiento Digital'],
    readingTimeMinutes: 7,
    image: categoryImages[choice.cat],
    metaDescription: `Análisis técnico avanzado de ${choice.tech.toLowerCase()} enfocado en maximizar la seguridad y los márgenes de negocio en ${choice.sector.toLowerCase()}.`,
    content: `
## Transformación técnica y blindaje de activos digitales en 2026

En un mercado saturado de soluciones genéricas y CMS monolíticos obsoletos, las empresas punteras de **${choice.sector}** requieren infraestructuras inmunes a caídas, ataques perimetrales y penalizaciones de rendimiento.

---

### Diagnóstico de vectores críticos

- **Seguridad perimetral:** Eliminación de superficies de ataque expuestas y auditoría de cabeceras HTTP en Edge CDN.
- **Rendimiento extremo:** Carga instantánea sin latencias de bases de datos relacionales en frontend.
- **Independencia tecnológica:** Propiedad absoluta de la base de datos de usuarios sin dependencia de plataformas intermediarias con comisiones abusivas.

---

### Protocolo de implantación Dexvoi

En **Dexvoi** diseñamos e implantamos arquitecturas desacopladas hechas a medida con auditorías forenses periódicas para garantizar la máxima conversión y seguridad.
    `
  };
}

function updateSitemap(slug) {
  try {
    const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) return;
    let sitemap = fs.readFileSync(sitemapPath, 'utf8');
    const newUrl = `  <url>
    <loc>https://www.dexvoi.com/blog/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    if (!sitemap.includes(`/blog/${slug}`)) {
      sitemap = sitemap.replace('</urlset>', `${newUrl}\n</urlset>`);
      fs.writeFileSync(sitemapPath, sitemap, 'utf8');
      console.log(`[Sitemap] ✅ Añadida ruta /blog/${slug} a public/sitemap.xml`);
    }
  } catch (err) {
    console.error('[Sitemap] Error actualizando sitemap.xml:', err.message);
  }
}

async function generatePost() {
  const blogFilePath = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
  const content = fs.readFileSync(blogFilePath, 'utf8');

  let chosenPost = null;

  // 1. Intento principal con Gemini API si la clave está disponible
  if (process.env.GEMINI_API_KEY) {
    const existingTitles = [...content.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
    chosenPost = await generateWithGemini(process.env.GEMINI_API_KEY, existingTitles);
  }

  // 2. Respaldo secundario: Selección de topics curados no publicados todavía
  if (!chosenPost) {
    const available = topicsPool.find(t => !content.includes(t.topic));
    if (available) {
      console.log(`[Curated Pool] ✅ Seleccionado tema pendiente de publicar: "${available.topic}"`);
      const slug = available.topic
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
        .slice(0, 55);

      chosenPost = {
        title: available.topic,
        slug,
        excerpt: available.metaDescription,
        category: available.category,
        categoryLabel: available.categoryLabel,
        tags: available.tags,
        readingTimeMinutes: available.readingTimeMinutes,
        image: available.image,
        metaDescription: available.metaDescription,
        content: available.content
      };
    }
  }

  // 3. Respaldo definitivo infalible: Generador procedimental garantizado
  if (!chosenPost) {
    console.log('[Procedural Fallback] ⚡ Todos los temas estáticos están al día. Generando artículo procedimental...');
    chosenPost = generateProceduralPost(content);
  }

  const cleanSlug = chosenPost.slug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 60);

  const newPostCode = `  {
    id: 'post-auto-${Date.now()}',
    slug: '${cleanSlug}',
    title: ${JSON.stringify(chosenPost.title)},
    excerpt: ${JSON.stringify(chosenPost.excerpt || chosenPost.metaDescription)},
    category: '${chosenPost.category}',
    categoryLabel: '${chosenPost.categoryLabel}',
    tags: ${JSON.stringify(chosenPost.tags || ['Dexvoi', 'Tecnología', 'Seguridad'])},
    author: {
      name: 'Dexvoi Intelligence Team',
      role: 'Especialistas en Blindaje & Rendimiento Digital',
      badge: 'Verified Lead'
    },
    publishedAt: '${new Date().toISOString()}',
    readingTimeMinutes: ${chosenPost.readingTimeMinutes || 6},
    featuredImage: '${chosenPost.image}',
    metaDescription: ${JSON.stringify(chosenPost.metaDescription)},
    keywords: ${JSON.stringify(chosenPost.tags || ['Dexvoi'])},
    targetServiceUrl: '/auditoria-seguridad',
    targetServiceLabel: 'Solicitar Diagnóstico Especializado',
    content: ${JSON.stringify(chosenPost.content)}${chosenPost.translations ? `,\n    translations: ${JSON.stringify(chosenPost.translations, null, 6)}` : ''}
  },
`;

  // Inserción segura independiente de saltos de línea LF o CRLF
  const targetRegex = /(export\s+const\s+INITIAL_BLOG_POSTS\s*:\s*BlogPost\[\]\s*=\s*\[\r?\n)/;
  if (!targetRegex.test(content)) {
    console.error('[Error] No se encontró INITIAL_BLOG_POSTS en src/data/blogPosts.ts');
    process.exit(1);
  }

  const updatedContent = content.replace(targetRegex, `$1${newPostCode}`);
  fs.writeFileSync(blogFilePath, updatedContent, 'utf8');
  updateSitemap(cleanSlug);
  console.log(`[Blog Publisher] 🎉 Artículo publicado con éxito en el blog: "${chosenPost.title}" (/blog/${cleanSlug})`);
}

generatePost().catch(err => {
  console.error('[Error fatal en generador de artículos]:', err);
  process.exit(1);
});
