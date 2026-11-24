import { ShieldCheck, Truck, RefreshCw } from 'lucide-react'

/**
 * Purchase reassurance, directly below the hero.
 *
 * Distinct from the hero's trust strip, which states credentials. This states
 * what happens after you buy — the point at which hesitation actually bites.
 *
 * NOTE: the 30-day guarantee is advertised here and on the product page, but
 * the site still has no returns/refunds policy page setting out its terms.
 * That page needs writing.
 */
const ITEMS = [
    {
        icon: ShieldCheck,
        title: '30-day money-back guarantee',
        detail: 'Not for you? Return it within 30 days for a full refund.',
    },
    {
        icon: Truck,
        title: 'Free UK delivery',
        detail: 'On every order, with no minimum spend.',
    },
    {
        icon: RefreshCw,
        title: 'Subscribe and save 10%',
        detail: 'Skip or cancel at any time, with no hidden fees.',
    },
]

export default function Reassurance() {
    return (
        <section className="reassurance" aria-label="Buying with confidence">
            <ul className="container reassurance-list">
                {ITEMS.map(({ icon: Icon, title, detail }) => (
                    <li key={title}>
                        <span className="reassurance-icon">
                            <Icon size={20} strokeWidth={1.75} />
                        </span>
                        <div>
                            <h2 className="reassurance-title">{title}</h2>
                            <p className="reassurance-detail">{detail}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
