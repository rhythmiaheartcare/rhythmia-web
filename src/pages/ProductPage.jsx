import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ShieldCheck, Truck, RefreshCw, ChevronDown, Star, ArrowRight } from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EvidenceStrip from '../components/EvidenceStrip'
import ProductReviews from '../components/ProductReviews'
import Portrait from '../components/Portrait'
import ProductGallery from '../components/ProductGallery'
import { reviewService } from '../services/reviewService'
import { usePageMeta, useJsonLd } from '../hooks/usePageMeta'
import { audiences } from '../data/evidence'
import { founders } from '../data/people'
import {
    product, pricing, delivery, guarantee, nutrition, directions, storage,
    benefits, faq,
} from '../data/product'

const EASE = [0.22, 1, 0.36, 1]
const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

/* All four are 4:5 — a half-viewport at 1440x900 is 4:5 exactly, so the hero photo
   fills its half with essentially no crop. */
const gallery = [
    { src: '/assets/photos/product-hero.jpg', alt: 'Rhythmia Heart Care jar, 60 capsules', label: 'The jar' },
    { src: '/assets/photos/product-capsules.jpg', alt: 'Amber capsules beside the open jar', label: 'Capsules' },
    { src: '/assets/photos/product-overhead.jpg', alt: 'The open jar seen from above', label: 'Inside' },
    { src: '/assets/photos/product-morning.jpg', alt: 'The jar beside a glass of water in morning light', label: 'Daily' },
]

const money = (n) => `£${n.toFixed(2)}`

