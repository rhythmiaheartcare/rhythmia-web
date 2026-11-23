// Works out which Stripe events mean "a parcel needs to go out", and with what details.
import { buildClickAndDropOrder } from './shipping.js'
import { stripeGet } from './services.js'

// Returns a Click & Drop order for the event, or null when the event needs no parcel.
export async function orderFromStripeEvent(event) {
    const obj = event.data.object

    switch (event.type) {
        // One-off purchases. Card payments are paid at "completed"; slower methods
        // (bank debits) arrive later as "async_payment_succeeded".
        case 'checkout.session.completed':
        case 'checkout.session.async_payment_succeeded':
            if (obj.mode !== 'payment' || obj.payment_status !== 'paid') return null
            return fromCheckoutSession(obj)

        // Subscriptions: the first payment and every monthly renewal.
        case 'invoice.paid':
            if (!['subscription_create', 'subscription_cycle'].includes(obj.billing_reason)) return null
            return fromInvoice(obj)

        default:
            return null
    }
}

async function fromCheckoutSession(session) {
    const shipping = session.collected_information?.shipping_details || session.shipping_details
    const lineItems = await stripeGet(`checkout/sessions/${session.id}/line_items?limit=100`)
    const pots = lineItems.data.reduce((sum, item) => sum + (item.quantity || 0), 0)

    return buildClickAndDropOrder({
        reference: session.payment_intent || session.id,
        created: session.created,
        name: shipping?.name || session.customer_details?.name,
        address: shipping?.address || session.customer_details?.address,
        email: session.customer_details?.email,
        phone: session.customer_details?.phone,
        billingName: session.customer_details?.name,
        billingAddress: session.customer_details?.address,
        pots,
        paidPence: session.amount_total,
        kind: 'One-off',
    })
}

async function fromInvoice(invoice) {
    let shipping = invoice.customer_shipping
    if (!shipping?.address) {
        const customer = await stripeGet(`customers/${invoice.customer}`)
        shipping = customer.shipping
    }
    const pots = invoice.lines.data.reduce((sum, line) => sum + (line.quantity || 0), 0)

    return buildClickAndDropOrder({
        reference: invoice.id,
        created: invoice.status_transitions?.paid_at || invoice.created,
        // Older subscribers never gave a delivery address; use their billing address.
        name: shipping?.name || invoice.customer_name,
        address: shipping?.address || invoice.customer_address,
        email: invoice.customer_email,
        phone: shipping?.phone || invoice.customer_phone,
        billingName: invoice.customer_name,
        billingAddress: invoice.customer_address,
        pots,
        paidPence: invoice.amount_paid,
        kind: invoice.billing_reason === 'subscription_create' ? 'Subscription (first)' : 'Subscription (renewal)',
    })
}
