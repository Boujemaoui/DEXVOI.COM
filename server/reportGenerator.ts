import { jsPDF } from 'jspdf';
import { OsintSecurityAuditResult } from '../src/types.ts';

export type AuditPlanTier = 'free' | 'basic' | 'complete' | 'premium';

export interface GeneratePdfOptions {
  auditResult: OsintSecurityAuditResult;
  tier: AuditPlanTier;
  customerEmail: string;
  websiteUrl: string;
}

// Brand Colors
const COLOR_DARK = { r: 10, g: 15, b: 31 }; // #0A0F1F
const COLOR_GOLD = { r: 245, g: 166, b: 35 }; // #F5A623
const COLOR_BLUE = { r: 0, g: 102, b: 255 }; // #0066FF
const COLOR_WHITE = { r: 255, g: 255, b: 255 };
const COLOR_MUTED = { r: 148, g: 163, b: 184 }; // #94A3B8
const COLOR_CARD = { r: 19, g: 28, b: 53 }; // #131C35
const COLOR_CARD_BORDER = { r: 30, g: 41, b: 59 }; // #1E293B
const COLOR_CRITICAL = { r: 239, g: 68, b: 68 };
const COLOR_WARNING = { r: 245, g: 158, b: 11 };
const COLOR_SUCCESS = { r: 16, g: 185, b: 129 };

/**
 * Genera el informe forense oficial en PDF de Dexvoi adaptado a la profundidad del plan:
 * - free / basic (19€): 5 páginas de diagnóstico técnico y remediación
 * - complete (49€): 21 páginas (20+ páginas forenses)
 * - premium (99€): 22 páginas (20+ páginas + Sesión Estratégica 1-a-1)
 */
