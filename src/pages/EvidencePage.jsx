import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ExternalLink, ArrowUpRight } from 'lucide-react'

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
import { ingredients, summaryData, audiences } from '../data/evidence'
import { nutrition } from '../data/product'
import { usePageMeta } from '../hooks/usePageMeta'

const stats = [
    ['6', 'Active ingredients', 'each with a defined role in heart rhythm or muscle function'],
    ['38+', 'Published studies', 'peer-reviewed, in humans, with cardiac outcomes'],
    ['265k+', 'Patients in research', 'across the trials and cohorts cited below'],
]

const badges = [
    { label: 'Clinically formulated', sub: 'Developed by experts', icon: <ClinicallyIcon /> },
    { label: '100% vegan', sub: 'Plant-based capsules', icon: <VeganIcon /> },
    { label: 'GMP certified', sub: 'Independently verified', icon: <GMPIcon /> },
    { label: 'Made in UK', sub: 'Kent, England', icon: <UKMapIcon /> },
    { label: 'No animal testing', sub: 'Cruelty free', icon: <BunnyIcon /> },
]

const EASE = [0.22, 1, 0.36, 1]
const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

function Citation({ finding }) {
    if (!finding.url) return <span className="finding-cite">{finding.source}</span>
    return (
        <a href={finding.url} target="_blank" rel="noopener noreferrer" className="finding-cite">
            {finding.source}
            <span className="finding-chip">
                {finding.chip}
                <ExternalLink size={11} strokeWidth={2.5} />
            </span>
        </a>
    )
}

/**
 * One ingredient as a row: number, name, role and the strongest finding are
 * always visible, so the proof reads without a click; open the row for why
 * it matters, the dose, and every citation.
 */
