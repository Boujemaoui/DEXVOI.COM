/**
 * DEXVOI · Modo de Pago Stripe Oficial (Producción Conectada)
 * 
 * Sistema de pagos oficial activo (19€ Starter, 49€ Forense, 99€ Premium, 5€ Escáner).
 * Conecta directamente con las sesiones seguras de Stripe Checkout oficial.
 */
export const STRIPE_TEST_MODE_DEFAULT = false;

export function isStripeTestMode(): boolean {
  if (typeof window === 'undefined') return false;
  // Cleanup legacy test key if present so production is immediately active
  if (localStorage.getItem('dexvoi_stripe_test_mode') === 'true') {
    localStorage.removeItem('dexvoi_stripe_test_mode');
  }
  const stored = localStorage.getItem('dexvoi_stripe_test_mode_v2');
  return stored === 'true';
}

export function setStripeTestMode(enabled: boolean): void {
  if (typeof window !== 'undefined') {
    if (!enabled) {
      localStorage.removeItem('dexvoi_stripe_test_mode_v2');
      localStorage.removeItem('dexvoi_stripe_test_mode');
    } else {
      localStorage.setItem('dexvoi_stripe_test_mode_v2', 'true');
    }
    window.dispatchEvent(new Event('dexvoi_test_mode_changed'));
  }
}

