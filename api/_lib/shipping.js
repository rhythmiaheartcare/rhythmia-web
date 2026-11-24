// Turns a paid Stripe order into a Click & Drop order.
// Everything the founders might want to change lives in SHIPPING below.

export const SHIPPING = {
    // Royal Mail Tracked 48 (Click & Drop service code for online postage accounts).
    serviceCode: 'TOLP48',
    // Same as the founders' order 1003: small parcel, Royal Mail emails the customer tracking updates.
    packageFormat: 'smallParcel',
    // A small parcel can weigh up to 2kg; anything heavier is sent as a medium parcel.
    smallParcelMaxGrams: 2000,
    firstPotGrams: 200,
    extraPotGrams: 225,
    productName: 'Rhythmia Heart Care',
    // Tracked 48 is UK only. Orders to anywhere else are created without a service,
    // so whoever buys the postage picks one in Click & Drop.
    domesticCountries: ['GB'],
}

export function parcelWeight(pots) {
    return SHIPPING.firstPotGrams + Math.max(0, pots - 1) * SHIPPING.extraPotGrams
}

const pounds = (pence) => Math.round(pence) / 100
const clip = (value, max) => (value ? String(value).trim().slice(0, max) : undefined)

// Stripe address ({ line1, line2, city, state, postal_code, country }) -> Click & Drop address.
function toAddress(name, address) {
    return {
        fullName: clip(name, 210),
        addressLine1: clip(address.line1, 100),
        addressLine2: clip(address.line2, 100),
        city: clip(address.city, 100),
        county: clip(address.state, 100),
        postcode: clip(address.postal_code, 20)?.toUpperCase(),
        countryCode: clip(address.country, 3),
    }
}

/**
 * @param {object} o
 * @param {string} o.reference  Stripe id shown in Click & Drop's "reference" column (max 40 chars)
 * @param {number} o.created    Unix seconds
 * @param {string} o.name
 * @param {object} o.address    Stripe address object
 * @param {string} [o.email]
 * @param {string} [o.phone]
 * @param {string} [o.billingName]     Defaults to the delivery name
 * @param {object} [o.billingAddress]  Defaults to the delivery address
 * @param {number} o.pots       Number of pots in the parcel
 * @param {number} o.paidPence  What the customer paid, in pence
 * @param {string} o.kind       'One-off' | 'Subscription (first)' | 'Subscription (renewal)'
 */
export function buildClickAndDropOrder(o) {
    if (!o.address?.line1 || !o.address?.city || !o.address?.country) {
        throw new Error(`Order ${o.reference} has no usable delivery address`)
    }

    const pots = Math.max(1, o.pots || 1)
    const weight = parcelWeight(pots)
    const domestic = SHIPPING.domesticCountries.includes(o.address.country)
    const paid = pounds(o.paidPence)

    const postageDetails = {
        sendNotificationsTo: 'recipient',
        receiveEmailNotification: Boolean(o.email),
    }
    if (domestic) postageDetails.serviceCode = SHIPPING.serviceCode

    const notes = [o.kind]
    if (!domestic) notes.push('Outside the UK: choose a postage service before buying')

    return {
        orderReference: clip(o.reference, 40),
        orderDate: new Date(o.created * 1000).toISOString(),
        recipient: {
            address: toAddress(o.name, o.address),
            emailAddress: clip(o.email, 254),
            phoneNumber: clip(o.phone, 25),
        },
        // Click & Drop insists on a billing address too.
        billing: {
            address: toAddress(o.billingName || o.name, o.billingAddress?.line1 ? o.billingAddress : o.address),
            emailAddress: clip(o.email, 254),
            phoneNumber: clip(o.phone, 25),
        },
        packages: [
            {
                weightInGrams: weight,
                packageFormatIdentifier: weight > SHIPPING.smallParcelMaxGrams ? 'mediumParcel' : SHIPPING.packageFormat,
                contents: [
                    {
                        name: SHIPPING.productName,
                        quantity: pots,
                        unitValue: pounds(o.paidPence / pots),
                        unitWeightInGrams: Math.round(weight / pots),
                    },
                ],
            },
        ],
        subtotal: paid,
        shippingCostCharged: 0,
        total: paid,
        currencyCode: 'GBP',
        postageDetails,
        specialInstructions: notes.join('. '),
    }
}
