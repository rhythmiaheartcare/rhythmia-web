import crypto from 'node:crypto'

const CLICK_AND_DROP = 'https://api.parcel.royalmail.com/api/v1'

function env(name) {
    const value = process.env[name]
    if (!value) throw new Error(`Missing environment variable ${name}`)
    return value
}

// ---- Stripe ---------------------------------------------------------------

// Checks the Stripe-Signature header (https://docs.stripe.com/webhooks#verify-manually).
export function verifyStripeSignature(rawBody, header, secret, toleranceSeconds = 300) {
    if (!header) return false
    const pairs = header.split(',').map((p) => p.trim().split('='))
    const timestamp = pairs.find(([k]) => k === 't')?.[1]
    const signatures = pairs.filter(([k]) => k === 'v1').map(([, v]) => v)
    if (!timestamp || signatures.length === 0) return false
    if (Math.abs(Date.now() / 1000 - Number(timestamp)) > toleranceSeconds) return false

    const expected = crypto.createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex')
    return signatures.some((sig) => {
        const a = Buffer.from(sig, 'hex')
        const b = Buffer.from(expected, 'hex')
        return a.length === b.length && crypto.timingSafeEqual(a, b)
    })
}

export async function stripeGet(path) {
    const res = await fetch(`https://api.stripe.com/v1/${path}`, {
        headers: { Authorization: `Bearer ${env('STRIPE_SECRET_KEY')}` },
    })
    if (!res.ok) throw new Error(`Stripe GET ${path} failed: ${res.status} ${await res.text()}`)
    return res.json()
}

// ---- Click & Drop ---------------------------------------------------------

async function clickAndDrop(path, init = {}) {
    return fetch(`${CLICK_AND_DROP}/${path}`, {
        ...init,
        headers: {
            Authorization: env('ROYALMAIL_API_KEY'),
            'Content-Type': 'application/json',
            ...init.headers,
        },
    })
}

// Returns the existing Click & Drop order with this reference, or null.
export async function findOrderByReference(reference) {
    const res = await clickAndDrop(`orders/"${encodeURIComponent(reference)}"`)
    const body = await res.json().catch(() => null)
    // Click & Drop answers "not found" with a 400 whose errors carry code "3".
    const notFound = Array.isArray(body) && body.some((e) => e.code === '3' && e.channelOrderReference === reference)
    if (res.status === 404 || (res.status === 400 && notFound)) return null
    if (!res.ok) throw new Error(`Click & Drop lookup failed: ${res.status} ${JSON.stringify(body)}`)
    const orders = body
    return orders.find((o) => o.orderReference === reference) || null
}

export async function createOrder(order) {
    const res = await clickAndDrop('orders', { method: 'POST', body: JSON.stringify({ items: [order] }) })
    const body = await res.json().catch(() => null)
    if (!res.ok || !body?.createdOrders?.length) {
        throw new Error(`Click & Drop create failed: ${res.status} ${JSON.stringify(body?.failedOrders?.[0]?.errors ?? body)}`)
    }
    return body.createdOrders[0]
}
