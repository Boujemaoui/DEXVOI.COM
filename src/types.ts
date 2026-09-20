export interface ScanResult {
  url: string;
  businessType: 'clinica' | 'restaurante' | 'otro';
  timestamp: string;
  overallScore: number;
  grade?: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  speed: {
    score: number;
    loadTimeSeconds: number;
    responseTimeMs?: number;
    pageSizeFormatted?: string;
    compression?: string;
    rating?: string;
    fcp: number; // first contentful paint in ms
    mobileOptimized: boolean;
    recommendation: string;
  };
  security: {
    score: number;
    sslGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
    sslIssuer?: string;
    sslDaysRemaining?: number;
    tlsProtocol?: string;
    hstsConfigured?: boolean;
    cspConfigured?: boolean;
    xFrameConfigured?: boolean;
    dataProtectionCompliant: boolean;
    vulnerabilitiesDetected: number;
    headersConfigured: boolean;
    recommendation: string;
  };
  seoLocal: {
    score: number;
    titleText?: string;
    metaDescriptionStatus?: string;
    googleMapsIndexed: boolean;
    localRankEstimate: string;
    schemaMarkupDetected: boolean;
    recommendation: string;
  };
  keyFindings: string[];
  issues?: AuditIssue[];
  rawAuditResult?: OsintSecurityAuditResult;
}

export interface PillarService {
  id: string;
  title: string;
  tagline: string;
  shortDesc: string;
  icon: string;
  badge: string;
  benefits: string[];
  specs: { label: string; value: string }[];
  targetAudience: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  category: string;
  quote: string;
  metrics: { label: string; value: string }[];
  verified: boolean;
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  businessType: string;
  websiteUrl?: string;
  primaryConcern?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  language?: 'fr' | 'en' | 'es';
}

export interface SecurityHeaderItem {
  name: string;
  headerKey: string;
  value: string | null;
  status: 'PASS' | 'WARN' | 'FAIL';
  importance: 'CRÍTICA' | 'ALTA' | 'MEDIA' | 'OPCIONAL';
  description: string;
  impact: string;
  recommendation: string;
}

export interface SecurityBreachItem {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'Cabeceras' | 'Criptografía' | 'OSINT' | 'Email Spoofing';
  description: string;
  impact: string;
  remediation: string;
}

export type IssueSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type IssueCategory = 'Seguridad' | 'Rendimiento' | 'SEO Técnico' | 'Móvil' | 'Accesibilidad' | 'Contenido' | 'Infraestructura';

export interface AuditIssue {
  id: string;
  title: string;
  severity: IssueSeverity;
  category: IssueCategory;
  description: string;
  businessImpact: string;
  solution: string;
  codeSnippet?: string;
}

export interface PerformanceAudit {
  score: number;
  responseTimeMs: number;
  pageSizeBytes: number;
  pageSizeFormatted: string;
  estimatedLcpMs: number;
  estimatedCls: number;
  estimatedInpMs: number;
  compression: string | null;
  scriptsCount: number;
  imagesCount: number;
  cssCount: number;
  renderBlockingScripts: number;
  rating: 'EXCELENTE' | 'MEJORABLE' | 'DEFICIENTE';
}

export interface SeoTechnicalAudit {
  score: number;
  title: { text: string | null; length: number; status: 'PASS' | 'WARN' | 'FAIL'; recommendation?: string };
  metaDescription: { text: string | null; length: number; status: 'PASS' | 'WARN' | 'FAIL'; recommendation?: string };
  canonicalUrl: string | null;
  h1: { count: number; texts: string[]; status: 'PASS' | 'WARN' | 'FAIL'; recommendation?: string };
  h2Count: number;
  robotsTxt: { exists: boolean; url: string; status: 'PASS' | 'WARN' };
  sitemap: { exists: boolean; url: string | null; status: 'PASS' | 'WARN' };
  openGraph: { hasTitle: boolean; hasImage: boolean; hasDescription: boolean; status: 'PASS' | 'WARN' };
  twitterCard: { exists: boolean; status: 'PASS' | 'WARN' };
}

export interface SecurityAuditDetails {
  score: number;
  isHttps: boolean;
  sslIssuer: string | null;
  sslValidDaysRemaining: number | null;
  tlsProtocol: string | null;
  exposedFiles: { path: string; status: 'EXPOSED' | 'SECURED'; severity: IssueSeverity; description?: string }[];
  serverBannerExposed: boolean;
  xPoweredByExposed: boolean;
  spfValid: boolean;
  dmarcValid: boolean;
}

export interface MobileAudit {
  score: number;
  hasViewport: boolean;
  viewportContent: string | null;
  isResponsive: boolean;
  hasTouchOptimizedImages: boolean;
  status: 'PASS' | 'WARN' | 'FAIL';
  recommendation: string;
}

export interface AccessibilityAudit {
  score: number;
  totalImages: number;
  imagesWithoutAlt: number;
  altCompletenessRatio: number;
  hasHtmlLang: boolean;
  htmlLang: string | null;
  formInputsWithoutLabel: number;
  headingStructureValid: boolean;
  status: 'PASS' | 'WARN' | 'FAIL';
}

export interface ContentAudit {
  score: number;
  wordCount: number;
  internalLinksCount: number;
  externalLinksCount: number;
  topKeywords: { word: string; count: number; density: string }[];
}

export interface TechStackAudit {
  cms: string | null;
  frameworks: string[];
  analytics: string[];
  cdn: string | null;
  webServer: string | null;
  outdatedWarnings: string[];
}

export interface OverallCategoryScores {
  security: number;
  performance: number;
  seo: number;
  mobile: number;
  accessibility: number;
}

export interface OsintSecurityAuditResult {
  target: string;
  normalizedUrl: string;
  timestamp: string;
  responseTimeMs: number;
  httpStatus: number;
  isHttps: boolean;
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  osint: {
    ip: string | null;
    ipFamily: string | null;
    serverBanner: string | null;
    poweredBy: string | null;
    detectedTech: string[];
    mxRecords: string[];
    hasSpf: boolean;
    hasDmarc: boolean;
    dmarcRecord: string | null;
  };
  headers: SecurityHeaderItem[];
  breaches: SecurityBreachItem[];
  remediationScriptNginx: string;
  remediationScriptApache: string;
  summary: {
    passed: number;
    warnings: number;
    failed: number;
    total: number;
  };
  // Comprehensive Technical Audit Extension
  performance?: PerformanceAudit;
  seo?: SeoTechnicalAudit;
  securityDetails?: SecurityAuditDetails;
  mobile?: MobileAudit;
  accessibility?: AccessibilityAudit;
  content?: ContentAudit;
  techStack?: TechStackAudit;
  issues?: AuditIssue[];
  overallCategoryScores?: OverallCategoryScores;
}