function FaqItem({ item, index }) {
    const [open, setOpen] = useState(false)
    const id = `faq-${index}`
    return (
        <li className={`faq ${open ? 'is-open' : ''}`}>
            <button className="faq-q" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls={id}>
                <span>{item.q}</span>
                <span className="faq-chevron" aria-hidden="true"><ChevronDown size={18} strokeWidth={2} /></span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={id}
                        key="a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p className="faq-a">{item.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    )
}

export default function ProductPage() {
    const [purchaseType, setPurchaseType] = useState('onetime')
    const [reviews, setReviews] = useState([])
    const [reviewsLoading, setReviewsLoading] = useState(true)
    const [stickyVisible, setStickyVisible] = useState(false)
    const buyRef = useRef(null)

    useEffect(() => {
        let cancelled = false
        reviewService.getApprovedReviews().then((data) => {
            if (cancelled) return
            if (data?.length) setReviews(data)
            setReviewsLoading(false)
        })
        return () => { cancelled = true }
    }, [])

    // Sticky buy bar: shown once the main button has scrolled up out of view.
    // A scroll listener rather than IntersectionObserver — one rect read per
    // scroll event is cheap, and it behaves the same everywhere.
    useEffect(() => {
        const update = () => {
            const el = buyRef.current
            if (!el) return
            setStickyVisible(el.getBoundingClientRect().bottom < 0)
        }
        update()
        window.addEventListener('scroll', update, { passive: true })
        window.addEventListener('resize', update)
        return () => {
            window.removeEventListener('scroll', update)
            window.removeEventListener('resize', update)
        }
    }, [])

    const avg = reviews.length
        ? Math.round((reviews.reduce((a, r) => a + r.rating, 0) / reviews.length) * 10) / 10
        : null

    const plan = pricing[purchaseType]

    usePageMeta({
        title: `${product.name} — ${product.tagline}`,
        description: `${product.description} ${product.capsules} capsules, ${product.perDay} a day. ${money(pricing.onetime.price)}, or subscribe for ${money(pricing.subscription.price)}/month. ${delivery.headline}.`,
        path: '/product',
        image: product.image,
    })

    const schema = useMemo(() => {
        const data = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: [product.image],
            sku: product.sku,
            gtin13: product.gtin,
            brand: { '@type': 'Brand', name: product.name },
            offers: {
                '@type': 'Offer',
                url: product.url,
                priceCurrency: pricing.currency,
                price: pricing.onetime.price.toFixed(2),
                availability: 'https://schema.org/InStock',
                itemCondition: 'https://schema.org/NewCondition',
                shippingDetails: {
                    '@type': 'OfferShippingDetails',
                    shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: pricing.currency },
                    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'GB' },
                },
            },
        }
        if (avg && reviews.length) {
            data.aggregateRating = {
                '@type': 'AggregateRating',
                ratingValue: avg,
                reviewCount: reviews.length,
                bestRating: 5,
                worstRating: 1,
            }
        }
        return data
    }, [avg, reviews.length])
    useJsonLd(schema)

    const handleCheckout = () => {
        const link = purchaseType === 'subscription'
            ? import.meta.env.VITE_STRIPE_LINK_SUBSCRIPTION
            : import.meta.env.VITE_STRIPE_LINK_ONETIME
        if (!link) {
            console.error('Stripe link not configured for', purchaseType)
            alert('Checkout link not configured yet. Please check environment variables.')
            return
        }
        // Same tab. Checkout in a new window loses the visitor's context, and
        // the Success and Cancel pages exist for the return trip.
        window.location.assign(link)
    }

    const founder = founders[0]

    return (
        <>
            <a className="skip-link" href="#main">Skip to content</a>
            <Navbar />

            <main id="main">
                {/* =============================== Hero =========================== */}
                {/* Split screen, one viewport tall: the photograph edge-to-edge on the
                    left, everything needed to buy on the right. Thumbnails sit on the
                    photo so the hero stays clean. */}
                <section className="pdp-hero">
                    <ProductGallery images={gallery} />

                    <div className="pdp-hero-panel">
                        <div className="pdp-details">
                            <h1 className="pdp-title">{product.name}</h1>
                            <p className="pdp-subtitle">{product.tagline}</p>

                            {avg && (
                                <a href="#reviews" className="pdp-rating">
                                    <span className="stars" aria-hidden="true">
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <Star key={n} size={15} strokeWidth={1.5} className={avg >= n - 0.25 ? 'star is-filled' : 'star'} />
                                        ))}
                                    </span>
                                    <span>{avg.toFixed(1)} · {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
                                </a>
                            )}

                            <p className="pdp-price">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={purchaseType}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {money(plan.price)} <span className="pdp-price-unit">{plan.unit}</span>
                                    </motion.span>
                                </AnimatePresence>
                            </p>

                            <p className="pdp-desc">
                                {product.description} {product.capsules} capsules — {product.perDay} a day.
                            </p>

                            <fieldset className="pdp-options">
                                <legend className="visually-hidden">Purchase options</legend>
                                <label className={`pdp-option ${purchaseType === 'onetime' ? 'is-active' : ''}`}>
                                    <input type="radio" name="purchase" value="onetime" checked={purchaseType === 'onetime'} onChange={() => setPurchaseType('onetime')} />
                                    <span className="pdp-option-name">{pricing.onetime.label}</span>
                                    <span className="pdp-option-price">{money(pricing.onetime.price)}</span>
                                </label>
                                <label className={`pdp-option ${purchaseType === 'subscription' ? 'is-active' : ''}`}>
                                    <input type="radio" name="purchase" value="subscription" checked={purchaseType === 'subscription'} onChange={() => setPurchaseType('subscription')} />
                                    <span className="pdp-option-name">{pricing.subscription.label}</span>
                                    <span className="pdp-option-price">{money(pricing.subscription.price)}</span>
                                    <span className="pdp-option-save">{pricing.subscription.saving}</span>
                                </label>
                            </fieldset>

                            <button ref={buyRef} onClick={handleCheckout} className="btn btn-primary btn-lg btn-block pdp-buy">
                                {purchaseType === 'subscription' ? 'Subscribe now' : 'Buy now'}
                                <span className="pdp-buy-sub">Secure checkout</span>
                            </button>

                            <ul className="pdp-trust">
                                <li><ShieldCheck size={15} strokeWidth={1.75} />{guarantee.headline}</li>
                                <li><Truck size={15} strokeWidth={1.75} />{delivery.headline}</li>
                                <li><RefreshCw size={15} strokeWidth={1.75} />Skip or cancel any time</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ============================ What's inside ===================== */}
                <section className="section" id="whats-inside" data-surface="sunken">
                    <div className="container">
                        <motion.div className="pdp-head" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
                            <p className="eyebrow">What&rsquo;s inside</p>
                            <h2 className="section-heading">Every ingredient, and how much</h2>
                        </motion.div>

                        <ul className="pdp-benefits">
                            {benefits.map(({ key, desc }) => (
                                <li key={key}>
                                    <span className="pdp-check"><Check size={14} strokeWidth={3} /></span>
                                    <span><strong>{key}</strong><span>{desc}</span></span>
                                </li>
                            ))}
                        </ul>

                        <div className="nutrition-grid">
                            <div className="nutrition-panel">
                                <table className="nutrition">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nutrient</th>
                                            <th scope="col" className="num">
                                                Per serving
                                                <span className="nutrition-form">{product.perDay} capsules</span>
                                            </th>
                                            <th scope="col" className="num">% NRV*</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nutrition.map((row) => (
                                            <tr key={row.name}>
                                                <th scope="row">
                                                    {row.name}
                                                    {row.form && <span className="nutrition-form">{row.form}</span>}
                                                </th>
                                                <td className="num">{row.amount}</td>
                                                <td className="num muted">{row.nrv}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="nutrition-note">*NRV = Nutrient Reference Value. &mdash; indicates no NRV has been established.</p>
                            </div>

                            <div className="nutrition-side">
                                <div>
                                    <h3 className="nutrition-side-title">Directions</h3>
                                    <p>{directions}</p>
                                </div>
                                <div>
                                    <h3 className="nutrition-side-title">Storage</h3>
                                    <p>{storage}</p>
                                </div>
                                <Link to="/evidence" className="nutrition-link">
                                    Read the research behind each ingredient
                                    <ArrowRight size={16} strokeWidth={2} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================ Research =========================== */}
                <EvidenceStrip />

                {/* ============================ Who it's for ======================= */}
                <section className="section">
                    <div className="container">
                        <motion.div className="pdp-head" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
                            <p className="eyebrow">Who it&rsquo;s for</p>
                            <h2 className="section-heading">Designed for patients, suitable for everyone</h2>
                        </motion.div>
                        <ul className="audience-grid">
                            {audiences.map(({ title, desc }, i) => (
                                <motion.li
                                    key={title}
                                    className="audience"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                                >
                                    <h3 className="audience-title">{title}</h3>
                                    <p className="audience-desc">{desc}</p>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ============================ FAQ ================================ */}
                <section className="section" id="faq" data-surface="sunken">
                    <div className="container faq-grid">
                        <motion.div className="pdp-head" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
                            <p className="eyebrow">Questions</p>
                            <h2 className="section-heading">Before you order</h2>
                            <p className="lead">
                                If you are being treated for a heart condition, speak to your doctor before
                                starting any supplement.
                            </p>
                        </motion.div>
                        <ul className="faq-list">
                            {faq.map((item, i) => <FaqItem key={item.q} item={item} index={i} />)}
                        </ul>
                    </div>
                </section>

                {/* ============================ Reviews ============================ */}
                <section className="section" id="reviews">
                    <div className="container">
                        <motion.div className="pdp-head" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
                            <p className="eyebrow">Reviews</p>
                            <h2 className="section-heading">From people taking it</h2>
                        </motion.div>
                        <ProductReviews reviews={reviews} loading={reviewsLoading} />
                    </div>
                </section>

                {/* ============================ Founder ============================ */}
                <section className="section-sm" data-surface="sunken">
                    <div className="container">
                        <motion.div className="founder-card" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
                            <Portrait person={founder} className="founder-portrait" />
                            <div>
                                <p className="eyebrow">Created by cardiologists</p>
                                <h2 className="founder-title">Formulated by the doctors who treat rhythm disorders</h2>
                                <p className="founder-text">
                                    {founder.name}, {founder.title.toLowerCase()}, is a cardiologist specialising in
                                    electrophysiology at Imperial College London. Rhythmia brings together the
                                    ingredients he and his co-founders recommend to their own patients.
                                </p>
                                <Link to="/about" className="btn btn-secondary">
                                    Meet the team
                                    <ArrowRight size={18} strokeWidth={2} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* Sticky buy bar — phones, once the main button has scrolled away. */}
            <AnimatePresence>
                {stickyVisible && (
                    <motion.div
                        className="pdp-sticky"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.28, ease: EASE }}
                    >
                        <div className="container pdp-sticky-inner">
                            <div className="pdp-sticky-price">
                                <strong>{money(plan.price)}</strong>
                                <span>{plan.unit}</span>
                            </div>
                            <button onClick={handleCheckout} className="btn btn-primary">
                                {purchaseType === 'subscription' ? 'Subscribe' : 'Buy now'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </>
    )
}
