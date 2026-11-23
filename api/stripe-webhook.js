// Stripe calls this address after every payment. Each paid order (one-off or
// subscription, including monthly renewals) becomes an order in Royal Mail
// Click & Drop, ready for someone to buy the postage and get the QR code.
//
// Needs these environment variables in Vercel:
//   STRIPE_WEBHOOK_SECRET  signing secret of the Stripe webhook (whsec_...)
//   STRIPE_SECRET_KEY      read-only restricted key (rk_live_...)
//   ROYALMAIL_API_KEY      Click & Drop API key
import { orderFromStripeEvent } from './_lib/orders.js'
import { createOrder, findOrderByReference, verifyStripeSignature } from './_lib/services.js'

export async function POST(request) {
    const rawBody = await request.text()
    const secret = process.env.STRIPE_WEBHOOK_SECRET
    if (!secret || !verifyStripeSignature(rawBody, request.headers.get('stripe-signature'), secret)) {
        return new Response('Invalid signature', { status: 400 })
    }

    const event = JSON.parse(rawBody)
    try {
        const order = await orderFromStripeEvent(event)
        if (!order) return Response.json({ ignored: event.type })

        // Stripe sometimes sends the same event twice; never create a second parcel.
        const existing = await findOrderByReference(order.orderReference)
        if (existing) {
            console.log(`Already in Click & Drop: ${order.orderReference} -> order ${existing.orderIdentifier}`)
            return Response.json({ alreadyCreated: existing.orderIdentifier })
        }

        const created = await createOrder(order)
        console.log(`Created Click & Drop order ${created.orderIdentifier} for ${order.orderReference}`)
        return Response.json({ created: created.orderIdentifier })
    } catch (error) {
        // A 500 makes Stripe retry for up to 3 days, and Stripe emails the account
        // owner if it keeps failing, so a parcel is never silently lost.
        console.error(`Failed on ${event.type} ${event.data?.object?.id}:`, error)
        return new Response('Could not create the Click & Drop order', { status: 500 })
    }
}
