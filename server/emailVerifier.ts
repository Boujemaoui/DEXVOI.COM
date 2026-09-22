import dns from 'dns/promises';

export interface EmailVerificationResult {
  valid: boolean;
  reason?: string;
  domain?: string;
  mxCount?: number;
  warning?: string;
}

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  '10minutemail.com',
  'tempmail.com',
  'guerrillamail.com',
  'throwawaymail.com',
  'yopmail.com',
  'sharklasers.com',
  'dispostable.com',
  'trashmail.com',
  'getairmail.com',
  'nada.ltd',
  'mohmal.com',
  'fakemailgenerator.com',
  'crazymailing.com',
  'armyspy.com',
  'cuvox.de',
  'dayrep.com',
  'fleckens.hu',
  'gustr.com',
  'jourrapide.com',
  'rhyta.com',
  'superrito.com',
  'teleworm.us',
  'mytemp.email',
  'temp-mail.org',
  'generator.email',
  'emailondeck.com',
  'disposablemail.com',
  'burnermail.io'
]);

const DUMMY_PREFIXES = new Set([
  'test', 'asdf', 'fake', 'dummy', 'admin', 'user', 'noemail', 'none',
  'testing', 'qwerty', '123', '1234', 'aaa', 'abc', 'xyz', 'foo'
]);

const DUMMY_DOMAINS = new Set([
  'test.com', 'asdf.com', 'fake.com', 'dummy.com', 'example.com',
  'sample.com', 'testing.com', 'qwerty.com', '123.com', 'aaa.com',
  'abc.com', 'xyz.com', 'foo.bar', 'domain.com', 'email.com'
]);

/**
 * Validates an email address ensuring:
 * 1. Correct RFC 5322 syntax
 * 2. Non-disposable / non-temporary domain
 * 3. Not a dummy/placeholder email
 * 4. Active DNS MX records on the domain to guarantee deliverability
 */
export async function verifyEmailAddress(email: string): Promise<EmailVerificationResult> {
  if (!email || typeof email !== 'string') {
    return { valid: false, reason: 'El correo electrónico no puede estar vacío.' };
  }

  const trimmed = email.trim().toLowerCase();

  // Basic regex check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, reason: 'El formato del correo electrónico no es válido (ejemplo: contacto@tuempresa.com).' };
  }

  const [localPart, domain] = trimmed.split('@');

  if (!localPart || !domain) {
    return { valid: false, reason: 'El correo electrónico está incompleto.' };
  }

  if (localPart.length > 64) {
    return { valid: false, reason: 'La parte del usuario en el correo es excesivamente larga.' };
  }

  if (domain.length > 253) {
    return { valid: false, reason: 'El dominio del correo es excesivamente largo.' };
  }

  // Check disposable domains
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      valid: false,
      reason: 'No se admiten correos temporales o desechables. Por favor introduce tu correo corporativo o personal real.',
      domain
    };
  }

  // Check dummy addresses
  if (DUMMY_DOMAINS.has(domain) || (DUMMY_PREFIXES.has(localPart) && domain.includes('test'))) {
    return {
      valid: false,
      reason: 'Por favor introduce un correo electrónico real de contacto para remitirte el informe.',
      domain
    };
  }

  // Active DNS MX resolution
  try {
    const mxRecords = await Promise.race([
      dns.resolveMx(domain),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('DNS_TIMEOUT')), 3500)
      ),
    ]);

    if (!mxRecords || mxRecords.length === 0) {
      return {
        valid: false,
        reason: `El dominio @${domain} no dispone de servidores de correo activos (sin registros MX).`,
        domain
      };
    }

    return {
      valid: true,
      domain,
      mxCount: mxRecords.length,
    };
  } catch (err: any) {
    if (err.code === 'ENOTFOUND' || err.code === 'ENODATA' || err.code === 'NXDOMAIN') {
      return {
        valid: false,
        reason: `El dominio @${domain} no existe o no puede recibir correo electrónico.`,
        domain
      };
    }

    // Network timeout or temporary glitch: allow with warning if syntax is solid
    return {
      valid: true,
      domain,
      warning: 'No se pudo verificar el registro MX en tiempo real, validación sintáctica aprobada.',
    };
  }
}
