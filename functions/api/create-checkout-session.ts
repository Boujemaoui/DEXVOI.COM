export interface CloudflareEnv {
  STRIPE_SECRET_KEY?: string;
}

export async function onRequestPost(context: { request: Request; env: CloudflareEnv }): Promise<Response> {
  const { request, env } = context;

  try {
    const body: any = await request.json().catch(() => ({}));
    const { websiteUrl = 'dexvoi.com', customerEmail, planTier = 'pdf_5usd' } = body || {};
    const cleanUrl = String(websiteUrl).replace(/^https?:\/\//i, '').replace(/\/.*$/, '').trim() || 'dexvoi.com';

    const tierConfigs: Record<string, { amount: number; currency: string; name: string; description: string; fallbackUrl: string }> = {
      pdf_5usd: {
        amount: 500, // $5.00 USD
        currency: 'usd',
        name: 'DEXVOI · Informe Técnico Oficial en PDF ($5 USD)',
        description: `Diagnóstico forense y guía de remediación técnica perimetral para ${cleanUrl}`,
        fallbackUrl: 'https://buy.stripe.com/aFa00kaea4fy0nQ6UFdAk00'
      },
      pdf_5eur: {
        amount: 500, // $5.00 USD
        currency: 'usd',
        name: 'DEXVOI · Informe Técnico Oficial en PDF ($5 USD)',
        description: `Diagnóstico forense y guía de remediación técnica perimetral para ${cleanUrl}`,
        fallbackUrl: 'https://buy.stripe.com/aFa00kaea4fy0nQ6UFdAk00'
      },
      basic: {
        amount: 1900, // $19.00 USD
        currency: 'usd',
        name: 'Plan Básico ($19 USD) · Informe Oficial en PDF (5 Páginas)',
        description: `Auditoría Starter y hoja de ruta para ${cleanUrl}`,
        fallbackUrl: 'https://buy.stripe.com/aFa00kaea4fy0nQ6UFdAk00'
      },
      complete: {
        amount: 4900,
        currency: 'usd',
        name: 'Plan Completo ($49 USD) · Auditoría Forense (20+ Páginas)',
        description: `Auditoría Forense exhaustiva, OSINT y scripts Nginx/Apache para ${cleanUrl}`,
        fallbackUrl: 'https://buy.stripe.com/9B66oI862eUc8Um92NdAk01'
      },
      premium: {
        amount: 9900,
        currency: 'usd',
        name: 'Plan Premium VIP ($99 USD) · Consultoría 1-a-1',
        description: `Auditoría Forense + Sesión Estratégica 1-a-1 de 45 min con el Arquitecto Principal`,
        fallbackUrl: 'https://buy.stripe.com/14A5kE0DA7rKgmO4MxdAk02'
      },
    };

    const selectedConfig = tierConfigs[planTier] || tierConfigs.pdf_5usd;

    // Direct Stripe API call via HTTP if STRIPE_SECRET_KEY is present
    const stripeKey = env?.STRIPE_SECRET_KEY;
    if (stripeKey) {
      try {
        const origin = request.headers.get('origin') || 'https://www.dexvoi.com';
        const params = new URLSearchParams();
        params.append('payment_method_types[0]', 'card');
        params.append('mode', 'payment');
        params.append('line_items[0][price_data][currency]', selectedConfig.currency);
        params.append('line_items[0][price_data][unit_amount]', String(selectedConfig.amount));
        params.append('line_items[0][price_data][product_data][name]', selectedConfig.name);
        params.append('line_items[0][price_data][product_data][description]', selectedConfig.description);
        params.append('line_items[0][quantity]', '1');
        params.append('client_reference_id', cleanUrl);
        params.append('metadata[websiteUrl]', cleanUrl);
        params.append('metadata[planTier]', planTier);
        if (customerEmail) {
          params.append('customer_email', customerEmail);
          params.append('metadata[customerEmail]', customerEmail);
        }
        params.append('success_url', `${origin}/?session_id={CHECKOUT_SESSION_ID}&checkout_success=true&tier=${planTier}&target=${encodeURIComponent(cleanUrl)}`);
        params.append('cancel_url', `${origin}/#scanner`);

        const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${stripeKey.trim()}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });

        if (stripeRes.ok) {
          const sessionData: any = await stripeRes.json();
          if (sessionData.url) {
            return new Response(JSON.stringify({ success: true, url: sessionData.url }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        }
      } catch (stripeErr) {
        console.warn('Stripe direct checkout failed in edge worker, falling back to link:', stripeErr);
      }
    }

    // Fallback to configured Stripe Payment Link
    let redirectUrl = selectedConfig.fallbackUrl;
    if (customerEmail) {
      redirectUrl += `?prefilled_email=${encodeURIComponent(customerEmail)}`;
    }

    return new Response(JSON.stringify({ success: true, url: redirectUrl, mode: 'payment_link' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Error al iniciar la sesión de pago.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
