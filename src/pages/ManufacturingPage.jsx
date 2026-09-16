import { motion } from 'framer-motion'
import { Factory, ShieldCheck, Leaf } from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'
import {
    ClinicallyIcon,
    VeganIcon,
    GMPIcon,
    UKMapIcon,
    BunnyIcon,
} from '../components/BadgeIcons'
import { usePageMeta } from '../hooks/usePageMeta'

const badges = [
    { label: 'Clinically formulated', sub: 'Developed by experts', icon: <ClinicallyIcon /> },
    { label: '100% vegan', sub: 'Plant-based capsules', icon: <VeganIcon /> },
    { label: 'GMP certified', sub: 'Independently verified', icon: <GMPIcon /> },
    { label: 'Made in UK', sub: 'Kent, England', icon: <UKMapIcon /> },
    { label: 'No Animal Testing', sub: 'Cruelty free', icon: <BunnyIcon /> },
]

const certifications = [
    {
        title: 'GMP Standards',
        ref: null,
        desc: 'Manufactured to Good Manufacturing Practice standards',
    },
    {
        title: 'SALSA Certified',
        ref: '13796',
        desc: 'Independently audited food safety certification for our cleanrooms and warehouse',
    },
    {
        title: 'Food Hygiene Rating 5',
        ref: null,
        desc: 'The highest rating possible, awarded by local authority inspection',
    },
    {
        title: 'BCMPA Member',
        ref: null,
        desc: 'Member of the UK trade association for contract manufacturers and packers',
    },
    {
        title: 'Soil Association Organic Certified',
        ref: 'DA30761',
        desc: 'Facility certified for organic manufacturing from start to finish',
    },
]

/* The three process steps, previously a full-height scrolling timeline with
   hotlinked Unsplash photography. Same substance, one screen, no external
   image dependency. */
const steps = [
    {
        icon: Factory,
        title: 'Expert UK Manufacturing',
        subtitle: 'Over 20 Years of Experience',
        description:
            'Partnering with Arena Health, a leading UK manufacturer with over two decades of expertise in the food supplements industry. Based in Ashford, Kent, our state-of-the-art facilities ensure every batch of Rhythmia Heart Care meets the highest standards of quality and efficacy.',
    },
    {
        icon: ShieldCheck,
        title: 'Rigorous Quality Control',
        subtitle: 'SALSA Certified (13796)',
        description:
            'Cleanrooms and warehousing operate under strict SALSA certification. Every single product undergoes rigorous testing and stringent quality control checks from raw material to finished capsule, ensuring absolute safety and consistent excellence.',
    },
    {
        icon: Leaf,
        title: 'Sustainable & Ethical',
        subtitle: 'Soil Association Organic Certified',
        description:
            'We believe in manufacturing that respects both the body and the planet. Our facilities are certified by the Soil Association (DA30761), proving our manufacturing process from start to finish meets the highest organic and sustainable standards.',
    },
]

const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function ManufacturingPage() {
    usePageMeta({
        title: "How it's made",
        description: 'Manufactured in Ashford, Kent, in a facility independently certified for food safety, hygiene and organic standards. GMP, SALSA, Food Hygiene Rating 5 and Soil Association certified.',
        path: '/how-its-made',
    })
    return (
        <>
            <a className="skip-link" href="#main">Skip to content</a>
            <Navbar />

            <main id="main">
                {/* Hero and the proof badges share one screen, so the certifications
                    are visible without scrolling. */}
                <section className="section made-hero">
                    <div className="container">
                        <motion.div variants={reveal} initial="hidden" animate="show" className="made-hero-copy">
                            <p className="eyebrow">How it&rsquo;s made</p>
                            <h1 className="made-hero-title">Crafted with Precision &amp; Purity</h1>
                            <p className="lead">
                                We have partnered with industry leaders to bring you unparalleled quality.
                            </p>
                        </motion.div>

                        <motion.ul
                            className="badge-row"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {badges.map(({ label, sub, icon }) => (
                                <li key={label}>
                                    <span className="badge-mark">{icon}</span>
                                    <span className="badge-label">{label}</span>
                                    <span className="badge-sub">{sub}</span>
                                </li>
                            ))}
                        </motion.ul>
                    </div>
                </section>

                {/* Certifications */}
                <section className="section" data-surface="sunken">
                    <div className="container">
                        <motion.div
                            variants={reveal}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-80px' }}
                            className="made-section-head"
                        >
                            <p className="eyebrow">Certifications</p>
                            <h2 className="section-heading">Independently Verified Standards</h2>
                        </motion.div>

                        <ul className="cert-grid">
                            {certifications.map(({ title, ref, desc }, i) => (
                                <motion.li
                                    key={title}
                                    className="cert"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <h3 className="cert-title">{title}</h3>
                                    {ref && <span className="cert-ref">{ref}</span>}
                                    <p className="cert-desc">{desc}</p>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Process */}
                <section className="section">
                    <div className="container">
                        <motion.div
                            variants={reveal}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-80px' }}
                            className="made-section-head"
                        >
                            <p className="eyebrow">The process</p>
                            <h2 className="section-heading">From raw material to finished capsule</h2>
                        </motion.div>

                        <ol className="step-grid">
                            {steps.map(({ icon: Icon, title, subtitle, description }, i) => (
                                <motion.li
                                    key={title}
                                    className="step"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <span className="step-index">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="step-icon">
                                        <Icon size={22} strokeWidth={1.75} />
                                    </span>
                                    <h3 className="step-title">{title}</h3>
                                    <p className="step-subtitle">{subtitle}</p>
                                    <p className="step-desc">{description}</p>
                                </motion.li>
                            ))}
                        </ol>
                    </div>
                </section>

                <CtaBand
                    heading="Uncompromising Quality"
                    text="Every capsule of Rhythmia Heart Care is a testament to our commitment to your cardiovascular health. Manufactured in the UK to the highest possible standards."
                />
            </main>

            <Footer />
        </>
    )
}
