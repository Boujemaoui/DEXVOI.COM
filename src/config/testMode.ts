/**
 * DEXVOI · Modo de Demostración y Prueba de Planes (Stripe Simulation Mode)
 * 
 * Permite probar todos los planes (5€, 19€, 49€, 99€) y descargar los informes PDF oficiales
 * sin necesidad de realizar pagos reales en Stripe y sin alterar las claves o enlaces de producción.
 * 
 * Para activar/desactivar:
 * Cambiar STRIPE_TEST_MODE_DEFAULT a false (o usar el interruptor en pantalla).
 */
export const STRIPE_TEST_MODE_DEFAULT = true;

export function isStripeTestMode(): boolean {
  if (typeof window === 'undefined') return STRIPE_TEST_MODE_DEFAULT;
  const stored = localStorage.getItem('dexvoi_stripe_test_mode');
  if (stored !== null) {
    return stored === 'true';
  }
  return STRIPE_TEST_MODE_DEFAULT;
}

export function setStripeTestMode(enabled: boolean): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('dexvoi_stripe_test_mode', String(enabled));
    window.dispatchEvent(new Event('dexvoi_test_mode_changed'));
  }
}
