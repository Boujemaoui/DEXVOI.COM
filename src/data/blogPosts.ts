import { BlogPost } from '../types/blog';
import { BLOG_POST_SLUGS, BLOG_POST_TRANSLATIONS } from './blogTranslations';

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-auto-1791297446688',
    slug: 'dominar-el-local-pack-de-3-en-google-maps-para-clinicas',
    title: "Dominar el Local Pack de 3 en Google Maps para Clínicas Odontológicas y Médicas",
    excerpt: "Estrategias de arquitectura de datos y optimización de señales locales para posicionar tu clínica en los tres primeros resultados de Google Maps.",
    category: 'seo-local',
    categoryLabel: 'SEO Local & Google Maps',
    tags: ["Google Maps","SEO Clínicas","Local Pack","Captación Pacientes"],
    author: {
      name: 'Dexvoi Intelligence Team',
      role: 'Especialistas en Blindaje & Rendimiento Digital',
      badge: 'Verified Lead'
    },
    publishedAt: '2026-10-06T14:37:26.688Z',
    readingTimeMinutes: 8,
    featuredImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    metaDescription: "Estrategias de arquitectura de datos y optimización de señales locales para posicionar tu clínica en los tres primeros resultados de Google Maps.",
    keywords: ["Google Maps","SEO Clínicas","Local Pack","Captación Pacientes"],
    targetServiceUrl: '/auditoria-seguridad',
    targetServiceLabel: 'Solicitar Diagnóstico Especializado',
    content: "\n## El 70% de las citas médicas privadas se deciden en el Local Pack de Google\n\nCuando un paciente busca \"implantología dental urgente\" o \"dermatólogo privado cerca de mí\", Google muestra únicamente los 3 perfiles locales más relevantes. Aparecer en la cuarta posición significa invisibilidad comercial.\n\n---\n\n### Los 4 factores determinantes del algoritmo local\n\n- **Consistencia NAP (Name, Address, Phone):** Exactitud milimétrica de datos en directorios médicos autorizados.\n- **Categorización primaria y secundaria:** Selección precisa de especialidades médicas sin canibalización.\n- **Geocodificación y metadatos EXIF:** Contenido fotográfico verificado con coordenadas geoespaciales.\n- **Flujo constante de reseñas con palabras clave:** Opiniones verificadas que mencionan tratamientos concretos.\n    "
  },
  {
    id: 'post-auto-1791217931781',
    slug: 'ataques-cadena-suministro-web-magecart-negocios-premium',
    title: "Ataques de Cadena de Suministro Web: Magecart en Negocios Premium",
    excerpt: "Descubra cómo blindar portales de pago y reservas contra inyecciones e-skimming y scripts maliciosos de terceros con arquitecturas zero-trust.",
    category: 'ciberseguridad',
    categoryLabel: 'Ciberseguridad & Compliance',
    tags: ["ciberseguridad","e-skimming","magecart","compliance pci-dss","seguridad web"],
    author: {
      name: 'Dexvoi Intelligence Team',
      role: 'Especialistas en Blindaje & Rendimiento Digital',
      badge: 'Verified Lead'
    },
    publishedAt: '2026-10-05T16:32:11.781Z',
    readingTimeMinutes: 7,
    featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    metaDescription: "Proteja su clínica o restaurante premium contra ataques Magecart y robo de tarjetas. Guía técnica de SRI, CSP estricto y monitoreo perimetral.",
    keywords: ["ciberseguridad","e-skimming","magecart","compliance pci-dss","seguridad web"],
    targetServiceUrl: '/auditoria-seguridad',
    targetServiceLabel: 'Solicitar Diagnóstico Especializado',
    content: "## El Enemigo Silencioso en el Checkout de Alta Gama\n\nEn el ecosistema digital de clínicas médicas privadas, restaurantes con estrella Michelin y marcas de hospitalidad de lujo, la captación de reservas y cobros en línea procesa información altamente sensible: números de tarjetas de crédito corporativas, datos de identificación personal (PII) y registros transaccionales confidenciales. Para los ciberdelincuentes, comprometer el servidor principal no siempre es la vía más rentable. La estrategia dominante hoy se basa en los **ataques a la cadena de suministro web (Supply Chain Attacks)**, comúnmente ejecutados mediante consorcios tipo **Magecart** o técnicas de **e-skimming**.\n\nEste vector no ataca su base de datos directamente; infecta bibliotecas JavaScript de terceros que su sitio web ejecuta legítimamente: widgets de analítica, motores de chat en vivo, píxeles de remarketing o scripts de encuestas. Una vez comprometido el proveedor externo, el atacante inyecta código malicioso que intercepta las credenciales y datos bancarios introducidos por el cliente en tiempo real, exfiltrándolos a servidores remotos antes de que se cifren en el backend.\n\n---\n\n## Anatomía de un Ataque de E-Skimming en Front-End\n\nEl mecanismo de un ataque Magecart moderno elude los cortafuegos perimetrales (WAF) tradicionales porque la ejecución ocurre en el navegador del cliente (*Client-Side Attack*).\n\n```\n[ Navegador del Usuario ] \n       │  \n       ├─► 1. Carga HTML/JS legítimo desde el servidor web\n       ├─► 2. Descarga script de analítica comprometido (CDN de terceros)\n       │        └─ Inyección silenciosa del listener en inputs (`document.addEventListener`)\n       ├─► 3. Usuario introduce tarjeta o historia clínica para reserva\n       ├─► 4. Script malicioso clona el payload y lo ofusca (Base64/Hex)\n       └─► 5. Exfiltración paralela a drop-server (`https://analytics-secure-check.net`)\n```\n\n### 1. Infiltración mediante Dependencias Desatendidas\nLos atacantes comprometen un bucket S3 mal configurado o una cuenta de desarrollador en un servicio de soporte o analítica de terceros. Modifican un script aparentemente inofensivo como `tag-manager-helper.js` agregando menos de 20 líneas de código ofuscado.\n\n### 2. Monitorización del DOM y Hooking\nEl script infectado monitoriza los eventos `change` y `submit` en formularios específicos que coincidan con selectores de inputs sensibles (`input[name=\"cc_number\"]`, `input[name=\"cvv\"]`, `input[name=\"paciente_dni\"]`).\n\n### 3. Exfiltración Encubierta\nLos datos recolectados se transmiten vía peticiones HTTP POST asíncronas camufladas como imágenes beacon (`/pixel.png?data=...`) o peticiones a websockets hacia dominios typosquatting que imitan proveedores legítimos.\n\n---\n\n## Matriz de Impacto: Ataques de Terceros vs. Vectores Tradicionales\n\n| Vector de Ataque | Detección por WAF Clásico | Impacto en Cumplimiento | Superficie Afectada | Pérdida Reputacional |\n| :--- | :--- | :--- | :--- | :--- |\n| **Inyección SQL / XSS Reflejado** | Inmediata (95%) | RGPD / LOPDGDD | Base de Datos Central | Media a Alta |\n| **Fuerza Bruta / Credential Stuffing** | Alta (mediante Rate Limiting) | RGPD | Cuentas de Usuario | Media |\n| **Ataque Magecart / Supply Chain JS** | Nula (0% en navegador) | PCI-DSS v4.0 / RGPD Crítico | Navegador del Cliente | Catastrófica (Pérdida de licencia) |\n| **Defacement / Secuestro DNS** | Rápida (Monitoreo Uptime) | Reputación | Resolución de Dominio | Alta puntual |\n\n---\n\n## Medidas Técnicas de Mitigación Definitiva\n\nEn **Dexvoi**, erradicamos la dependencia de scripts vulnerables mediante una arquitectura de aislamiento y control criptográfico estricto.\n\n### 1. Implementación Rigurosa de Subresource Integrity (SRI)\nPara cualquier recurso estático alojado en CDNs de terceros, es imperativo forzar el uso de hashes criptográficos (SHA-384 o SHA-512). Si el script externo es alterado en un solo bit por un atacante, el navegador bloqueará su ejecución instantáneamente:\n\n```html\n<script \n  src=\"https://cdn.tercero-reserva.com/v2/sdk.js\" \n  integrity=\"sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC\" \n  crossorigin=\"anonymous\">\n</script>\n```\n\n### 2. Directiva Content-Security-Policy (CSP) Restrictiva con Nonces\nUn CSP permisivo con comodines (`*`) es inútil frente a Magecart. Debe declararse una política granular que limite estrictamente los orígenes de conexión y ejecución:\n\n```http\nContent-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m123456' https://trusted-cdn.com; connect-src 'self' https://api.dexvoi.com; object-src 'none'; base-uri 'none';\n```\n\n### 3. Aislamiento Mediante Sandboxed iframes para Checkouts\nEl formulario de pago o datos médicos críticos nunca debe compartir el mismo contexto de ejecución en el DOM que los scripts de marketing. La integración debe realizarse a través de un `iframe` seguro provisto por la pasarela de pago autorizada, restringido con el atributo `sandbox`:\n\n```html\n<iframe \n  src=\"https://checkout.dexvoi.com/secure-pay\" \n  sandbox=\"allow-scripts allow-forms allow-same-origin\">\n</iframe>\n```\n\n---\n\n## Checklist de Seguridad Perimetral para Front-End en 2026\n\n- [ ] **Inventario exhaustivo de scripts:** Auditoría trimestral de cada etiqueta JavaScript activa en Google Tag Manager o cargada en el `<head>`.\n- [ ] **Despliegue de SRI:** Validación de integridad en todas las dependencias estáticas no alojadas en infraestructura propia.\n- [ ] **Monitoreo de Cambios en DOM:** Implementación de observadores `MutationObserver` para detectar inyecciones anómalas de listeners en formularios de pago.\n- [ ] **Cumplimiento PCI-DSS v4.0 (Requisitos 6.4.3 y 11.6.1):** Mecanismos técnicos para confirmar la autorización de scripts y detección de manipulaciones en encabezados HTTP.\n- [ ] **Eliminación de bibliotecas obsoletas:** Sustitución de dependencias complejas por micro-componentes nativos en Vanilla JS o Web Components auditados.\n\n---\n\n## Proteja la Reputación de su Marca con Dexvoi\n\nUn solo incidente de exfiltración de tarjetas de crédito o historiales de reservas destruye décadas de confianza y genera sanciones severas bajo el RGPD y PCI-DSS. En **Dexvoi**, diseñamos ecosistemas web para clínicas de élite y restauración de alto nivel donde la seguridad de nivel bancario se integra de forma transparente en la arquitectura técnica.\n\n**Solicite hoy una auditoría perimetral y de cadena de suministro gratuita con el equipo de ingeniería de Dexvoi** y detecte vulnerabilidades invisibles antes de que afecten a sus clientes."
  },
  {
    id: 'post-auto-1790954936512',
    slug: 'arquitectura-jamstack-edge-computing-negocios-alta-gama',
    title: "Arquitectura Jamstack y Edge Computing en Negocios de Alta Gama",
    excerpt: "Descubra cómo desacoplar frontend y backend mediante Edge Computing y Jamstack para blindar la seguridad y garantizar latencia cero en marcas de lujo.",
    category: 'arquitectura-web',
    categoryLabel: 'Arquitectura Web & Rendimiento',
    tags: ["Jamstack","Edge Computing","Arquitectura Web","Serverless","Seguridad Web"],
    author: {
      name: 'Dexvoi Intelligence Team',
      role: 'Especialistas en Blindaje & Rendimiento Digital',
      badge: 'Verified Lead'
    },
    publishedAt: '2026-10-02T15:28:56.512Z',
    readingTimeMinutes: 7,
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    metaDescription: "Aprenda a implementar arquitecturas Jamstack y Edge Computing para clínicas y marcas premium. Máxima ciberseguridad, SEO técnico y velocidad sin servidores.",
    keywords: ["Jamstack","Edge Computing","Arquitectura Web","Serverless","Seguridad Web"],
    targetServiceUrl: '/auditoria-seguridad',
    targetServiceLabel: 'Solicitar Diagnóstico Especializado',
    content: "# Arquitectura Jamstack y Edge Computing: La Infraestructura Definitiva para Empresas de Élite\n\nEn el segmento de la alta gastronomía, las clínicas biomédicas privadas y las marcas corporativas premium, la experiencia digital no admite concesiones. Una fracción de segundo en la resolución de una página o una vulnerabilidad en el servidor de producción pueden destruir de forma irreversible la reputación de exclusividad construida durante décadas.\n\nLa arquitectura web tradicional —monolitos basados en bases de datos relacionales conectadas directamente a motores de renderizado dinámico en servidor único— ha quedado obsoleta frente a las demandas contemporáneas de disponibilidad global, resiliencia perimetral y optimización en motores de búsqueda. La respuesta técnica reside en el desacoplamiento radical: **Jamstack respaldado por Edge Computing**.\n\n---\n\n## 1. El Ocaso del Servidor Centralizado: Vulnerabilidad y Latencia\n\nLos entornos monolíticos acoplan la lógica de negocio, la capa de datos y la presentación en una sola infraestructura vulnerable. Cada petición HTTP entrante fuerza al servidor a consultar la base de datos, compilar plantillas y generar HTML sobre la marcha.\n\nEste modelo introduce dos debilidades críticas:\n- **Superficie de ataque expandida:** El servidor expone puertos, módulos de backend, dependencias de bases de datos y paneles de gestión directamente a Internet, convirtiéndose en el blanco predilecto de inyecciones SQL, ataques de denegación de servicio distribuido (DDoS) y ejecución remota de código (RCE).\n- **Latencia geográfica estructural:** Si el clúster centralizado reside en Frankfurt o Madrid, un cliente de alto patrimonio navegando desde Nueva York o Dubái sufrirá tiempos de ida y vuelta (RTT) inaceptables, degradando las métricas de Time to First Byte (TTFB).\n\n---\n\n## 2. Paradigma Jamstack: Desacoplamiento y Pre-renderizado Determinista\n\nJamstack (JavaScript, APIs y Markup pre-construido) redefine el flujo de despliegue. En lugar de procesar peticiones en tiempo real en un servidor web expuesto, el contenido se pre-renderiza durante el ciclo de compilación (Static Site Generation, SSG) o se revalida de forma granular bajo demanda (Incremental Static Regeneration, ISR).\n\n```\n[Headless CMS / Base de Datos Privada] \n                  │ (Webhook seguro al compilar)\n                  ▼\n        [Pipeline CI/CD Autónomo]\n                  │ (Generación de assets inmutables)\n                  ▼\n    [Red Global Edge / Workers Perimetrales] ───▶ [Navegador del Usuario VIP]\n```\n\nAl eliminar el backend dinámico de la capa pública de acceso, el frontend se transforma en un conjunto de archivos estáticos inmutables servidos directamente desde nodos perimetrales.\n\n### Ventajas de Seguridad de Base Cero\n- **Inexistencia de base de datos pública:** No hay conexiones vivas expuestas a las peticiones del cliente final.\n- **Inmunidad contra exploits de CMS:** Al no existir un panel administrativo acoplado al runtime público, los vectores de ataque tradicionales quedan completamente neutralizados.\n\n---\n\n## 3. Edge Computing: Computación Perimetral sin Servidores\n\nEl pre-renderizado estático no implica renunciar a la personalización o al procesamiento transaccional en tiempo real. Aquí entra en juego el **Edge Computing** mediante Serverless Workers situados en más de 300 puntos de presencia (PoPs) globales.\n\n### Casos de Uso Críticos en Negocios de Alto Nivel\n- **Autenticación y Autorización en el Perímetro:** Verificación instantánea de tokens criptográficos (JWT) antes de enrutar la petición a las APIs privadas del negocio.\n- **Geolocalización y Geolocalización Dinámica de Monedas:** Reescritura de cabeceras HTTP y redirecciones hiper-precisas en menos de 5 milisegundos sin llamadas a servidores de origen.\n- **WAF y Detección de Bots con IA:** Bloqueo de scrapers maliciosos y escaneos automatizados antes de que consuman ancho de banda o toquen la infraestructura central.\n\n---\n\n## 4. Comparativa Arquitectónica: Monolito vs. Jamstack en el Edge\n\n| Parámetro Crítico | Servidor Tradicional Monolítico | Arquitectura Jamstack + Edge (Dexvoi) |\n| :--- | :--- | :--- |\n| **Time to First Byte (TTFB)** | 400ms – 1800ms (según carga y geografía) | **< 30ms** garantizados a nivel global |\n| **Superficie de Ataque** | Crítica (SO, motor web, PHP/Node, DB) | **Prácticamente nula** (Assets estáticos distribuidos) |\n| **Resiliencia ante Picos DDoS** | Bloqueo o colapso por saturación de CPU | **Absorción elástica perimetral ilimitada** |\n| **Cumplimiento RGPD / HIPAA** | Complejo (Riesgo de fuga en capas intermedias) | **Aislamiento total de microservicios y datos médicos** |\n| **Disponibilidad Operativa** | Sujeta a reinicios, caídas de servidor y parches | **99.999% SLA nativo multirregional** |\n\n---\n\n## 5. Checklist Técnico: Migración Hacia Arquitectura de Grado Élite\n\nPara certificar que una plataforma privada cumple con los estándares más estrictos de ingeniería web contemporánea, aplique la siguiente auditoría preliminar:\n\n- [ ] **Desacople de la capa de presentación:** ¿Su frontend consume datos exclusivamente vía endpoints GraphQL/REST protegidos mediante autenticación mTLS o API keys cifradas?\n- [ ] **Despliegue distribuido en Edge:** ¿El HTML primario se entrega a través de una red perimetral distribuida globalmente con almacenamiento inmutable?\n- [ ] **Aislamiento de la infraestructura de datos:** ¿Sus bases de datos de pacientes o historiales de consumo residen en redes privadas (VPC) completamente inaccesibles desde la Internet pública?\n- [ ] **Headers de inmutabilidad y caché optimizada:** ¿Implementa cabeceras `Cache-Control: public, max-age=31536000, immutable` para activos hash-versionados?\n- [ ] **Fallback y revalidación ISR:** ¿Dispone de una estrategia de revalidación en segundo plano que garantice que ningún usuario experimente páginas en blanco o errores de base de datos caída?\n\n---\n\n## Eleve la Infraestructura Digital de su Empresa al Nivel Dexvoi\n\nUna web lenta o vulnerable devalúa inmediatamente la percepción de excelencia de una marca premium o una clínica privada. En **Dexvoi**, diseñamos y desplegamos arquitecturas de software perimetrales con latencia cercana a cero y blindaje perimetral impenetrable.\n\n**Solicite hoy una auditoría de arquitectura y seguridad gratuita con nuestro equipo de consultores sénior.** Analizaremos el TTFB real, los cuellos de botella de renderizado y los vectores de exposición de su infraestructura actual."
  },
  {
    id: 'post-auto-1790694501764',
    slug: 'blindaje-dns-y-mitigacion-de-spoofing-con-spf-dkim-y-dm',
    title: "Blindaje DNS y Mitigación de Spoofing con SPF, DKIM y DMARC en Empresas",
    excerpt: "Guía técnica para evitar la suplantación de identidad corporativa y asegurar la entregabilidad de correo electrónico con registros DNS criptográficos.",
    category: 'ciberseguridad',
    categoryLabel: 'Ciberseguridad & Compliance',
    tags: ["Seguridad DNS","DMARC","SPF","DKIM","Anti-Phishing"],
    author: {
      name: 'Dexvoi Intelligence Team',
      role: 'Especialistas en Blindaje & Rendimiento Digital',
      badge: 'Verified Lead'
    },
    publishedAt: '2026-09-29T15:08:21.764Z',
    readingTimeMinutes: 6,
    featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    metaDescription: "Guía técnica para evitar la suplantación de identidad corporativa y asegurar la entregabilidad de correo electrónico con registros DNS criptográficos.",
    keywords: ["Seguridad DNS","DMARC","SPF","DKIM","Anti-Phishing"],
    targetServiceUrl: '/auditoria-seguridad',
    targetServiceLabel: 'Solicitar Diagnóstico Especializado',
    content: "\n## La amenaza invisible de la suplantación de identidad corporativa\n\nEl 91% de los ciberataques contra empresas inician mediante correos electrónicos con remitentes falsificados que imitan el dominio oficial de la compañía.\n\n---\n\n### La tríada obligatoria de blindaje DNS\n\n1. **SPF (Sender Policy Framework):** Especifica qué servidores perimetrales tienen autorización para enviar correo a nombre de tu dominio.\n2. **DKIM (DomainKeys Identified Mail):** Firma criptográfica asimétrica que valida que el contenido del mensaje no fue alterado durante el tránsito.\n3. **DMARC (Domain-based Message Authentication):** Instrucción formal para que los receptores rechacen de plano (`p=reject`) cualquier correo no autenticado.\n\n---\n\n### Protocolo de implantación perimetral Dexvoi\n\nConfiguramos las directivas DMARC en modo rechazo estricto con informes forenses agregados (RUA/RUF) para neutralizar cualquier intento de suplantación.\n    "
  },
  {
    id: 'post-auto-1789304047090',
    slug: 'inteligencia-de-datos-y-agentes-de-ia-en-motores-de-res',
    title: "Inteligencia de Datos y Agentes de IA en Motores de Reservas sin Comisiones",
    excerpt: "Por qué sustituir plataformas comisionistas por agentes conversacionales de IA propios multiplica el margen neto en restaurantes y clínicas.",
    category: 'ia-reservas',
    categoryLabel: 'IA & Automatización',
    tags: ["IA Conversacional","Motores Propietarios","Sin Comisiones","Fidelización"],
    author: {
      name: 'Dexvoi Intelligence Team',
      role: 'Especialistas en Blindaje & Rendimiento Digital',
      badge: 'Verified Lead'
    },
    publishedAt: '2026-09-13T12:54:07.090Z',
    readingTimeMinutes: 7,
    featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    metaDescription: "Por qué sustituir plataformas comisionistas por agentes conversacionales de IA propios multiplica el margen neto en restaurantes y clínicas.",
    keywords: ["IA Conversacional","Motores Propietarios","Sin Comisiones","Fidelización"],
    targetServiceUrl: '/auditoria-seguridad',
    targetServiceLabel: 'Solicitar Diagnóstico Especializado',
    content: "\n## La soberanía sobre tus clientes: Por qué prescindir de comisionistas\n\nPagar entre un 15% y un 25% a plataformas agregadoras por reservas de clientes recurrentes erosiona el modelo de negocio de cualquier clínica o restaurante gastronómico.\n\n---\n\n### La solución de automatización autónoma Dexvoi\n\n- Integración directa en WhatsApp y web con comprensión de lenguaje natural.\n- Sincronización en tiempo real con agendas médicas o planos de sala sin latencia.\n- Propiedad íntegra de la base de datos de pacientes y comensales bajo estricto cumplimiento RGPD.\n    "
  },
  {
    id: 'post-auto-1789235818061',
    slug: 'core-web-vitals-inp-y-lcp-en-2026-como-dexvoi-logra-tie',
    title: "Core Web Vitals INP y LCP en 2026: Cómo Dexvoi logra tiempos de carga bajo 300ms",
    excerpt: "Cómo optimizar Interaction to Next Paint (INP) y Largest Contentful Paint (LCP) para lograr puntuaciones perfectas de 100/100 en Google PageSpeed.",
    category: 'arquitectura-web',
    categoryLabel: 'Arquitectura Web & Rendimiento',
    tags: ["Core Web Vitals","INP","LCP","Jamstack","Velocidad Web"],
    author: {
      name: 'Dexvoi Intelligence Team',
      role: 'Especialistas en Blindaje & Rendimiento Digital',
      badge: 'Verified Lead'
    },
    publishedAt: '2026-09-12T17:56:58.061Z',
    readingTimeMinutes: 8,
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    metaDescription: "Cómo optimizar Interaction to Next Paint (INP) y Largest Contentful Paint (LCP) para lograr puntuaciones perfectas de 100/100 en Google PageSpeed.",
    keywords: ["Core Web Vitals","INP","LCP","Jamstack","Velocidad Web"],
    targetServiceUrl: '/auditoria-seguridad',
    targetServiceLabel: 'Solicitar Diagnóstico Especializado',
    content: "\n## La nueva métrica reina de Google: INP (Interaction to Next Paint)\n\nDesde la actualización de los algoritmos de Google, **la interactividad y la respuesta instantánea del usuario (INP)** determinan qué webs merecen las primeras posiciones orgánicas.\n\nSi un paciente hace clic en \"Pedir cita\" o un comensal pulsa \"Ver menú\" y la interfaz se congela durante más de 200 milisegundos, Google penaliza el dominio.\n\n---\n\n### Por qué los CMS clásicos fallan en INP\n\n- Exceso de archivos JavaScript sin optimizar de múltiples plugins.\n- Bloqueo del hilo principal de renderizado del navegador (*Main Thread Block*).\n- Fuentes web y banners de cookies mal implementados.\n\n---\n\n### La ingeniería de Dexvoi: Rendimiento al extremo\n\nEn Dexvoi compilamos el código con empaquetadores de última generación y aplicamos división de código (*code-splitting*), logrando **LCP inferior a 0.8s e INP bajo 50ms**.\n    "
  },
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
 * Finds a blog post by its URL slug across Spanish, French, or English
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim();
  const all = getAllPosts();

  // 1. Direct match with canonical post slug
  const direct = all.find(p => p.slug.toLowerCase() === clean);
  if (direct) return direct;

  // 2. Lookup in BLOG_POST_SLUGS mapping (es, fr, en)
  for (const [canonicalKey, mapping] of Object.entries(BLOG_POST_SLUGS)) {
    if (
      mapping.es.toLowerCase() === clean ||
      mapping.fr.toLowerCase() === clean ||
      mapping.en.toLowerCase() === clean
    ) {
      const match = all.find(p => p.slug.toLowerCase() === canonicalKey.toLowerCase() || p.id === canonicalKey);
      if (match) return match;
    }
  }

  // 3. Fallback check inside post inline translations or BLOG_POST_TRANSLATIONS dictionary
  return all.find(p => {
    if (p.translations) {
      if (p.translations.fr?.slug?.toLowerCase() === clean) return true;
      if (p.translations.en?.slug?.toLowerCase() === clean) return true;
      if (p.translations.es?.slug?.toLowerCase() === clean) return true;
    }
    const dict = BLOG_POST_TRANSLATIONS[p.slug];
    if (dict) {
      if (dict.fr?.slug?.toLowerCase() === clean) return true;
      if (dict.en?.slug?.toLowerCase() === clean) return true;
    }
    return false;
  });
}

/**
 * Gets related posts from the same category or tags, excluding the active post
 */
export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  const currentId = currentPost?.id;
  const cleanSlug = currentSlug.toLowerCase().trim();

  return getPublishedPosts()
    .filter(p => (currentId ? p.id !== currentId : true) && p.slug.toLowerCase() !== cleanSlug)
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
