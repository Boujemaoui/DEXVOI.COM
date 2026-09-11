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
  }
];

const categoryImages = {
  'ciberseguridad': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  'seo-local': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
  'arquitectura-web': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  'ia-reservas': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'
};

async function generateWithGemini(apiKey, existingTitles) {
  try {
    const ai = new GoogleGenAI({ apiKey });
    const categories = ['ciberseguridad', 'seo-local', 'arquitectura-web', 'ia-reservas'];
    const chosenCategory = categories[Math.floor(Math.random() * categories.length)];

    const prompt = `Actúa como Director Técnico y Consultor Senior de Ciberseguridad, SEO y Arquitectura Web de Élite en Dexvoi (empresa de tecnología para clínicas privadas, restaurantes gastronómicos y empresas premium).
Genera un artículo de blog técnico, original, riguroso y exhaustivo enfocado en la categoría "${chosenCategory}".
NO repitas ninguno de estos títulos ya existentes:
${existingTitles.join('\n')}

Devuelve ÚNICAMENTE un JSON válido (sin bloques de markdown ni texto adicional fuera del JSON) con los siguientes campos:
{
  "title": "Título riguroso, atractivo y optimizado para SEO (máx 70 caracteres)",
  "slug": "slug-url-limpio-sin-acentos-y-con-guiones",
  "category": "${chosenCategory}",
  "categoryLabel": "${chosenCategory === 'ciberseguridad' ? 'Ciberseguridad & Compliance' : chosenCategory === 'seo-local' ? 'SEO Local & Google Maps' : chosenCategory === 'arquitectura-web' ? 'Arquitectura Web & Rendimiento' : 'IA & Automatización'}",
  "excerpt": "Resumen conciso y persuasivo del artículo (máximo 160 caracteres)",
  "metaDescription": "Meta descripción optimizada para Google (máximo 155 caracteres)",
  "tags": ["3 a 5 tags técnicos"],
  "readingTimeMinutes": 7,
  "content": "Contenido completo en Markdown con introducción, subtítulos H2 (##), subtítulos H3 (###), tabla comparativa de impacto, viñetas de checklist y llamada a la acción hacia la auditoría gratuita de Dexvoi."
}`;

    const res = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { temperature: 0.7 }
    });

    const raw = res.text?.trim() || '';
    const clean = raw.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    const parsed = JSON.parse(clean);

    if (parsed.title && parsed.content) {
      return {
        ...parsed,
        image: categoryImages[chosenCategory] || categoryImages.ciberseguridad
      };
    }
  } catch (err) {
    console.warn('Could not generate via Gemini API, falling back to curated pool:', err.message);
  }
  return null;
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
      console.log(`Added /blog/${slug} to public/sitemap.xml`);
    }
  } catch (err) {
    console.error('Error updating sitemap:', err);
  }
}

async function generatePost() {
  const blogFilePath = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
  const content = fs.readFileSync(blogFilePath, 'utf8');

  let chosenPost = null;

  // If GEMINI_API_KEY is present, generate a fully unique post dynamically
  if (process.env.GEMINI_API_KEY) {
    console.log('Generating unique article using Gemini API...');
    const existingTitles = [...content.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
    chosenPost = await generateWithGemini(process.env.GEMINI_API_KEY, existingTitles);
  }

  // Fallback to curated pool if no Gemini post
  if (!chosenPost) {
    const available = topicsPool.find(t => !content.includes(t.topic));
    if (!available) {
      console.log('All scheduled topics are already present.');
      return;
    }
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
    excerpt: ${JSON.stringify(chosenPost.excerpt)},
    category: '${chosenPost.category}',
    categoryLabel: '${chosenPost.categoryLabel}',
    tags: ${JSON.stringify(chosenPost.tags)},
    author: {
      name: 'Dexvoi Intelligence Team',
      role: 'Especialistas en Blindaje & Rendimiento Digital',
      badge: 'Verified Lead'
    },
    publishedAt: '${new Date().toISOString()}',
    readingTimeMinutes: ${chosenPost.readingTimeMinutes || 6},
    featuredImage: '${chosenPost.image}',
    metaDescription: ${JSON.stringify(chosenPost.metaDescription)},
    keywords: ${JSON.stringify(chosenPost.tags)},
    targetServiceUrl: '/auditoria-seguridad',
    targetServiceLabel: 'Solicitar Diagnóstico Especializado',
    content: ${JSON.stringify(chosenPost.content)}
  },
`;

  const updatedContent = content.replace(
    'export const INITIAL_BLOG_POSTS: BlogPost[] = [\n',
    `export const INITIAL_BLOG_POSTS: BlogPost[] = [\n${newPostCode}`
  );
  fs.writeFileSync(blogFilePath, updatedContent, 'utf8');
  updateSitemap(cleanSlug);
  console.log(`Successfully generated and published post: "${chosenPost.title}" (${cleanSlug})`);
}

generatePost();

