import { OsintSecurityAuditResult } from '../src/types';
import { executeRealSecurityAudit } from '../functions/api/security-audit';

export interface AuditOptions {
  target: string;
  apiKey?: string;
}

// In-Memory Cache with TTL (15 minutes) for high-speed repeated queries without global network side-effects
interface CacheEntry {
  data: OsintSecurityAuditResult;
  expiresAt: number;
}
const auditCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 15 * 60 * 1000;

/**
 * Executes a 100% real web security & technical performance audit.
 * Zero simulation: executes actual HTTP fetch, real headers inspection, real HTML parsing,
 * Google PageSpeed Insights API metrics, and SSL/TLS validation.
 */
export async function runRealSecurityAudit({ target, apiKey }: AuditOptions): Promise<OsintSecurityAuditResult> {
  const normalized = target.trim().toLowerCase().replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
  
  const cached = auditCache.get(normalized);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data;
  }

  const result = await executeRealSecurityAudit({ target, apiKey });
  
  auditCache.set(normalized, {
    data: result,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });

  return result;
}