function IngredientRow({ item, index, defaultOpen }) {
    const [open, setOpen] = useState(defaultOpen)
    const panelId = `research-${item.slug}`
    const headline = item.keyFindings[item.headline.finding]
    const findings = [headline, ...item.keyFindings.filter((_, i) => i !== item.headline.finding)]
    const dose = nutrition.find((row) => row.name === item.doseName)

    return (
        <motion.li
            id={item.slug}
            className={`ev-row ${open ? 'is-open' : ''}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.05, ease: EASE }}
        >
            <button
                className="ev-row-head"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={panelId}
            >
                <span className="ev-row-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="ev-row-text">
                    <span className="ev-row-name">{item.name}</span>
                    <span className="ev-row-role">{item.role}</span>
                </span>
                <span className="ev-row-proof">
                    <span className="ev-row-stat">{item.headline.stat}</span>
                    <span className="ev-row-label">{item.headline.label}</span>
                </span>
                <span className="ev-row-chevron" aria-hidden="true">
                    <ChevronDown size={20} strokeWidth={2} />
                </span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={panelId}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="ev-row-body">
                            <div className="ev-row-why">
                                <h4 className="ev-panel-sub">Why it matters</h4>
                                <p>{item.why}</p>
                                {item.whyBisglycinate && (
                                    <>
                                        <h4 className="ev-panel-sub">Why this form</h4>
                                        <p>{item.whyBisglycinate}</p>
                                    </>
                                )}
                                {dose && (
                                    <Link to="/product#whats-inside" className="ev-dose">
                                        <span className="ev-dose-label">In Rhythmia</span>
                                        <span className="ev-dose-amount">{dose.amount} per serving</span>
                                        <ArrowUpRight size={14} strokeWidth={2} />
                                    </Link>
                                )}
                            </div>

                            <div className="ev-row-findings">
                                <h4 className="ev-panel-sub">Key findings</h4>
                                <ul className="ev-more">
                                    {findings.map((f) => (
                                        <li key={f.finding}>
                                            <p className="finding-text">{f.finding}</p>
                                            <Citation finding={f} />
                                        </li>
                                    ))}
                                </ul>
                                <p className="ev-level">
                                    <span>Evidence level</span> {item.evidenceLevel}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.li>
    )
}

export default function EvidencePage() {
    const { hash } = useLocation()
    usePageMeta({
        title: 'The evidence',
        description: 'The peer-reviewed research behind every ingredient in Rhythmia Heart Care — 38+ published studies on magnesium, CoQ10, taurine, thiamine, zinc and B12 and their role in heart rhythm.',
        path: '/evidence',
    })

    return (
        <>
            <a className="skip-link" href="#main">Skip to content</a>
            <Navbar />

            <main id="main">
                {/* Hero — the proof leads */}
                <section className="section evidence-hero">
                    <div className="container">
                        <motion.div variants={reveal} initial="hidden" animate="show" className="evidence-hero-copy">
                            <p className="eyebrow">The evidence</p>
                            <h1 className="evidence-hero-title">
                                Six ingredients. Thirty-eight studies. One formulation.
                            </h1>
                            <p className="lead">
                                Every ingredient in Rhythmia Heart Care was chosen by cardiologists
                                from published, peer-reviewed research in people &mdash; prioritising
                                randomised trials and meta-analyses with cardiac outcomes.
                            </p>
                        </motion.div>

                        <motion.dl
                            className="evidence-stats"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                        >
                            {stats.map(([num, label, sub]) => (
                                <div key={label}>
                                    <dt>{num}</dt>
                                    <dd>
                                        <strong>{label}</strong>
                                        <span>{sub}</span>
                                    </dd>
                                </div>
                            ))}
                        </motion.dl>
                    </div>
                </section>

                {/* The research */}
                <section className="section ev-research">
                    <div className="container">
                        <motion.div
                            variants={reveal}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-80px' }}
                            className="evidence-head"
                        >
                            <p className="eyebrow">The ingredients</p>
                            <h2 className="section-heading">Every ingredient earns its place</h2>
                            <p className="lead">
                                What each one does in the heart and its strongest published
                                finding. Open any row for the full research and the dose.
                            </p>
                        </motion.div>

                        <ol className="ev-rows">
                            {ingredients.map((item, i) => (
                                <IngredientRow key={item.slug} item={item} index={i} defaultOpen={`#${item.slug}` === hash} />
                            ))}
                        </ol>
                    </div>
                </section>

                {/* At a glance */}
                <section className="section" data-surface="sunken" id="at-a-glance">
                    <div className="container">
                        <motion.div
                            variants={reveal}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-80px' }}
                            className="evidence-head"
                        >
                            <p className="eyebrow">At a glance</p>
                            <h2 className="section-heading">All six, on one page</h2>
                        </motion.div>

                        <div className="ev-summary">
                            {/* Wide tables scroll inside their own container rather than
                                forcing the page to scroll sideways. */}
                            <div className="ev-summary-scroll">
                                <table className="ev-summary-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Ingredient</th>
                                            <th scope="col">Cardiac role</th>
                                            <th scope="col">Headline finding</th>
                                            <th scope="col">Evidence level</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {summaryData.map((row) => (
                                            <tr key={row.ingredient}>
                                                <th scope="row">{row.ingredient}</th>
                                                <td>{row.role}</td>
                                                <td className="ev-summary-highlight">{row.highlight}</td>
                                                <td className="ev-summary-level">{row.evidence}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Who it's for */}
                <section className="section">
                    <div className="container">
                        <motion.div
                            variants={reveal}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-80px' }}
                            className="evidence-head"
                        >
                            <p className="eyebrow">Who Rhythmia is for</p>
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

                        <ul className="badge-row evidence-badges">
                            {badges.map(({ label, sub, icon }) => (
                                <li key={label}>
                                    <span className="badge-mark">{icon}</span>
                                    <span className="badge-label">{label}</span>
                                    <span className="badge-sub">{sub}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <CtaBand
                    heading="Confidence in every beat"
                    text="Built on peer-reviewed research. Formulated by cardiologists. Designed to support your heart at every level."
                    secondaryLabel="See how it's made"
                    secondaryTo="/how-its-made"
                />

                <section className="section-sm evidence-disclaimer-section">
                    <div className="container">
                        <p className="evidence-disclaimer">
                            <strong>Important:</strong> Rhythmia Heart Care is a food supplement. It is
                            not intended to diagnose, treat, cure or prevent any disease. The research
                            cited reflects published peer-reviewed evidence for individual ingredients
                            and their associations with cardiac function.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
