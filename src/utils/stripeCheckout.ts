/**
 * DEXVOI · Stripe Checkout Navigation Utilities
 * 
 * Ensures seamless, reliable redirection to official Stripe Checkout sessions
 * and payment links across all browsers, pop-up blockers, and iframe environments
 * (such as Google AI Studio preview containers or embedded iframes).
 */

export function createCheckoutPopup(): Window | null {
  if (typeof window === 'undefined') return null;
  try {
    const popup = window.open('about:blank', '_blank', 'noopener,noreferrer');
    if (popup) {
      try {
        popup.document.write(`
          <!DOCTYPE html>
          <html lang="es">
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>DEXVOI · Conectando con Stripe Checkout</title>
              <style>
                body {
                  background-color: #0A0F1F;
                  color: #e5e2e3;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                  margin: 0;
                  padding: 20px;
                  box-sizing: border-box;
                  text-align: center;
                }
                .logo {
                  font-size: 28px;
                  font-weight: 800;
                  letter-spacing: 2px;
                  margin-bottom: 12px;
                  font-family: monospace;
                }
                .logo span { color: #F5A623; }
                .spinner {
                  width: 36px;
                  height: 36px;
                  border: 3px solid rgba(99, 91, 255, 0.2);
                  border-top-color: #635BFF;
                  border-radius: 50%;
                  animation: spin 0.8s linear infinite;
                  margin: 20px auto;
                }
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
                .text {
                  font-size: 14px;
                  color: #94a3b8;
                  max-width: 400px;
                  line-height: 1.5;
                }
              </style>
            </head>
            <body>
              <div class="logo">DEX<span>VOI</span></div>
              <div class="spinner"></div>
              <div class="text">Conectando de forma segura con la pasarela oficial de Stripe Checkout...</div>
            </body>
          </html>
        `);
      } catch {
        // Continue if document.write fails
      }
    }
    return popup;
  } catch {
    return null;
  }
}

export function navigateToStripeUrl(url: string, popup?: Window | null): void {
  if (!url || typeof window === 'undefined') return;

  // 1. If pre-opened popup is available, navigate it directly
  if (popup && !popup.closed) {
    try {
      popup.location.href = url;
      return;
    } catch {
      // Ignore cross-origin error and fallback
    }
  }

  // 2. Check if running inside an iframe (like AI Studio preview or third-party embed)
  const isIframe = window.self !== window.top;

  if (isIframe) {
    // In an iframe, navigating self via window.location.href will fail because Stripe
    // sets X-Frame-Options: DENY and frame-ancestors: 'none'.
    // We MUST open in a new tab:
    try {
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (opened) return;
    } catch {
      // Handled below
    }

    // Try navigating top window if permitted
    try {
      if (window.top) {
        window.top.location.href = url;
        return;
      }
    } catch {
      // Cross-origin top access blocked
    }

    // Fallback: programmatically click a clean target="_blank" anchor
    try {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    } catch {
      // As last resort, navigate current frame
      window.location.href = url;
    }
    return;
  }

  // 3. Normal top-level window
  window.location.href = url;
}