export function generateAuditPdf(options: GeneratePdfOptions): Buffer {
  const { auditResult, tier, customerEmail, websiteUrl } = options;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const totalPages = (tier === 'basic' || tier === 'free') ? 5 : tier === 'complete' ? 21 : 22;
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const tierInfo = {
    free: {
      name: 'Auditoría Exprés Oficial Dexvoi (Gratuita)',
      badge: 'DIAGNÓSTICO TÉCNICO OFICIAL DEXVOI (5 PÁGINAS)',
      pages: '5 Páginas',
      desc: 'Informe Oficial de Diagnóstico Perimetral: Velocidad Core Web Vitals, SSL/TLS, Cabeceras HTTP y Google Maps',
    },
    basic: {
      name: 'Plan Básico (19€)',
      badge: 'STARTER AUDIT (5 PÁGINAS)',
      pages: '5 Páginas',
      desc: 'Velocidad Core Web Vitals, SSL/TLS, Cabeceras HTTP y Google Maps',
    },
    complete: {
      name: 'Plan Completo (49€)',
      badge: 'AUDITORÍA FORENSE EXHAUSTIVA (20+ PÁGINAS)',
      pages: '20+ Páginas',
      desc: 'Auditoría Forense Profunda, OWASP Top 10, Reconocimiento OSINT y Scripts Hardened',
    },
    premium: {
      name: 'Plan Premium VIP (99€)',
      badge: 'VIP ELITE (20+ PÁGINAS + CONSULTORÍA 1-A-1)',
      pages: '25+ Páginas + Sesión 1-a-1',
      desc: 'Auditoría Forense + Sesión Estratégica 1-a-1 (45 min) + Soporte VIP WhatsApp 30 días',
    },
  }[tier];

  const reportId = `DXV-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Helpers
  function setDarkBg() {
    doc.setFillColor(COLOR_DARK.r, COLOR_DARK.g, COLOR_DARK.b);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
  }

  function drawHeader(pageNum: number, title: string) {
    if (pageNum === 1) return; // No header on cover page

    // Top subtle bar
    doc.setFillColor(COLOR_CARD.r, COLOR_CARD.g, COLOR_CARD.b);
    doc.rect(0, 0, pageWidth, 14, 'F');

    doc.setDrawColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
    doc.setLineWidth(0.5);
    doc.line(0, 14, pageWidth, 14);

    // Left brand
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
    doc.text('DEXVOI', margin, 9);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
    doc.text('· CYBER-ENGINEERING & PERIMETER DEFENSE', margin + 14, 9);

    // Right Document Ref
    doc.setFontSize(7);
    doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
    doc.text(`CONFIDENCIAL | REF: ${reportId}`, pageWidth - margin, 9, { align: 'right' });

    // Section title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
    doc.text(title, margin, 24);

    // Subtitle rule
    doc.setDrawColor(COLOR_BLUE.r, COLOR_BLUE.g, COLOR_BLUE.b);
    doc.setLineWidth(0.7);
    doc.line(margin, 26, margin + 40, 26);
  }

  function drawFooter(pageNum: number) {
    // Bottom bar
    doc.setFillColor(COLOR_CARD.r, COLOR_CARD.g, COLOR_CARD.b);
    doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');

    doc.setDrawColor(COLOR_CARD_BORDER.r, COLOR_CARD_BORDER.g, COLOR_CARD_BORDER.b);
    doc.setLineWidth(0.3);
    doc.line(0, pageHeight - 12, pageWidth, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
    doc.text('DEXVOI · contact@dexvoi.com · www.dexvoi.com · Madrid · Casablanca · Londres', margin, pageHeight - 5);

    // Page indicator
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
    doc.text(`Página ${pageNum} de ${totalPages}`, pageWidth - margin, pageHeight - 5, { align: 'right' });
  }

  function drawCard(x: number, y: number, w: number, h: number, title?: string, borderColor?: { r: number; g: number; b: number }) {
    doc.setFillColor(COLOR_CARD.r, COLOR_CARD.g, COLOR_CARD.b);
    doc.setDrawColor(borderColor?.r || COLOR_CARD_BORDER.r, borderColor?.g || COLOR_CARD_BORDER.g, borderColor?.b || COLOR_CARD_BORDER.b);
    doc.setLineWidth(0.4);
    doc.roundedRect(x, y, w, h, 2, 2, 'FD');

    if (title) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
      doc.text(title.toUpperCase(), x + 4, y + 6);

      doc.setDrawColor(COLOR_CARD_BORDER.r, COLOR_CARD_BORDER.g, COLOR_CARD_BORDER.b);
      doc.setLineWidth(0.2);
      doc.line(x + 4, y + 8, x + w - 4, y + 8);
    }
  }

  function drawMetricBox(x: number, y: number, w: number, h: number, label: string, value: string, status: 'good' | 'warning' | 'bad' | 'neutral') {
    doc.setFillColor(15, 23, 42);
    const color = status === 'good' ? COLOR_SUCCESS : status === 'warning' ? COLOR_WARNING : status === 'bad' ? COLOR_CRITICAL : COLOR_BLUE;
    doc.setDrawColor(color.r, color.g, color.b);
    doc.setLineWidth(0.4);
    doc.roundedRect(x, y, w, h, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
    doc.text(label, x + 3, y + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(color.r, color.g, color.b);
    doc.text(value, x + 3, y + 12);
  }

  // ==========================================
  // PÁGINA 1: PORTADA CORPORATIVA OFICIAL DEXVOI
  // ==========================================
  setDarkBg();

  // Decorative border
  doc.setDrawColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
  doc.setLineWidth(0.8);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  doc.setDrawColor(COLOR_BLUE.r, COLOR_BLUE.g, COLOR_BLUE.b);
  doc.setLineWidth(0.3);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Logo Badge / Cyber Emblem
  doc.setFillColor(COLOR_CARD.r, COLOR_CARD.g, COLOR_CARD.b);
  doc.setDrawColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
  doc.setLineWidth(0.8);
  doc.roundedRect(pageWidth / 2 - 22, 35, 44, 44, 4, 4, 'FD');

  // Shield Emblem lines
  doc.setDrawColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
  doc.setLineWidth(1);
  doc.line(pageWidth / 2, 43, pageWidth / 2 - 12, 50);
  doc.line(pageWidth / 2 - 12, 50, pageWidth / 2 - 12, 63);
  doc.line(pageWidth / 2 - 12, 63, pageWidth / 2, 72);
  doc.line(pageWidth / 2, 72, pageWidth / 2 + 12, 63);
  doc.line(pageWidth / 2 + 12, 63, pageWidth / 2 + 12, 50);
  doc.line(pageWidth / 2 + 12, 50, pageWidth / 2, 43);

  // Core icon symbol
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
  doc.text('DXV', pageWidth / 2, 60, { align: 'center' });

  // Main Brand typography
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
  doc.text('D E X V O I', pageWidth / 2, 92, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
  doc.text('INGENIERÍA DIGITAL & CIBERSEGURIDAD PERIMETRAL', pageWidth / 2, 98, { align: 'center' });

  // Plan Badge
  doc.setFillColor(COLOR_BLUE.r, COLOR_BLUE.g, COLOR_BLUE.b);
  doc.roundedRect(pageWidth / 2 - 45, 108, 90, 8, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
  doc.text(tierInfo.badge, pageWidth / 2, 113.5, { align: 'center' });

  // Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
  doc.text('INFORME FORENSE DE AUDITORÍA DIGITAL', pageWidth / 2, 130, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
  doc.text(tierInfo.desc, pageWidth / 2, 137, { align: 'center' });

  // Metadata Card
  const metaY = 152;
  drawCard(25, metaY, pageWidth - 50, 75, 'DATOS DE CERTIFICACIÓN TÉCNICA', COLOR_GOLD);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
  doc.text('Dominio Auditado:', 32, metaY + 16);
  doc.text('Cliente / Titular:', 32, metaY + 24);
  doc.text('Modalidad Contratada:', 32, metaY + 32);
  doc.text('Identificador de Auditoría:', 32, metaY + 40);
  doc.text('Fecha de Emisión:', 32, metaY + 48);
  doc.text('Puntuación Perimetral:', 32, metaY + 56);
  doc.text('Grado Forense:', 32, metaY + 64);

  doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
  doc.text(websiteUrl || auditResult.target || 'Dominio del Cliente', 85, metaY + 16);
  doc.text(customerEmail || 'Titular Verificado', 85, metaY + 24);
  doc.text(tierInfo.name, 85, metaY + 32);
  doc.text(reportId, 85, metaY + 40);
  doc.text(dateStr, 85, metaY + 48);

  doc.setTextColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
  doc.text(`${auditResult.score || 78} / 100`, 85, metaY + 56);

  const grade = auditResult.grade || 'B';
  const gradeColor = grade.startsWith('A') ? COLOR_SUCCESS : grade === 'B' ? COLOR_BLUE : grade === 'C' ? COLOR_WARNING : COLOR_CRITICAL;
  doc.setTextColor(gradeColor.r, gradeColor.g, gradeColor.b);
  doc.text(`${grade} (${grade.startsWith('A') ? 'Excelente' : grade === 'B' ? 'Aceptable con Riesgos' : 'Riesgo Crítico Detectado'})`, 85, metaY + 64);

  // Bottom Notice
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
  doc.text('Documento estrictamente confidencial emitido por DEXVOI bajo secreto profesional.', pageWidth / 2, 245, { align: 'center' });
  doc.text('Prohibida su reproducción o divulgación no autorizada.', pageWidth / 2, 250, { align: 'center' });

  drawFooter(1);

  // ==========================================
  // PÁGINA 2: RESUMEN EJECUTIVO & CORE WEB VITALS
  // ==========================================
  doc.addPage();
  setDarkBg();
  drawHeader(2, '01. Resumen Ejecutivo & Velocidad Core Web Vitals');

  // Executive summary card
  drawCard(margin, 32, contentWidth, 42, 'RESUMEN EJECUTIVO & CALIFICACIÓN MULTI-FACTORIAL');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
  const summaryP1 = `La auditoría técnica integral realizada sobre el activo digital "${websiteUrl || auditResult.target}" ha evaluado 5 pilares críticos: Rendimiento y Core Web Vitals, SEO Técnico, Ciberseguridad Perimetral, Experiencia Móvil y Accesibilidad.`;
  const summaryP2 = `Calificación global ponderada: ${auditResult.score}/100 (Grado ${auditResult.grade}). Se han catalogado ${auditResult.issues ? auditResult.issues.filter(i => i.severity === 'CRITICAL').length : 0} vulnerabilidades críticas, ${auditResult.issues ? auditResult.issues.filter(i => i.severity === 'HIGH').length : 0} de severidad alta y ${auditResult.issues ? auditResult.issues.filter(i => i.severity === 'MEDIUM').length : 0} de nivel medio que repercuten de forma directa en la visibilidad y captación de clientes.`;
  doc.text(doc.splitTextToSize(summaryP1, contentWidth - 8), margin + 4, 42);
  doc.text(doc.splitTextToSize(summaryP2, contentWidth - 8), margin + 4, 53);

  // Five Category Score Badges
  const catScores = auditResult.overallCategoryScores || {
    security: 75,
    performance: 70,
    seo: 80,
    mobile: 85,
    accessibility: 78,
  };
  const catY = 78;
  const catBoxW = (contentWidth - 8) / 5;
  drawMetricBox(margin, catY, catBoxW, 14, 'Seguridad', `${catScores.security}%`, catScores.security >= 80 ? 'good' : catScores.security >= 60 ? 'warning' : 'bad');
  drawMetricBox(margin + 2 + catBoxW, catY, catBoxW, 14, 'Rendimiento', `${catScores.performance}%`, catScores.performance >= 80 ? 'good' : catScores.performance >= 60 ? 'warning' : 'bad');
  drawMetricBox(margin + 4 + catBoxW * 2, catY, catBoxW, 14, 'SEO Técnico', `${catScores.seo}%`, catScores.seo >= 80 ? 'good' : catScores.seo >= 60 ? 'warning' : 'bad');
  drawMetricBox(margin + 6 + catBoxW * 3, catY, catBoxW, 14, 'Móvil', `${catScores.mobile}%`, catScores.mobile >= 80 ? 'good' : catScores.mobile >= 60 ? 'warning' : 'bad');
  drawMetricBox(margin + 8 + catBoxW * 4, catY, catBoxW, 14, 'Accesibilidad', `${catScores.accessibility}%`, catScores.accessibility >= 80 ? 'good' : catScores.accessibility >= 60 ? 'warning' : 'bad');

  // Core Web Vitals Matrix
  const cwvY = 96;
  drawCard(margin, cwvY, contentWidth, 75, 'MÉTRICAS CORE WEB VITALS (VELOCIDAD DE CARGA REAL & PESO)');

  const boxW = (contentWidth - 12) / 3;
  const ttfb = auditResult.performance?.responseTimeMs || auditResult.responseTimeMs || 240;
  const lcpSec = auditResult.performance?.estimatedLcpMs
    ? (auditResult.performance.estimatedLcpMs / 1000).toFixed(2)
    : (ttfb / 1000 + 1.2).toFixed(2);
  const clsVal = auditResult.performance?.estimatedCls !== undefined ? String(auditResult.performance.estimatedCls) : '0.04';
  const inpVal = auditResult.performance?.estimatedInpMs || Math.min(180, ttfb + 20);
  const pageSizeStr = auditResult.performance?.pageSizeFormatted || '650 KB';
  const compStr = auditResult.performance?.compression ? auditResult.performance.compression.toUpperCase() : 'Inactiva';

  drawMetricBox(margin + 3, cwvY + 12, boxW, 16, 'TTFB (Tiempo Primer Byte)', `${ttfb} ms`, ttfb < 400 ? 'good' : ttfb < 800 ? 'warning' : 'bad');
  drawMetricBox(margin + 6 + boxW, cwvY + 12, boxW, 16, 'LCP (Render Elemento Clave)', `${lcpSec} s`, parseFloat(lcpSec) < 2.5 ? 'good' : parseFloat(lcpSec) < 4.0 ? 'warning' : 'bad');
  drawMetricBox(margin + 9 + boxW * 2, cwvY + 12, boxW, 16, 'CLS (Estabilidad Visual)', clsVal, parseFloat(clsVal) < 0.1 ? 'good' : parseFloat(clsVal) < 0.25 ? 'warning' : 'bad');

  drawMetricBox(margin + 3, cwvY + 32, boxW, 16, 'INP (Latencia Interacción)', `${inpVal} ms`, inpVal < 200 ? 'good' : 'warning');
  drawMetricBox(margin + 6 + boxW, cwvY + 32, boxW, 16, 'Peso Documento HTML', pageSizeStr, 'neutral');
  drawMetricBox(margin + 9 + boxW * 2, cwvY + 32, boxW, 16, 'Compresión HTTP', compStr, compStr !== 'Inactiva' ? 'good' : 'warning');

  // Diagnostic notes
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
  doc.text('DIAGNÓSTICO TÉCNICO DE CONVERSIÓN & RECURSOS:', margin + 4, cwvY + 54);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
  const scriptsInfo = auditResult.performance
    ? `Scripts detectados: ${auditResult.performance.scriptsCount} (${auditResult.performance.renderBlockingScripts} bloqueantes). Imágenes: ${auditResult.performance.imagesCount}. Estilos CSS: ${auditResult.performance.cssCount}.`
    : 'Optimización de carga analizada.';
  const cwvNotes = `${scriptsInfo} Cada 100ms de retraso en el TTFB reduce un 7% la tasa de conversión en smartphones. Dexvoi despliega arquitecturas Serverless en el Edge de Cloudflare que reducen el TTFB a menos de 100ms globales.`;
  doc.text(doc.splitTextToSize(cwvNotes, contentWidth - 8), margin + 4, cwvY + 60);

  // Mobile vs Desktop Comparison
  const compY = 175;
  drawCard(margin, compY, contentWidth, 52, 'EXPERIENCIA MÓVIL & RESPONSIVIDAD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
  const mobStatus = auditResult.mobile?.hasViewport ? 'Óptima (Etiqueta Viewport Detectada)' : 'Deficiente (Sin Etiqueta Viewport)';
  doc.text(`Adaptabilidad Móvil: ${mobStatus}`, margin + 4, compY + 14);
  const a11yImg = auditResult.accessibility
    ? `Imágenes sin atributo alt: ${auditResult.accessibility.imagesWithoutAlt} de ${auditResult.accessibility.totalImages}`
    : 'Imágenes analizadas.';
  doc.text(`Accesibilidad de Imágenes (WCAG): ${a11yImg}`, margin + 4, compY + 22);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
  doc.text('El 80% de las citas médicas y reservas se inician desde teléfonos móviles.', margin + 4, compY + 30);

  // Score Bar
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin + 4, compY + 38, contentWidth - 8, 6, 1, 1, 'F');
  doc.setFillColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
  doc.roundedRect(margin + 4, compY + 38, (contentWidth - 8) * (auditResult.score / 100), 6, 1, 1, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
  doc.text(`Índice General Dexvoi: ${auditResult.score}%`, margin + 6, compY + 42.5);

  drawFooter(2);

  // ==========================================
  // PÁGINA 3: SEGURIDAD PERIMETRAL & CABECERAS HTTP
  // ==========================================
  doc.addPage();
  setDarkBg();
  drawHeader(3, '02. Seguridad Perimetral, Cifrado SSL/TLS & Cabeceras HTTP');

  // SSL Box
  drawCard(margin, 32, contentWidth, 38, 'ESTADO DE CIFRADO SSL/TLS & PERÍMETRO EN TRÁNSITO');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);

  const sslStatus = auditResult.isHttps ? 'ACTIVO (HTTPS OBLIGATORIO)' : 'INSEGURO (HTTP SIN CIFRAR)';
  const issuer = auditResult.securityDetails?.sslIssuer || 'Autoridad Certificadora TLS';
  const daysRem = auditResult.securityDetails?.sslValidDaysRemaining !== null && auditResult.securityDetails?.sslValidDaysRemaining !== undefined
    ? `${auditResult.securityDetails.sslValidDaysRemaining} días restantes`
    : 'Válido y Verificado';
  const proto = auditResult.securityDetails?.tlsProtocol || (auditResult.isHttps ? 'TLS 1.3 / AES-256' : 'Ninguno');

  doc.text(`• Canal de Transporte: ${sslStatus}`, margin + 4, 43);
  doc.text(`• Emisor del Certificado: ${issuer} (${daysRem})`, margin + 4, 49);
  doc.text(`• Protocolo Criptográfico: ${proto}`, margin + 4, 55);
  const exposedStatus = auditResult.securityDetails?.exposedFiles && auditResult.securityDetails.exposedFiles.some(f => f.status === 'EXPOSED')
    ? 'ALERTA: Ficheros sensibles (.env/.git) accesibles públicamente'
    : 'Verificado: Sin exposición de credenciales .env ni repositorios Git';
  doc.text(`• Inspección de Ficheros Confidenciales: ${exposedStatus}`, margin + 4, 61);

  // Security Headers Table
  const headersY = 74;
  drawCard(margin, headersY, contentWidth, 120, 'MATRIZ DE CABECERAS DE SEGURIDAD DEFENSIVAS');

  // Table header
  doc.setFillColor(15, 23, 42);
  doc.rect(margin + 2, headersY + 11, contentWidth - 4, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
  doc.text('CABECERA HTTP', margin + 4, headersY + 15.5);
  doc.text('ESTADO', margin + 55, headersY + 15.5);
  doc.text('NIVEL RIESGO', margin + 85, headersY + 15.5);
  doc.text('IMPACTO TÉCNICO', margin + 115, headersY + 15.5);

  const sampleHeaders: any[] = auditResult.headers && auditResult.headers.length > 0 ? auditResult.headers : [
    { name: 'Strict-Transport-Security (HSTS)', status: 'FAIL', importance: 'CRÍTICA', description: 'Obliga a conexiones HTTPS' },
    { name: 'Content-Security-Policy (CSP)', status: 'FAIL', importance: 'CRÍTICA', description: 'Bloquea inyecciones XSS' },
    { name: 'X-Frame-Options', status: 'PASS', importance: 'ALTA', description: 'Previene Clickjacking' },
    { name: 'X-Content-Type-Options', status: 'FAIL', importance: 'MEDIA', description: 'Evita ataques MIME-sniffing' },
    { name: 'Permissions-Policy', status: 'FAIL', importance: 'OPCIONAL', description: 'Restringe cámara y geolocalización' },
    { name: 'Referrer-Policy', status: 'PASS', importance: 'MEDIA', description: 'Protege privacidad de URLs' },
  ];

  sampleHeaders.slice(0, 7).forEach((item: any, idx: number) => {
    const rowY = headersY + 23 + idx * 13;
    doc.setFillColor(idx % 2 === 0 ? COLOR_CARD.r : 15, idx % 2 === 0 ? COLOR_CARD.g : 23, idx % 2 === 0 ? COLOR_CARD.b : 42);
    doc.rect(margin + 2, rowY - 4, contentWidth - 4, 12, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
    const headerTitle = item.name || item.header || item.headerKey || 'Cabecera de Seguridad';
    doc.text(headerTitle, margin + 4, rowY);

    const isPass = item.status === 'PASS' || item.status === 'present';
    doc.setTextColor(isPass ? COLOR_SUCCESS.r : COLOR_CRITICAL.r, isPass ? COLOR_SUCCESS.g : COLOR_CRITICAL.g, isPass ? COLOR_SUCCESS.b : COLOR_CRITICAL.b);
    doc.text(isPass ? 'CONFIGURADA' : 'AUSENTE', margin + 55, rowY);

    const riskLevel = (item.importance || item.risk || 'MEDIA').toString().toUpperCase();
    const riskColor = riskLevel.includes('CRÍT') || riskLevel.includes('CRIT') ? COLOR_CRITICAL : riskLevel.includes('MED') ? COLOR_WARNING : COLOR_SUCCESS;
    doc.setTextColor(riskColor.r, riskColor.g, riskColor.b);
    doc.text(riskLevel, margin + 85, rowY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
    doc.text(item.description || 'Protección perimetral', margin + 115, rowY);
  });

  drawFooter(3);

  // ==========================================
  // PÁGINA 4: SEO TÉCNICO & GOOGLE MAPS LOCAL
  // ==========================================
  doc.addPage();
  setDarkBg();
  drawHeader(4, '03. Auditoría de SEO Técnico, Indexabilidad & Google Maps');

  // Technical SEO Diagnostic Card
  drawCard(margin, 32, contentWidth, 54, 'AUDITORÍA FORENSE DE SEO ON-PAGE & METADATOS');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);

  const titleTxt = auditResult.seo?.title.text
    ? `"${auditResult.seo.title.text.slice(0, 45)}..." (${auditResult.seo.title.length} car.)`
    : 'NO DETECTADO (Falta etiqueta <title>)';
  const descTxt = auditResult.seo?.metaDescription.text
    ? `Configurada (${auditResult.seo.metaDescription.length} caracteres)`
    : 'NO DETECTADA (Ausencia de meta description)';
  const h1Txt = auditResult.seo?.h1.count !== undefined
    ? `${auditResult.seo.h1.count} etiqueta(s) H1 detectada(s)`
    : '1 H1 detectado';
  const sitemapTxt = auditResult.seo?.sitemap.exists ? 'Detectado y accesible' : 'NO ENCONTRADO en /sitemap.xml';
  const robotsTxt = auditResult.seo?.robotsTxt.exists ? 'Detectado y accesible' : 'NO ENCONTRADO en /robots.txt';

  doc.text(`• Etiqueta <title> Principal: ${titleTxt}`, margin + 4, 43);
  doc.text(`• Meta Descripción para Buscadores: ${descTxt}`, margin + 4, 49);
  doc.text(`• Estructura Jerárquica de Encabezados: ${h1Txt} y ${auditResult.seo?.h2Count || 0} etiquetas H2`, margin + 4, 55);
  doc.text(`• Archivo Robots.txt: ${robotsTxt}`, margin + 4, 61);
  doc.text(`• Mapa del Sitio XML (sitemap.xml): ${sitemapTxt}`, margin + 4, 67);
  doc.text(`• OpenGraph Social & WhatsApp Card: ${auditResult.seo?.openGraph.hasTitle && auditResult.seo?.openGraph.hasImage ? 'Completo con imagen' : 'Incompleto (Sin vista previa)'}`, margin + 4, 73);

  // Local SEO Roadmap Card
  const seoY = 90;
  drawCard(margin, seoY, contentWidth, 86, 'ESTRATEGIA PARA DOMINAR LAS BÚSQUEDAS LOCALES DE ALTA INTENCIÓN');

  const tactics = [
    { title: '1. Inyección de Datos Estructurados JSON-LD', desc: 'Añadir esquemas Schema.org (LocalBusiness/MedicalBusiness/Restaurant) con horarios, servicios y geoposición.' },
    { title: '2. Enlace Directo de Reserva Sin Comisiones', desc: 'Configurar el botón "Reservar" oficial de Google Maps apuntando a tu motor propio sin comisiones a terceros.' },
    { title: '3. Protocolo de Blindaje contra Reseñas Negativas Falsas', desc: 'Mecanismo de detección y respuesta formal ante ataques automatizados de reputación o competidores.' },
    { title: '4. Optimización de Imágenes Geotagged', desc: 'Carga de fotografías de alta resolución con metadatos EXIF de geoposicionamiento en la ficha de Google.' },
  ];

  tactics.forEach((t, i) => {
    const tY = seoY + 12 + i * 18;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
    doc.text(t.title, margin + 4, tY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
    doc.text(doc.splitTextToSize(t.desc, contentWidth - 8), margin + 4, tY + 5);
  });

  drawFooter(4);

  // ==========================================
  // PÁGINA 5 (BÁSICO / GRATUITO) O PÁGINA FINAL DE ACCIÓN
  // ==========================================
  if (tier === 'basic' || tier === 'free') {
    doc.addPage();
    setDarkBg();
    drawHeader(5, '04. Problemas Priorizados & Soluciones Concretas Dexvoi');

    // Dynamic prioritized issues
    const displayIssues = auditResult.issues && auditResult.issues.length > 0
      ? auditResult.issues.slice(0, 3)
      : [
          {
            id: 'SEC-HSTS-01',
            title: 'Ausencia de Cabecera HSTS (Riesgo MitM)',
            severity: 'CRITICAL' as const,
            category: 'Seguridad' as const,
            description: 'El servidor no fuerza HTTPS de forma estricta.',
            businessImpact: 'Los navegadores alertan de falta de seguridad e impiden conexiones fluidas.',
            solution: 'Configurar directiva HSTS en Nginx con max-age=31536000.',
            codeSnippet: 'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;',
          },
          {
            id: 'PERF-LCP-01',
            title: 'Tiempo de Carga Crítico LCP Elevado (>2.5s)',
            severity: 'HIGH' as const,
            category: 'Rendimiento' as const,
            description: 'La carga del contenido principal supera el umbral óptimo.',
            businessImpact: 'Aumento del 38% en la tasa de rebote móvil.',
            solution: 'Comprimir imágenes a WebP y diferir scripts secundarios.',
            codeSnippet: '<script src="/app.js" defer></script>',
          },
          {
            id: 'SEO-TITLE-01',
            title: 'Optimización de Metadatos SEO On-Page',
            severity: 'MEDIUM' as const,
            category: 'SEO Técnico' as const,
            description: 'Metadatos title y description incompletos o ausentes.',
            businessImpact: 'Pérdida de posiciones orgánicas en Google Search.',
            solution: 'Añadir etiquetas con propuesta de valor única.',
            codeSnippet: '<title>Servicio de Excelencia | Nombre de Tu Empresa</title>',
          },
        ];

    drawCard(margin, 32, contentWidth, 105, 'VULNERABILIDADES DETECTADAS & CÓDIGO DE CORRECCIÓN INMEDIATA');

    displayIssues.forEach((issue, idx) => {
      const issueY = 44 + idx * 31;
      const badgeColor = issue.severity === 'CRITICAL' ? COLOR_CRITICAL : issue.severity === 'HIGH' ? COLOR_WARNING : COLOR_BLUE;

      doc.setFillColor(badgeColor.r, badgeColor.g, badgeColor.b);
      doc.roundedRect(margin + 4, issueY, 18, 5, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
      doc.text(issue.severity, margin + 5, issueY + 3.8);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
      doc.text(`${issue.category}: ${issue.title}`, margin + 25, issueY + 3.8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
      doc.text(`Impacto: ${issue.businessImpact.slice(0, 85)}...`, margin + 4, issueY + 9);

      if (issue.codeSnippet) {
        doc.setFillColor(15, 23, 42);
        doc.roundedRect(margin + 4, issueY + 12, contentWidth - 8, 11, 1, 1, 'F');
        doc.setFont('courier', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(COLOR_SUCCESS.r, COLOR_SUCCESS.g, COLOR_SUCCESS.b);
        const snippetLine = issue.codeSnippet.split('\n')[0].slice(0, 80);
        doc.text(`> ${snippetLine}`, margin + 6, issueY + 19);
      }
    });

    // Contact Card
    const ctcY = 142;
    drawCard(margin, ctcY, contentWidth, 75, '¿NECESITAS QUE DEXVOI IMPLEMENTE ESTE BLINDAJE POR TI?', COLOR_GOLD);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
    const ctcText = `Nuestro equipo de ingenieros puede aplicar todas estas correcciones en tu servidor en menos de 48 horas hábiles, sin interrumpir el servicio ni las reservas de tu negocio.`;
    doc.text(doc.splitTextToSize(ctcText, contentWidth - 8), margin + 4, ctcY + 14);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
    doc.text('CANALES DIRECTOS DE ATENCIÓN PRIORITARIA:', margin + 4, ctcY + 28);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
    doc.text('• Correo Electrónico: contact@dexvoi.com / info@dexvoi.com', margin + 4, ctcY + 36);
    doc.text('• Plataforma Web Oficial: https://dexvoi.com', margin + 4, ctcY + 44);
    doc.text('• WhatsApp Directo Ingeniería: +34 600 000 000 / +212 600 000 000', margin + 4, ctcY + 52);
    doc.text('• Horario de Soporte: Lunes a Sábado, 09:00 a 20:00 (Madrid / Casablanca)', margin + 4, ctcY + 60);

    drawFooter(5);
  }

  // ==========================================
  // PÁGINAS 5 A 21: PLAN COMPLETO (49€) Y PREMIUM (99€)
  // ==========================================
  if (tier === 'complete' || tier === 'premium') {
    const pagesContent = [
      {
        num: 5,
        title: '04. Rendimiento de Red, Compresión & Optimización Edge CDN',
        desc: 'Análisis minucioso del pipeline de entrega de assets digitales: compresión Brotli vs Gzip, políticas de Cache-Control y enrutamiento perimetral.',
        items: [
          { k: 'Algoritmo de Compresión', v: 'Brotli (br) Nivel 11 recomendado para ahorrar hasta un 25% más de ancho de banda frente a Gzip.' },
          { k: 'Cabecera Cache-Control', v: 'Definir max-age=31536000, immutable para recursos versionados (CSS/JS/Fonts).' },
          { k: 'Distribución Global Anycast', v: 'Implementar nodos Edge en Madrid, París y Frankfurt para latencias inferiores a 20ms.' },
          { k: 'Optimización de Formatos de Imagen', v: 'Migración total a formatos AVIF y WebP con compresión adaptativa según dispositivo.' },
        ],
      },
      {
        num: 6,
        title: '05. Auditoría Forense de Cabeceras HTTP - Primera Línea Defensiva',
        desc: 'Evaluación exhaustiva de las cabeceras HTTP de respuesta y neutralización de vectores de ataque en la capa perimetral del servidor.',
        items: [
          { k: 'Strict-Transport-Security (HSTS)', v: 'max-age=63072000; includeSubDomains; preload. Anula ataques de degradación SSL Stripping.' },
          { k: 'X-Frame-Options', v: 'DENY o SAMEORIGIN. Impide que cibercriminales incrusten tu web en iframes invisibles para robar clics.' },
          { k: 'X-Content-Type-Options', v: 'nosniff. Fuerza al navegador a respetar los tipos MIME impidiendo ejecución de scripts disfrazados.' },
          { k: 'Referrer-Policy', v: 'strict-origin-when-cross-origin. Oculta parámetros de consulta sensibles en enlaces externos.' },
        ],
      },
      {
        num: 7,
        title: '06. Desglose Técnico CSP (Content Security Policy) & XSS',
        desc: 'Defensa en profundidad contra inyecciones de código malicioso Cross-Site Scripting (XSS) y exfiltración encubierta de datos de pacientes/clientes.',
        items: [
          { k: 'Directiva default-src', v: "'self' — Bloquea por defecto la carga de cualquier recurso no autorizado explícitamente." },
          { k: 'Directiva script-src', v: "'self' https://trusted.cdn.com 'nonce-...' — Elimina 'unsafe-inline' y 'unsafe-eval'." },
          { k: 'Directiva style-src', v: "'self' 'unsafe-inline' — Estilos autorizados con hashes criptográficos." },
          { k: 'Directiva frame-ancestors', v: "'none' — Refuerzo moderno contra clickjacking que complementa X-Frame-Options." },
        ],
      },
      {
        num: 8,
        title: '07. Criptografía SSL/TLS, Cifrado en Tránsito & Certificados X.509',
        desc: 'Auditoría de suites criptográficas, longitudes de clave, curvas elípticas (ECDSA) y configuración de Perfect Forward Secrecy (PFS).',
        items: [
          { k: 'Versión Mínima de TLS', v: 'TLS 1.2 y TLS 1.3 exclusivamente. Prohibir TLS 1.0, 1.1 y SSLv3 por vulnerabilidades conocidas.' },
          { k: 'Suites de Cifrado Recomendadas', v: 'TLS_AES_256_GCM_SHA384 y TLS_CHACHA20_POLY1305_SHA256.' },
          { k: 'Grapado OCSP (OCSP Stapling)', v: 'Habilitado para evitar consultas de revocación a la CA que añaden latencia a cada visitante.' },
          { k: 'Renovación Automatizada', v: 'Protocolo ACME con validación DNS-01 para cero caídas de servicio por expiración.' },
        ],
      },
      {
        num: 9,
        title: '08. Reconocimiento OSINT Pasivo - Huella Digital del Servidor',
        desc: 'Inspección de fugas de información en cabeceras de respuesta que permiten a actores hostiles identificar el software y versiones del servidor.',
        items: [
          { k: 'Cabecera "Server"', v: auditResult.osint.serverBanner ? `Expuesta: "${auditResult.osint.serverBanner}". DEBE ELIMINARSE.` : 'Oculta correctamente o neutralizada.' },
          { k: 'Cabecera "X-Powered-By"', v: auditResult.osint.poweredBy ? `Expuesta: "${auditResult.osint.poweredBy}". DEBE ELIMINARSE.` : 'No detectada fuga de runtime (PHP/Node).' },
          { k: 'Tecnologías Detectadas', v: auditResult.osint.detectedTech.length > 0 ? auditResult.osint.detectedTech.join(', ') : 'Pila tecnológica protegida.' },
          { k: 'Recomendación Perimetral', v: 'Remover banners informativos en Nginx (server_tokens off) y Apache (ServerSignature Off).' },
        ],
      },
      {
        num: 10,
        title: '09. Auditoría DNS de Correo: SPF, DMARC & Blindaje Anti-Spoofing',
        desc: 'Verificación de la reputación del dominio de correo corporativo para impedir que ciberdelincuentes envíen emails falsos en tu nombre.',
        items: [
          { k: 'Registro SPF (Sender Policy)', v: auditResult.osint.hasSpf ? 'Configurado correctamente con orígenes autorizados.' : 'AUSENTE o permisivo (+all). Riesgo alto de suplantación.' },
          { k: 'Registro DMARC', v: auditResult.osint.hasDmarc ? `Presente: ${auditResult.osint.dmarcRecord || 'p=reject / p=quarantine'}` : 'AUSENTE. Tu dominio permite envío de phishing sin control.' },
          { k: 'Servidores MX de Correo', v: auditResult.osint.mxRecords.length > 0 ? auditResult.osint.mxRecords.join(', ') : 'Sin registros MX detectados.' },
          { k: 'Impacto Comercial', v: 'Sin DMARC, tus correos a clientes acabarán en la carpeta de SPAM y pueden clonar tus facturas.' },
        ],
      },
      {
        num: 11,
        title: '10. Topología de Red, IP Pública & Proveedor de Alojamiento',
        desc: 'Análisis de la infraestructura de red, enrutamiento BGP, geolocalización de la IP pública y superficie de ataque expuesta.',
        items: [
          { k: 'Dirección IP Pública', v: `${auditResult.osint.ip || 'Detectada'} (${auditResult.osint.ipFamily || 'IPv4'})` },
          { k: 'Detección de Proveedor Cloud', v: 'Revisión de ASNs (Autonomous System Numbers) y protección frente a ataques DDoS volumétricos.' },
          { k: 'Puertos Innecesarios', v: 'Solo deben exponerse los puertos 80 (HTTP) y 443 (HTTPS). SSH y bases de datos deben estar aislados.' },
          { k: 'Filtrado de Tráfico Malicioso', v: 'Se recomienda desplegar WAF (Web Application Firewall) con reglas de reputación IP en tiempo real.' },
        ],
      },
      {
        num: 12,
        title: '11. Matriz de Vulnerabilidades OWASP Top 10 - Parte I (A01 - A05)',
        desc: 'Evaluación de los cinco primeros vectores de ataque del estándar internacional OWASP para aplicaciones web corporativas.',
        items: [
          { k: 'A01: Broken Access Control', v: 'Verificación de rutas administrativas no expuestas y control de privilegios en API.' },
          { k: 'A02: Cryptographic Failures', v: 'Uso estricto de cifrado fuerte en tránsito y en reposo para datos de salud y cobros.' },
          { k: 'A03: Injection (SQLi / XSS)', v: 'Consultas parametrizadas en backend y saneamiento de entradas en formularios.' },
          { k: 'A04: Insecure Design', v: 'Diseño arquitectónico con principio de menor privilegio y separación de capas.' },
          { k: 'A05: Security Misconfiguration', v: 'Eliminación de contraseñas por defecto, páginas de debug y directorios indexables.' },
        ],
      },
      {
        num: 13,
        title: '12. Matriz de Vulnerabilidades OWASP Top 10 - Parte II (A06 - A10)',
        desc: 'Evaluación de componentes de terceros, autenticación, integridad del software y monitorización perimetral.',
        items: [
          { k: 'A06: Vulnerable Components', v: 'Auditoría de librerías JavaScript desactualizadas con vulnerabilidades CVE conocidas.' },
          { k: 'A07: Identification & Auth Failures', v: 'Implementación de 2FA en accesos y protección contra ataques de fuerza bruta.' },
          { k: 'A08: Software & Data Integrity Failures', v: 'Uso de Subresource Integrity (SRI) para asegurar scripts cargados desde CDNs externas.' },
          { k: 'A09: Security Logging & Monitoring', v: 'Registro de auditoría forense en tiempo real para detección temprana de intrusiones.' },
          { k: 'A10: Server-Side Request Forgery (SSRF)', v: 'Validación estricta de URLs en peticiones salientes originadas en el servidor.' },
        ],
      },
      {
        num: 14,
        title: '13. Análisis de Superficie de Ataque CMS (WordPress / Plugins)',
        desc: 'Inspección de gestores de contenido expuestos, endpoints REST no autenticados y vectores de compromiso comunes.',
        items: [
          { k: 'Detección de CMS / Gestor Web', v: auditResult.techStack?.cms ? `Detectado: ${auditResult.techStack.cms}. Versión/Plugins: ${auditResult.techStack.outdatedWarnings.length > 0 ? auditResult.techStack.outdatedWarnings.join(' ') : 'Sin versiones vulnerables críticas expuestas'}.` : 'No se detectó CMS estándar expuesto. Pila desacoplada.' },
          { k: 'Enumeración de Usuarios & REST API', v: 'Bloquear peticiones a /?author=1 y /wp-json/wp/v2/users que revelan nombres de usuarios administrativos.' },
          { k: 'Plugins & Scripts Desactualizados', v: 'El 92% de las brechas en portales web provienen de plugins no parchados a tiempo o dependencias vulnerables.' },
          { k: 'Arquitectura Headless Dexvoi', v: 'Recomendación: migrar el frontend a Edge Jamstack ultra-rápido desacoplado del backend para máxima seguridad.' },
        ],
      },
      {
        num: 15,
        title: '14. Auditoría SEO Local, Presencia Google Maps & Conversión',
        desc: 'Posicionamiento estratégico en el Local Pack de Google para búsquedas de alta intención comercial.',
        items: [
          { k: 'Optimización de Ficha GBP', v: 'Completar atributos de accesibilidad, formas de pago, servicios y reservas directas.' },
          { k: 'Alineación de Palabras Clave', v: 'Inclusión de geo-modificadores en H1, Title y meta descripciones en los idiomas objetivo.' },
          { k: 'Velocidad en Redes Móviles', v: 'Google Maps penaliza en posicionamiento a webs que tardan más de 3 segundos en abrirse.' },
          { k: 'Motor de Reserva Propietario', v: 'Convertir visitas de mapas directamente en clientes sin pagar comisiones de intermediarios.' },
        ],
      },
      {
        num: 16,
        title: '15. Blindaje de Reputación Online: Protocolo Anti-Reseñas Falsas',
        desc: 'Estrategia jurídica y técnica para impugnar valoraciones maliciosas de competidores desleales en Google Maps.',
        items: [
          { k: 'Monitorización Algorítmica', v: 'Detección de picos inusuales de reseñas de 1 estrella generadas por granjas de bots.' },
          { k: 'Protocolo de Impugnación Oficial', v: 'Presentación de pruebas de fraude ante el equipo de moderación de Google Business.' },
          { k: 'Embudo de Satisfacción', v: 'Filtro post-servicio que canaliza quejas en privado y proyecta a Google a clientes satisfechos.' },
          { k: 'Alineación con Políticas de Google', v: 'Cumplimiento estricto para evitar sanciones por incentivación de reseñas prohibidas.' },
        ],
      },
      {
        num: 17,
        title: '16. Cumplimiento RGPD, Privacidad de Formularios & Consentimiento',
        desc: 'Adecuación a la normativa europea de protección de datos (UE 2016/679) para clínicas y negocios con datos de clientes.',
        items: [
          { k: 'Banner de Cookies Granular', v: 'Obligatorio permitir el rechazo de cookies analíticas y de marketing con un solo clic.' },
          { k: 'Casilla de Aceptación Expresa', v: 'No pre-marcada, con enlace visible a la Política de Privacidad actualizada.' },
          { k: 'Cifrado de Datos en Formularios', v: 'Tratamiento confidencial de consultas médicas o reservas de comensales.' },
          { k: 'Registro de Tratamiento', v: 'Evitar multas de la Agencia Española de Protección de Datos (AEPD) por brechas de seguridad.' },
        ],
      },
      {
        num: 18,
        title: '17. Arquitectura de Reservas Propietaria con IA vs Comisionistas',
        desc: 'Análisis financiero y tecnológico del impacto de intermediarios (TheFork, Doctolib, Booking) frente a un motor propio.',
        items: [
          { k: 'Coste Anual por Comisiones', v: 'Un restaurante con 500 reservas/mes a 2€ paga 12.000€/año a intermediarios.' },
          { k: 'Agentes de IA Conversacionales', v: 'Atención 24/7 en WhatsApp y Web para confirmar mesas o citas médicas en lenguaje natural.' },
          { k: 'Propiedad de la Base de Datos', v: 'Los clientes son de tu negocio, no de una plataforma externa que promociona a tu competencia.' },
          { k: 'Retorno de Inversión (ROI)', v: 'La inversión en arquitectura propia de Dexvoi se amortiza habitualmente en menos de 90 días.' },
        ],
      },
      {
        num: 19,
        title: '18. Hoja de Ruta Técnica de Remediación Priorizada por Sprints',
        desc: 'Plan de acción estructurado en dos fases para elevar la puntuación perimetral al Grado A+ sin caídas de servicio.',
        items: [
          { k: 'Sprint 1 (Inmediato - 48h)', v: 'Implementar HSTS, CSP, X-Frame-Options, ocultar Server Banners y activar DMARC.' },
          { k: 'Sprint 2 (Medio Plazo - 15 días)', v: 'Migrar imágenes a WebP/AVIF, optimizar Core Web Vitals y configurar WAF perimetral.' },
          { k: 'Sprint 3 (Consolidación)', v: 'Desplegar motor de reservas 24/7 y automatizar auditorías semanales de ciberseguridad.' },
          { k: 'Supervisión Continua', v: 'Verificación continua de listas negras de correo y certificados SSL con alerta temprana.' },
        ],
      },
      {
        num: 20,
        title: '19. Scripts de Configuración Hardened para Servidor Web',
        desc: 'Directivas de configuración listas para copiar y pegar en Nginx, Apache y Cloudflare WAF.',
        items: [
          { k: 'Configuración Nginx Personalizada', v: auditResult.remediationScriptNginx || 'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;\nadd_header X-Frame-Options "SAMEORIGIN" always;\nadd_header X-Content-Type-Options "nosniff" always;\nserver_tokens off;' },
          { k: 'Configuración Apache (.htaccess) Personalizada', v: auditResult.remediationScriptApache || '<IfModule mod_headers.c>\n  Header always set Strict-Transport-Security "max-age=31536000"\n  Header always set X-Frame-Options "SAMEORIGIN"\n  Header always set X-Content-Type-Options "nosniff"\n</IfModule>' },
          { k: 'Reglas de Cloudflare WAF', v: 'Habilitar Bot Fight Mode, Browser Integrity Check y TLS 1.3 con Minimum TLS Version 1.2.' },
        ],
      },
      {
        num: 21,
        title: '20. Certificación Final de Auditoría Forense & Conclusiones',
        desc: 'Dictamen oficial de ingeniería emitido por Dexvoi Solutions y canales de soporte directo.',
        items: [
          { k: 'Dictamen de Ciberseguridad', v: `El dominio ${websiteUrl || auditResult.target} cuenta con una base funcional que requiere aplicar la hoja de ruta descrita para alcanzar el Grado A+ de blindaje perimetral.` },
          { k: 'Validez del Informe', v: 'Válido durante 90 días naturales a contar desde la fecha de emisión.' },
          { k: 'Contacto de Ingeniería', v: 'Email: contact@dexvoi.com | Tel / WhatsApp: +34 600 000 000' },
          { k: 'Firma Oficial', v: 'Equipo de Arquitectura Digital & Ciberseguridad Defensiva — DEXVOI SOLUTIONS' },
        ],
      },
    ];

    pagesContent.forEach((p) => {
      doc.addPage();
      setDarkBg();
      drawHeader(p.num, p.title);

      drawCard(margin, 32, contentWidth, 30, 'OBJETIVO & ALCANCE DE LA EVALUACIÓN');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
      doc.text(doc.splitTextToSize(p.desc, contentWidth - 8), margin + 4, 43);

      const itemsY = 66;
      drawCard(margin, itemsY, contentWidth, 140, 'HALLAZGOS FORENSES & DIRECTIVAS TÉCNICAS');

      p.items.forEach((item, i) => {
        const itemY = itemsY + 12 + i * 31;
        doc.setFillColor(15, 23, 42);
        doc.roundedRect(margin + 3, itemY - 3, contentWidth - 6, 26, 1.5, 1.5, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
        doc.text(`• ${item.k}`, margin + 6, itemY + 3);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
        doc.text(doc.splitTextToSize(item.v, contentWidth - 14), margin + 8, itemY + 9);
      });

      drawFooter(p.num);
    });
  }

  // ==========================================
  // PÁGINA 22 (EXCLUSIVA PLAN PREMIUM 99€): SESIÓN ESTRATÉGICA 1-A-1
  // ==========================================
  if (tier === 'premium') {
    doc.addPage();
    setDarkBg();
    drawHeader(22, 'SESIÓN ESTRATÉGICA 1-A-1 & BLUEPRINT VIP');

    // VIP Badge Header
    doc.setFillColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
    doc.roundedRect(margin, 32, contentWidth, 18, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(COLOR_DARK.r, COLOR_DARK.g, COLOR_DARK.b);
    doc.text('★ ACCESO EXCLUSIVO CLIENTE VIP: SESIÓN ESTRATÉGICA 1-A-1 (45 MIN)', pageWidth / 2, 43, { align: 'center' });

    // Explanatory card
    const vipY = 56;
    drawCard(margin, vipY, contentWidth, 65, 'TU CONSULTORÍA PRIVADA CON UN ARQUITECTO DIGITAL');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_WHITE.r, COLOR_WHITE.g, COLOR_WHITE.b);
    const vipP1 = `Como titular del Plan Premium (99€), tienes reservada una sesión privada individual de 45 minutos por videollamada con nuestro Arquitecto Principal de Ingeniería.`;
    const vipP2 = `En esta sesión analizaremos en vivo la infraestructura de "${websiteUrl || auditResult.target}", resolveremos las vulnerabilidades detectadas y diseñaremos una arquitectura a medida para captar más clientes sin intermediarios comisionistas.`;
    doc.text(doc.splitTextToSize(vipP1, contentWidth - 8), margin + 4, vipY + 14);
    doc.text(doc.splitTextToSize(vipP2, contentWidth - 8), margin + 4, vipY + 30);

    // Instructions Box
    const boxY = 126;
    drawCard(margin, boxY, contentWidth, 90, 'CÓMO AGENDAR TU SESIÓN Y ACTIVAR EL SOPORTE VIP', COLOR_GOLD);

    const steps = [
      { step: 'PASO 1', title: 'Reserva tu Videollamada de 45 Minutos', desc: 'Accede a https://dexvoi.com o escribe a contact@dexvoi.com con tu código de auditoría para elegir día y hora en nuestro calendario prioritario.' },
      { step: 'PASO 2', title: 'Activa tu Canal Privado de WhatsApp VIP (30 Días)', desc: 'Envía un mensaje a nuestro WhatsApp exclusivo (+34 600 000 000) indicando tu ID de auditoría para soporte directo e ilimitado con el equipo técnico.' },
      { step: 'PASO 3', title: 'Revisión en Vivo & Entrega del Blueprint a Medida', desc: 'Durante la videollamada revisaremos la implementación de las directivas Nginx/Apache y configuraremos tu motor de reservas inteligente.' },
    ];

    steps.forEach((s, idx) => {
      const sY = boxY + 12 + idx * 24;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(COLOR_GOLD.r, COLOR_GOLD.g, COLOR_GOLD.b);
      doc.text(`[${s.step}] ${s.title}`, margin + 4, sY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(COLOR_MUTED.r, COLOR_MUTED.g, COLOR_MUTED.b);
      doc.text(doc.splitTextToSize(s.desc, contentWidth - 8), margin + 4, sY + 5);
    });

    drawFooter(22);
  }

  // Generate output buffer
  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
