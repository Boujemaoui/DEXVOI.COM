import Stripe from 'stripe';

export interface EventContext<Env, P extends string, Data> {
  request: Request;
  functionPath: string;
  waitUntil: (promise: Promise<any>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Env;
  params: Record<P, string | string[]>;
  data: Data;
}

export interface CloudflareEnv {
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
}

/**
 * Cloudflare Pages Function: POST /api/webhooks/stripe
 * Ejecuta el webhook en el Edge de Cloudflare sin necesidad de servidor Node.js
 */
export async function onRequestPost(context: EventContext<CloudflareEnv, any, any>): Promise<Response> {
  const { request, env } = context;

  // 1. Manejo del cuerpo en bruto (CRÍTICO para Cloudflare / Web Crypto)
  // La primera operación debe ser request.text() sin modificar para verificar la firma de Stripe
  const body = await request.text();

  const signature = request.headers.get('stripe-signature');
  const webhookSecret = env?.STRIPE_WEBHOOK_SECRET || (typeof process !== 'undefined' ? process.env.STRIPE_WEBHOOK_SECRET : undefined);
  const stripeSecretKey = env?.STRIPE_SECRET_KEY || (typeof process !== 'undefined' ? process.env.STRIPE_SECRET_KEY : undefined);

  if (!signature) {
    console.error('❌ [Cloudflare Pages Webhook] Cabecera stripe-signature no encontrada.');
    return new Response(
      JSON.stringify({ error: 'Falta la cabecera stripe-signature.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!webhookSecret) {
    console.error('❌ [Cloudflare Pages Webhook] STRIPE_WEBHOOK_SECRET no configurado en Cloudflare Pages.');
    return new Response(
      JSON.stringify({ error: 'STRIPE_WEBHOOK_SECRET no configurado en Cloudflare Pages.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const stripe = new Stripe(stripeSecretKey || '', {
    apiVersion: '2025-02-24.acacia' as any,
    httpClient: Stripe.createFetchHttpClient(),
  });

  let event: Stripe.Event;

  // 2. Verificación de la firma con constructEventAsync (Obligatorio en Cloudflare con Web Crypto)
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('❌ [Cloudflare Pages Webhook] Error en la verificación de la firma:', err.message);
    return new Response(
      JSON.stringify({ error: `Fallo de verificación de firma: ${err.message}` }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 3. Lógica al recibir checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extraer email del cliente
    const customerEmail = session.customer_details?.email || 'Email no disponible';

    // Extraer ID de la sesión
    const sessionId = session.id;

    // Extraer producto comprado desde los line_items
    let lineItems = (session as any).line_items?.data;

    // Si los line_items no vienen expandidos en el payload directo, recuperarlos usando la API de Stripe
    if (!lineItems && session.id && stripeSecretKey) {
      try {
        const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items'],
        });
        lineItems = expandedSession.line_items?.data;
      } catch (expandError: any) {
        console.warn('⚠️ [Cloudflare Pages Webhook] No se pudieron expandir los line_items vía API:', expandError.message);
      }
    }

    // Identificar el producto / importe (19€, 49€ o 99€)
    const amountTotal = session.amount_total ? `${session.amount_total / 100}€` : 'No especificado';
    const purchasedProduct =
      lineItems?.[0]?.description ||
      lineItems?.[0]?.price?.nickname ||
      (session.amount_total === 1900
        ? 'Informe Básico (19€)'
        : session.amount_total === 4900
        ? 'Informe Completo (49€)'
        : session.amount_total === 9900
        ? 'Auditoría Premium con Consultoría (99€)'
        : `Plan Dexvoi (${amountTotal})`);

    // Registrar en consola de Cloudflare los datos recibidos
    console.log('📦 [Cloudflare Pages Webhook] checkout.session.completed procesado con éxito:');
    console.log('   👤 Email del cliente:', customerEmail);
    console.log('   🆔 ID de la sesión:', sessionId);
    console.log('   🏷️ Producto comprado:', purchasedProduct);
    console.log('   💰 Importe total:', amountTotal);
    console.log('   📋 Detalle line_items:', JSON.stringify(lineItems || []));
  }

  // 4. Respuesta exitosa
  return new Response(
    JSON.stringify({ received: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
