/* =============================================================================
   Product — Rhythmia Heart Care
   -----------------------------------------------------------------------------
   Everything the product page says about the product, in one place.

   Anything wrapped in [square brackets] is a PLACEHOLDER awaiting confirmation
   from the Rhythmia team. Search this file for "[" to find them all.
   ========================================================================== */

export const product = {
    name: 'Rhythmia Heart Care',
    tagline: 'Daily support for the electrical rhythm of your heart',
    description:
        'An all-in-one supplement created specifically to support the electrical function of the heart. Clinically formulated with natural, vegan ingredients.',
    capsules: 60,
    perDay: 2,
    /* Used in the Product schema and the meta description. */
    url: 'https://www.rhythmiaheartcare.com/product',
    image: 'https://www.rhythmiaheartcare.com/assets/photos/jar_image.png',
    sku: 'RHC-60',
    gtin: '5070004181802',
}

export const pricing = {
    currency: 'GBP',
    onetime: { price: 24.99, label: 'One-time', unit: '/ bottle' },
    subscription: {
        price: 22.49,
        label: 'Subscribe',
        unit: '/ month',
        saving: 'Save 10%',
    },
}

/* Cadence and dispatch times are covered in the FAQ, not the buy panel. */
export const delivery = {
    headline: 'Free UK delivery',
}

export const guarantee = {
    headline: '30-day money-back guarantee',
    detail: 'Not for you? Return it within 30 days for a full refund.',
}

/* Nutritional information per serving (2 capsules), as printed on the label.
   NRV = Nutrient Reference Value. Taurine and CoQ10 have no NRV, and their
   per-serving amounts are not on the label's table — PLACEHOLDERS below. */
export const nutrition = [
    { name: 'Magnesium', form: 'as bisglycinate chelate', amount: '225 mg', nrv: '60%' },
    { name: 'L-Taurine', form: null, amount: '[amount] mg', nrv: '—' },
    { name: 'Coenzyme Q10', form: 'ubiquinone', amount: '[amount] mg', nrv: '—' },
    { name: 'Vitamin B1', form: 'thiamine', amount: '50 mg', nrv: '4546%' },
    { name: 'Vitamin B6', form: 'pyridoxine', amount: '30 mg', nrv: '2143%' },
    { name: 'Vitamin B12', form: 'methylcobalamin', amount: '250 µg', nrv: '10000%' },
    { name: 'Zinc', form: 'as picolinate', amount: '15 mg', nrv: '150%' },
]

export const directions = 'Take 2 capsules daily with water. Do not exceed the recommended daily dose.'

export const storage = 'Keep in a cool, dry place below 25 °C, away from direct sunlight and moisture.'

/* The four headline benefits shown beside the price. */
export const benefits = [
    { key: 'Magnesium Bisglycinate', desc: 'Regulates electrical signalling' },
    { key: 'L-Taurine', desc: 'Supports cardiac membrane stability' },
    { key: 'Coenzyme Q10', desc: 'Promotes mitochondrial function' },
    { key: 'Vitamin B Complex + Zinc', desc: 'Metabolic & neurological support' },
]

/* FAQ. Answers marked as placeholders need the clinical team's wording. */
export const faq = [
    {
        q: 'Can I take Rhythmia alongside my heart medication?',
        a: '[PLACEHOLDER — clinical team to confirm wording. Suggested shape: Rhythmia is a food supplement and is designed to be taken alongside conventional treatment, but anyone taking prescribed medication — particularly anticoagulants, beta-blockers or diuretics — should speak to their doctor or pharmacist before starting.]',
    },
    {
        q: 'How long before I notice a difference?',
        a: '[PLACEHOLDER — clinical team to confirm. Suggested shape: nutrient levels build gradually; most people take it consistently for several weeks before judging the effect.]',
    },
    {
        q: 'When and how should I take it?',
        a: 'Take two capsules daily with water. Many people find it easiest to take them with breakfast so it becomes part of the morning routine.',
    },
    {
        q: 'Is it suitable for vegans?',
        a: 'Yes. The capsule shell is plant-based (hydroxypropylmethylcellulose) and the formulation contains no animal-derived ingredients.',
    },
    {
        q: 'How does the subscription work?',
        a: '[PLACEHOLDER — confirm cadence. Suggested shape: a fresh bottle is delivered every 30 days at 10% off the one-time price. You can skip a delivery or cancel at any time, with no hidden fees.]',
    },
    {
        q: 'How quickly will it arrive?',
        a: '[PLACEHOLDER — confirm dispatch and delivery times. UK delivery is free on every order.]',
    },
    {
        q: 'What if it isn’t for me?',
        a: 'Every order is covered by our 30-day money-back guarantee. If Rhythmia isn’t right for you, return it within 30 days for a full refund.',
    },
]
