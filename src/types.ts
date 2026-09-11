export interface ScanResult {
  url: string;
  businessType: 'clinica' | 'restaurante' | 'otro';
  timestamp: string;
  overallScore: number;
  speed: {
    score: number;
    loadTimeSeconds: number;
    fcp: number; // first contentful paint in ms
    mobileOptimized: boolean;
    recommendation: string;
  };
  security: {
    score: number;
    sslGrade: 'A+' | 'A' | 'B' | 'F';
    dataProtectionCompliant: boolean;
    vulnerabilitiesDetected: number;
    headersConfigured: boolean;
    recommendation: string;
  };
  seoLocal: {
    score: number;
    googleMapsIndexed: boolean;
    localRankEstimate: string;
    schemaMarkupDetected: boolean;
    recommendation: string;
  };
  keyFindings: string[];
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
}
