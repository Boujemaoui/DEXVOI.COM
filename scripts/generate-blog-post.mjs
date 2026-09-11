import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

- **Monitoreo de huella IP y patrones temporales:** Las campañas de desprestigio suelen concentrar varias valoraciones sin texto en intervalos de menos de 48 horas.
- **Respuesta institucional asertiva:** Nunca entres en conflicto público. Responde con un mensaje profesional indicando que no consta reserva a ese nombre y ofreciendo canal directo con gerencia.
- **Impugnación formal por vulneración de políticas:** Solicita la retirada alegando conflicto de interés y contenido falso con pruebas del registro interno de reservas.

---

### Solución Dexvoi: Ficha blindada y reputación proactiva

Diseñamos sistemas que canalizan las valoraciones positivas de comensales reales directamente a Google Maps mientras resuelven incidencias de forma privada.
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
## La nueva métrica reina de Google: INP (Interaction to Next Paint)

Desde la actualización de los algoritmos de Google, **la interactividad y la respuesta instantánea del usuario (INP)** determinan qué webs merecen las primeras posiciones orgánicas.

Si un paciente hace clic en "Pedir cita" o un comensal pulsa "Ver menú" y la interfaz se congela durante más de 200 milisegundos, Google penaliza el dominio.

---

### Por qué los CMS clásicos fallan en INP

- Exceso de archivos JavaScript sin optimizar de múltiples plugins.
- Bloqueo del hilo principal de renderizado del navegador (*Main Thread Block*).
- Fuentes web y banners de cookies mal implementados.

---

### La ingeniería de Dexvoi: Rendimiento al extremo

En Dexvoi compilamos el código con empaquetadores de última generación y aplicamos división de código (*code-splitting*), logrando **LCP inferior a 0.8s e INP bajo 50ms**.
    `
  }
];

function generatePost() {
  const blogFilePath = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
  const content = fs.readFileSync(blogFilePath, 'utf8');

  // Find a topic not yet added
  const availableTopic = topicsPool.find(t => !content.includes(t.topic));
  if (!availableTopic) {
    console.log('All automated topics are already present.');
    return;
  }

  const slug = availableTopic.topic
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 55);

  const newPostCode = `  {
    id: 'post-auto-${Date.now()}',
    slug: '${slug}',
    title: '${availableTopic.topic}',
    excerpt: '${availableTopic.metaDescription}',
    category: '${availableTopic.category}',
    categoryLabel: '${availableTopic.categoryLabel}',
    tags: ${JSON.stringify(availableTopic.tags)},
    author: {
      name: 'Dexvoi Intelligence Team',
      role: 'Especialistas en Blindaje & Rendimiento Digital',
      badge: 'Verified Lead'
    },
    publishedAt: '${new Date().toISOString()}',
    readingTimeMinutes: ${availableTopic.readingTimeMinutes},
    featuredImage: '${availableTopic.image}',
    metaDescription: '${availableTopic.metaDescription}',
    keywords: ${JSON.stringify(availableTopic.tags)},
    targetServiceUrl: '/auditoria-seguridad',
    targetServiceLabel: 'Solicitar Diagnóstico Especializado',
    content: \`${availableTopic.content}\`
  },
`;

  const updatedContent = content.replace('export const INITIAL_BLOG_POSTS: BlogPost[] = [\n', `export const INITIAL_BLOG_POSTS: BlogPost[] = [\n${newPostCode}`);
  fs.writeFileSync(blogFilePath, updatedContent, 'utf8');
  console.log(`Successfully generated and published post: "${availableTopic.topic}" (${slug})`);
}

generatePost();
