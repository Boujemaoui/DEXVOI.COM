import { BlogPost } from '../types/blog';

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-auto-1789213620965',
    slug: 'como-evitar-resenas-falsas-y-sabotaje-de-reputacion-en',
    title: "Cómo evitar reseñas falsas y sabotaje de reputación en Google Maps para Alta Gastronomía",
    excerpt: "Estrategias legales y técnicas para detectar, impugnar y eliminar reseñas maliciosas en Google Business Profile para restaurantes de alta cocina.",
    category: 'seo-local',
    categoryLabel: 'SEO Local & Google Maps',
    tags: ["Reputación Digital","Google Maps","Reseñas Falsas","SEO Restaurantes"],
    author: {
      name: 'Dexvoi Intelligence Team',
      role: 'Especialistas en Blindaje & Rendimiento Digital',
      badge: 'Verified Lead'
    },
    publishedAt: '2026-09-12T11:47:00.965Z',
    readingTimeMinutes: 6,
    featuredImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    metaDescription: "Estrategias legales y técnicas para detectar, impugnar y eliminar reseñas maliciosas en Google Business Profile para restaurantes de alta cocina.",
    keywords: ["Reputación Digital","Google Maps","Reseñas Falsas","SEO Restaurantes"],
    targetServiceUrl: '/auditoria-seguridad',
    targetServiceLabel: 'Solicitar Diagnóstico Especializado',
    content: "\n## El impacto destructivo de una reseña falsa de 1 estrella\n\nPara un restaurante gastronómico donde el ticket medio supera los 60€, **una sola reseña negativa falsa puede costar miles de euros al mes en comensales perdidos**.\n\nMuchos competidores desleales o bots automáticos publican valoraciones sin haber pisado jamás el establecimiento.\n\n---\n\n### Protocolo de respuesta e impugnación ante Google\n\n- **Monitoreo de huella IP y patrones temporales:** Las campañas de desprestigio suelen concentrar varias valoraciones sin texto en intervalos de menos de 48 horas.\n- **Respuesta institucional asertiva:** Nunca entres en conflicto público. Responde con un mensaje profesional indicando que no consta reserva a ese nombre y ofreciendo canal directo con gerencia.\n- **Impugnación formal por vulneración de políticas:** Solicita la retirada alegando conflicto de interés y contenido falso con pruebas del registro interno de reservas.\n\n---\n\n### Solución Dexvoi: Ficha blindada y reputación proactiva\n\nDiseñamos sistemas que canalizan las valoraciones positivas de comensales reales directamente a Google Maps mientras resuelven incidencias de forma privada.\n    "
  },
  {
    id: 'post-auto-1789158685430',
    slug: 'cabeceras-http-de-seguridad-para-clinicas-y-restaurante',
    title: "Cabeceras HTTP de Seguridad para Clínicas y Restaurantes: HSTS, CSP y Permissions-Policy",
    excerpt: "Guía técnica para directores médicos y hosteleros: configuración de cabeceras HSTS, CSP y permisos perimetrales para evitar ciberataques.",
    category: 'ciberseguridad',
    categoryLabel: 'Ciberseguridad & Compliance',
    tags: ["Cabeceras HTTP","HSTS","CSP","Seguridad Web","OWASP"],
    author: {
      name: 'Dexvoi Intelligence Team',
      role: 'Especialistas en Blindaje & Rendimiento Digital',
      badge: 'Verified Lead'
    },
    publishedAt: '2026-09-11T20:31:25.430Z',
    readingTimeMinutes: 7,
    featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    metaDescription: "Guía técnica para directores médicos y hosteleros: configuración de cabeceras HSTS, CSP y permisos perimetrales para evitar ciberataques.",
    keywords: ["Cabeceras HTTP","HSTS","CSP","Seguridad Web","OWASP"],
    targetServiceUrl: '/auditoria-seguridad',
    targetServiceLabel: 'Solicitar Diagnóstico Especializado',
    content: "\n## La primera línea de defensa perimetral: Cabeceras HTTP\n\nCuando un navegador solicita tu página web, el servidor responde no solo con el código visual, sino con un conjunto de instrucciones de seguridad conocidas como **cabeceras de respuesta HTTP**.\n\nPara una clínica privada que maneja datos médicos o un restaurante con reservas exclusivas, omitir estas cabeceras es equivalente a dejar la puerta del servidor abierta.\n\n---\n\n### Las 4 cabeceras obligatorias que auditamos en Dexvoi\n\n1. **Strict-Transport-Security (HSTS):** Fuerza la conexión encriptada HTTPS durante 1 año (`max-age=31536000; includeSubDomains; preload`), anulando ataques de degradación SSL (*SSL Stripping*).\n2. **Content-Security-Policy (CSP):** Restringe las fuentes desde donde el navegador puede cargar scripts, estilos e imágenes, bloqueando el 99% de inyecciones XSS.\n3. **X-Frame-Options:** Establecida en `DENY` o `SAMEORIGIN` para evitar ataques de *Clickjacking* en tus formularios de contacto.\n4. **X-Content-Type-Options:** Fijada en `nosniff` para impedir que navegadores ejecuten archivos adjuntos maliciosos haciéndose pasar por imágenes.\n\n---\n\n### Diagnóstico perimetral con Dexvoi\n\nEn **Dexvoi** integramos estas directivas de forma nativa en la capa perimetral (Edge CDN), protegiendo tu plataforma sin añadir latencia.\n    "
  },
  {
    id: 'post-1',
    slug: 'ciberseguridad-clinicas-privadas-guia-rgpd-blindaje',
    title: 'Ciberseguridad en Clínicas Privadas: Cómo Proteger las Historias Clínicas y Cumplir con el RGPD',
    excerpt: 'Las clínicas médicas y centros estéticos sufren más del 34% de ataques dirigidos a bases de datos sanitarias. Guía técnica para blindar historiales y evitar sanciones millonarias de la AEPD.',
    category: 'ciberseguridad',
    categoryLabel: 'Ciberseguridad & Compliance',
    tags: ['RGPD Sanitario', 'OWASP Top 10', 'Blindaje Clínicas', 'LOPDGDD', 'Cifrado'],
    author: {
      name: 'Equipo de Inteligencia Dexvoi',
      role: 'Especialistas en Blindaje Perimetral & Hacking Ético',
      badge: 'Certified Security Lead'
    },
    publishedAt: '2026-09-11T09:00:00.000Z',
    scheduledSlot: 'morning',
    readingTimeMinutes: 7,
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    metaDescription: 'Guía técnica definitiva sobre ciberseguridad en clínicas privadas: protección de historias clínicas, cabeceras HTTP obligatorias y cumplimiento estricto del RGPD sanitario.',
    keywords: ['ciberseguridad clínicas privadas', 'protección datos historias clínicas', 'multas AEPD clínicas', 'blindaje digital salud', 'auditoría seguridad clínica'],
    targetServiceUrl: '/auditoria-seguridad',
    targetServiceLabel: 'Ejecutar Auditoría OSINT para tu Clínica',
    content: `
## La vulnerabilidad silenciosa del sector médico privado

En el sector sanitario y estético privado, los historiales clínicos no son simples registros: constituyen **datos de categoría especial** protegidos por el Artículo 9 del Reglamento General de Protección de Datos (RGPD) y la LOPDGDD. 

Una sola brecha de seguridad puede derivar en multas de hasta **20 millones de euros o el 4% de la facturación anual global**, además de la pérdida irrevocable de la reputación del centro.

---

### Los 4 vectores de ataque más críticos detectados en clínicas

A través de nuestras auditorías perimetrales OSINT en centros médicos de España, Francia y Marruecos, hemos identificado un patrón recurrente de vulnerabilidades:

1. **Gestores de citas basados en plugins desactualizados:** El 68% de las clínicas que emplean WordPress o WooCommerce mantienen pasarelas o formularios de reserva con inyecciones SQL ciegas o fallos de Cross-Site Scripting (XSS).
2. **Ausencia de cabeceras HTTP de seguridad:** Falta sistemática de políticas HSTS (\`Strict-Transport-Security\`), lo que permite ataques de intercepción *Man-in-the-Middle* (MitM) en redes Wi-Fi públicas o de la propia clínica.
3. **Exposición pasiva de metadatos del personal médico:** Fugas en registros DNS, cabeceras \`X-Powered-By\` y banners de servidor que revelan versiones exactas de PHP, Apache o Nginx vulnerables.
4. **Falta de autenticación robusta para el portal del paciente:** Ausencia de rate limiting y políticas de bloqueo ante ataques de fuerza bruta.

---

### Tabla comparativa de impacto: CMS Tradicional vs. Arquitectura Blindada Dexvoi

| Parámetro Técnico | WordPress / CMS Convencional | Arquitectura Jamstack DEXVOI |
| :--- | :--- | :--- |
| **Superficie de ataque en base de datos** | Alta (MySQL acoplado públicamente) | Cero (Frontend estático desacoplado) |
| **Riesgo de Inyección SQL en formularios** | Constante (dependiente de plugins) | Nulo (APIs aisladas serverless con validación tipada) |
| **Calificación SSL / TLS** | Frecuentemente grado B o C | Grado A+ garantizado |
| **Cabeceras HSTS y CSP** | Rara vez configuradas | Preconfiguradas en edge perimetral |

---

### Checklist de emergencia para directores médicos y administradores

Si gestionas una clínica dental, dermatológica o de medicina estética, revisa hoy mismo los siguientes puntos:

- [ ] ¿Cuenta tu web con la cabecera \`Content-Security-Policy\` para evitar robo de sesiones?
- [ ] ¿Están tus registros DNS protegidos contra *spoofing* mediante registros SPF, DKIM y DMARC activos?
- [ ] ¿El formulario donde los pacientes adjuntan pruebas diagnósticas almacena los archivos en un bucket cifrado con AES-256?
- [ ] ¿Realizas auditorías de vulnerabilidades externas al menos una vez al trimestre?

> *"La ciberseguridad médica no es un gasto de soporte informático: es la póliza de supervivencia de la clínica ante el paciente y ante la ley."*

---

### ¿Cómo proteger la infraestructura de tu clínica hoy?

En **Dexvoi** realizamos un diagnóstico perimetral no invasivo de 5 puntos sin alterar las operaciones de tu clínica. Analizamos cabeceras de respuesta, fugas DNS y exposición pública de credenciales.
    `
  },
  {
    id: 'post-2',
    slug: 'seo-local-restaurantes-google-maps-2026',
    title: 'Dominando el Local Pack de Google Maps: Estrategias de SEO para Restaurantes de Lujo en 2026',
    excerpt: 'Estar en el Top 3 de Google Maps genera hasta un 82% de las reservas directas de mesa sin comisiones. Aprende la fórmula de geolocalización, Schema y reputación digital.',
    category: 'seo-local',
    categoryLabel: 'SEO Local & Google Maps',
    tags: ['Google Business Profile', 'SEO Restaurantes', 'Local Pack', 'Schema Restaurant', 'Sin Comisiones'],
    author: {
      name: 'Equipo SEO & Growth Dexvoi',
      role: 'Consultores de Posicionamiento Local',
      badge: 'Local Search Expert'
    },
    publishedAt: '2026-09-10T18:00:00.000Z',
    scheduledSlot: 'evening',
    readingTimeMinutes: 6,
    featuredImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Descubre cómo posicionar tu restaurante de alta cocina en las 3 primeras posiciones de Google Maps. Factores de ranking local, Schema markup y captación directa sin intermediarios.',
    keywords: ['seo local restaurantes', 'posicionar restaurante google maps', 'ranking local pack restaurantes', 'reservas directas sin comisiones', 'schema restaurant json-ld'],
    targetServiceUrl: '/servicios',
    targetServiceLabel: 'Ver Estrategia SEO Local para Restaurantes',
    content: `
## El monopolio del Local Pack en la alta gastronomía

Cuando un comensal busca *"mejor restaurante para cenar"* o *"restaurante de autor cerca de mí"*, más del **70% de los clics se concentran exclusivamente en el mapa de Google (el Local Pack de 3 resultados)**.

Aparecer en la cuarta posición equivale prácticamente a no existir. Y depender exclusivamente de plataformas agregadoras (como TheFork o portales de comisiones) drena entre un 15% y un 25% del margen neto de cada reserva.

---

### Los 3 pilares del algoritmo de posicionamiento local de Google

Google clasifica los negocios gastronómicos basándose en tres factores matemáticos:

1. **Relevancia:** ¿Coincide exactamente la categoría primaria y secundaria de tu ficha de Google Business con la intención del usuario?
2. **Distancia (Proximidad):** El radio geométrico desde el cual Google considera que tu establecimiento es la mejor opción.
3. **Prominencia y Señales Web:** Aquí es donde la mayoría de restaurantes fracasan. Google evalúa la autoridad del dominio web vinculado a la ficha, su velocidad de carga (Core Web Vitals) y la coherencia de datos (NAP: Name, Address, Phone).

---

### Schema Markup JSON-LD: El idioma que Google adora

Un restaurante no puede tener una página web sin datos estructurados. Tu código HTML debe declarar explícitamente el menú, el rango de precios y las coordenadas geográficas:

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Restaurante Alta Cocina",
  "image": "https://tudominio.com/foto.jpg",
  "priceRange": "$$$$",
  "servesCuisine": "Mediterránea contemporánea",
  "acceptsReservations": "True",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Serrano, 45",
    "addressLocality": "Madrid",
    "postalCode": "28001",
    "addressCountry": "ES"
  }
}
\`\`\`

---

### La estrategia de velocidad: por qué 1 segundo de retraso te hunde en el mapa

Google premia la experiencia del usuario móvil. Los comensales que buscan restaurante suelen estar en movimiento, con conexiones móviles 4G/5G variables. Si tu web tarda más de 2.5 segundos en cargar:

- La tasa de rebote se dispara un **123%**.
- Los usuarios vuelven atrás al mapa y eligen a tu competidor directo.
- Google interpreta esta señal negativa y reduce la visibilidad de tu ficha en el Local Pack.

En **Dexvoi** diseñamos arquitecturas web con tiempos de carga inferiores a **400 milisegundos**, asegurando que el 100% de los visitantes pasen directamente al motor de reservas.
    `
  },
  {
    id: 'post-3',
    slug: 'por-que-wordpress-es-un-peligro-para-negocios-de-elite',
    title: 'Por Qué WordPress es un Riesgo Crítico para Empresas de Élite y Clínicas Privadas',
    excerpt: 'El 90% de los sitios pirateados en la web utilizan WordPress. Analizamos la deuda técnica, la fragilidad de los plugins y por qué la arquitectura desacoplada es el futuro.',
    category: 'arquitectura-web',
    categoryLabel: 'Arquitectura Web & Rendimiento',
    tags: ['Jamstack', 'WordPress Vulnerable', 'Seguridad Web', 'Core Web Vitals', 'Rendimiento'],
    author: {
      name: 'Equipo de Ingeniería Dexvoi',
      role: 'Arquitectos de Software & Sistemas Distribuidos',
      badge: 'Principal Architect'
    },
    publishedAt: '2026-09-10T09:00:00.000Z',
    scheduledSlot: 'morning',
    readingTimeMinutes: 8,
    featuredImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Análisis forense de por qué WordPress supone un riesgo de seguridad y rendimiento para clínicas y empresas de servicios premium. Descubre las ventajas del stack moderno.',
    keywords: ['wordpress vulnerabilidades clínicas', 'jamstack vs wordpress', 'seguridad web empresarial', 'velocidad core web vitals', 'desacoplamiento frontend'],
    targetServiceUrl: '/precios',
    targetServiceLabel: 'Descubre Nuestras Soluciones de Arquitectura Web',
    content: `
## La trampa de la comodidad técnica

WordPress impulsa más del 40% de la web mundial. Precisamente por esa hegemonía, es el **objetivo número uno de los escáneres automáticos de cibercriminales y bots de ataque**.

Para un blog personal, WordPress es adecuado. Para una **clínica médica privada, un despacho de asesoramiento patrimonial o un restaurante concurrido**, basar su infraestructura en un CMS monolítico de PHP y MySQL es una ruleta rusa digital.

---

### Los 3 problemas estructurales de WordPress

1. **La pesadilla de los plugins de terceros:** Para añadir reservas, SEO, compresión de imágenes y seguridad, una instalación típica requiere entre 25 y 45 plugins. Cada uno de ellos está desarrollado por autores distintos, con estándares dispares y actualizaciones impredecibles. Un solo plugin descuidado otorga acceso total al servidor.
2. **Monolito de base de datos:** Cada visita ejecuta decenas de consultas SQL en tiempo real. En picos de tráfico, el servidor colapsa o ralentiza la experiencia del usuario.
3. **Mantenimiento costoso y parches constantes:** Dejar una semana sin actualizar la web expone vulnerabilidades públicas (CVEs) documentadas en internet.

---

### La alternativa de vanguardia: Arquitectura Jamstack / Edge

En Dexvoi no utilizamos WordPress. Diseñamos plataformas web con la misma arquitectura empleada por corporaciones tecnológicas de primer nivel:

- **Frontend estático pre-renderizado:** Las páginas se compilan como HTML puro y se distribuyen globalmente en redes perimetrales (CDN / Edge). No hay base de datos expuesta al público.
- **Microservicios serverless aislados:** Los formularios, pasarelas de pago y motores de reserva corren en funciones en la nube con aislamiento estricto.
- **Tiempos de respuesta milimétricos:** Puntuaciones de 100/100 en Google PageSpeed Insights garantizadas.

> *"Cuando eliminas la base de datos pública y el panel /wp-admin/, eliminas de raíz el 99.2% de los vectores de ataque conocidos."*
    `
  },
  {
    id: 'post-4',
    slug: 'auditoria-osint-que-es-y-como-previene-fugas-de-datos',
    title: 'Auditoría OSINT Perimetral: Qué Revela tu Dominio Público a los Ciberdelincuentes',
    excerpt: 'La Inteligencia de Fuentes Abiertas (OSINT) permite auditar la huella digital externa de tu negocio sin tocar tus servidores. Conoce lo que los atacantes ven antes de entrar.',
    category: 'ciberseguridad',
    categoryLabel: 'Hacking Ético & OSINT',
    tags: ['OSINT', 'Hacking Ético', 'Fugas DNS', 'Email Spoofing', 'DMARC'],
    author: {
      name: 'Equipo de Inteligencia Dexvoi',
      role: 'Especialistas en Blindaje Perimetral & Hacking Ético',
      badge: 'OSINT Lead Analyst'
    },
    publishedAt: '2026-09-09T18:00:00.000Z',
    scheduledSlot: 'evening',
    readingTimeMinutes: 6,
    featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Qué es una auditoría OSINT perimetral y cómo identifica fugas de credenciales, servidores expuestos y vulnerabilidades de email antes de que sean explotadas.',
    keywords: ['auditoria osint empresas', 'inteligencia fuentes abiertas ciberseguridad', 'proteger dominio email spoofing', 'fugas dns servidores', 'escáner perimetral'],
    targetServiceUrl: '/auditoria-seguridad',
    targetServiceLabel: 'Ejecutar Escáner OSINT Instantáneo',
    content: `
## Antes de cualquier ataque, existe una fase de reconocimiento

Los ciberataques modernos no ocurren al azar. Los atacantes ejecutan **fases sistemáticas de reconocimiento pasivo** utilizando técnicas OSINT (*Open Source Intelligence*).

Sin enviar un solo paquete sospechoso y sin activar alarmas de firewall, un atacante puede averiguar:

- Qué software exacto corre en tu servidor web mediante banners y cabeceras desnudas.
- Si tus directores o médicos han sufrido filtraciones de contraseñas en brechas públicas del pasado.
- Si tu dominio permite la suplantación de identidad por correo (*email spoofing*) por falta de configuración estricta de DMARC y SPF.
- Qué subdominios de prueba o paneles internos han quedado olvidados en internet.

---

### La importancia de auditar tu perímetro antes que lo hagan terceros

Una auditoría perimetral como la que ofrece **Dexvoi** aplica las mismas metodologías utilizadas en ejercicios de *Red Team* y evaluación de amenazas corporativas:

1. **Inspección de cabeceras de seguridad:** Comprobación rigurosa de \`Strict-Transport-Security\`, \`X-Frame-Options\`, \`X-Content-Type-Options\` y \`Content-Security-Policy\`.
2. **Análisis criptográfico TLS/SSL:** Verificación de certificados, soporte de cifrados obsoletos (TLS 1.0/1.1) y mitigación de ataques de degradación.
3. **Auditoría de vectores de correo empresarial:** Validación de registros SPF, claves DKIM y políticas DMARC con rechazo estricto (\`p=reject\`).

Proteger tu negocio comienza por ver tu fachada exactamente como la contemplan quienes buscan vulnerabilidades.
    `
  },
  {
    id: 'post-5',
    slug: 'sistemas-de-reservas-con-ia-vs-plataformas-de-comision',
    title: 'Sistemas de Reservas Propietarios con IA vs. Plataformas de Comisiones: El Dilema del 20%',
    excerpt: '¿Por qué seguir pagando comisiones recurrentes por tus propios clientes? Descubre cómo los motores de reserva propietarios integrados con IA aumentan el margen y fidelizan.',
    category: 'ia-reservas',
    categoryLabel: 'IA & Automatización',
    tags: ['Motores de Reserva', 'IA Conversacional', 'Margen de Beneficio', 'Fidelización', 'No Comisiones'],
    author: {
      name: 'Equipo de Innovación Dexvoi',
      role: 'Desarrollo de Soluciones de Inteligencia Artificial',
      badge: 'AI Systems Architect'
    },
    publishedAt: '2026-09-09T09:00:00.000Z',
    scheduledSlot: 'morning',
    readingTimeMinutes: 7,
    featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Compara los costes de los agregadores de reservas frente a un motor de reservas propio con IA para restaurantes y clínicas. Recupera el 100% del valor de tus clientes.',
    keywords: ['sistema de reservas propio restaurantes', 'motor reservas clínicas médicas', 'ia reservas whatsapp sin comisiones', 'ahorro comisiones portales'],
    targetServiceUrl: '/servicios',
    targetServiceLabel: 'Conocer Sistema de Reservas Dexvoi',
    content: `
## El verdadero coste oculto de los portales agregadores

Para un negocio que arranca, las plataformas de reservas proporcionan visibilidad inicial. Sin embargo, una vez el negocio se consolida, el modelo se convierte en una fuga de rentabilidad:

- **Comisiones por cubierto o cita:** Pagar entre 2€ y 5€ por cada reserva gestionada.
- **Apropiación de la base de datos del cliente:** Los datos del cliente pertenecen al portal, no a tu clínica o restaurante. La plataforma suele recomendar a tus competidores cuando el usuario vuelve a abrir la app.
- **Falta de personalización de marca:** La experiencia de compra está encajonada en los colores y plantillas de un intermediario.

---

### La revolución del Asistente Virtual Propietario con IA

Con la tecnología actual, una clínica o restaurante puede disponer de su propio motor de captación las 24 horas del día:

1. **Atención conversacional en lenguaje natural:** Responde dudas sobre tratamientos, alérgenos, disponibilidad de horarios o estacionamiento al instante.
2. **Sincronización bidireccional:** Integración directa con Google Calendar, calendarios médicos o sistemas de gestión interna sin fricción.
3. **Cero comisiones por transacción:** El 100% de la facturación ingresa directamente en la cuenta bancaria del negocio.
4. **Propiedad total de la lista de clientes:** Datos salvaguardados conforme al RGPD para campañas directas de reactivación y fidelización.
    `
  }
];

// Helper storage key for dynamically AI-generated posts
const STORAGE_KEY = 'dexvoi_custom_blog_posts_v1';

export function getAllPosts(): BlogPost[] {
  let customPosts: BlogPost[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      customPosts = JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load custom posts from localStorage:', err);
  }

  // Combine and sort by publishedAt descending
  const all = [...customPosts, ...INITIAL_BLOG_POSTS];
  return all.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/**
 * Returns all posts whose publish timestamp is in the past (live)
 */
export function getPublishedPosts(): BlogPost[] {
  const now = Date.now();
  return getAllPosts().filter(p => new Date(p.publishedAt).getTime() <= now);
}

/**
 * Returns upcoming scheduled posts (queue for tomorrow/later)
 */
export function getScheduledPosts(): BlogPost[] {
  const now = Date.now();
  return getAllPosts().filter(p => new Date(p.publishedAt).getTime() > now);
}

/**
 * Finds a blog post by its URL slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  const clean = slug.toLowerCase().trim();
  return getAllPosts().find(p => p.slug.toLowerCase() === clean);
}

/**
 * Gets related posts from the same category or tags
 */
export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  return getPublishedPosts()
    .filter(p => p.slug !== currentSlug)
    .filter(p => p.category === category || p.tags.some(t => t.toLowerCase().includes('ciberseguridad') || t.toLowerCase().includes('seo')))
    .slice(0, limit);
}

/**
 * Saves a newly generated post to the persistent client storage
 */
export function saveCustomPost(post: BlogPost): void {
  try {
    const current = getAllPosts().filter(p => p.id !== post.id);
    const updated = [post, ...current.filter(p => !INITIAL_BLOG_POSTS.some(ip => ip.id === p.id))];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save custom post:', err);
  }
}
