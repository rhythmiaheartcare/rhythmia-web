import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ExternalLink } from 'lucide-react'

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
import { usePageMeta } from '../hooks/usePageMeta'

const stats = [
    ['6', 'Active Ingredients'],
    ['38+', 'Published Studies'],
    ['265k+', 'Patients in Research'],
]

const badges = [
    { label: 'Clinically Formulated', sub: 'Developed by experts', icon: <ClinicallyIcon /> },
    { label: '100% Vegan', sub: 'Plant-based capsules', icon: <VeganIcon /> },
    { label: 'GMP Certified', sub: 'Independently verified', icon: <GMPIcon /> },
    { label: 'Made in UK', sub: 'British manufacturing', icon: <UKMapIcon /> },
    { label: 'No Animal Testing', sub: 'Cruelty free', icon: <BunnyIcon /> },
]

const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

/** One ingredient, collapsed to its headline until opened. */
function Ingredient({ item, index }) {
    const [open, setOpen] = useState(false)
    const panelId = `ingredient-panel-${index}`

    return (
        <motion.li
            className={`ingredient ${open ? 'is-open' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
            <button
                className="ingredient-head"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={panelId}
            >
                <span className="ingredient-icon">{item.icon}</span>
                <span className="ingredient-headings">
                    <span className="ingredient-role">{item.role}</span>
                    <span className="ingredient-name">{item.name}</span>
                    <span className="ingredient-tagline">{item.tagline}</span>
                </span>
                <span className="ingredient-chevron" aria-hidden="true">
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
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="ingredient-body">
                            <div className="ingredient-why">
                                <h4>Why it matters for your heart</h4>
                                <p>{item.why}</p>
                                {item.whyBisglycinate && (
                                    <>
                                        <h4>Why Bisglycinate?</h4>
                                        <p>{item.whyBisglycinate}</p>
                                    </>
                                )}
                            </div>

                            <div className="ingredient-findings">
                                <h4>Key Research Findings</h4>
                                <ul>
                                    {item.keyFindings.map((f) => (
                                        <li key={f.finding}>
                                            <p className="finding-text">{f.finding}</p>
                                            {f.url ? (
                                                <a
                                                    href={f.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="finding-cite"
                                                >
                                                    {f.source}
                                                    <span className="finding-chip">
                                                        {f.chip}
                                                        <ExternalLink size={11} strokeWidth={2.5} />
                                                    </span>
                                                </a>
                                            ) : (
                                                <span className="finding-cite">{f.source}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <p className="ingredient-level">
                                    <span>Evidence Level:</span> {item.evidenceLevel}
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
    const [showTable, setShowTable] = useState(false)
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
                {/* Hero */}
                <section className="section evidence-hero">
                    <div className="container">
                        <motion.div variants={reveal} initial="hidden" animate="show" className="evidence-hero-copy">
                            <p className="eyebrow">The evidence</p>
                            <h1 className="evidence-hero-title">Understanding Your Heart Supplement</h1>
                            <p className="lead">
                                The science behind every ingredient in Rhythmia Heart Care &mdash;
                                developed by expert cardiologists to support your heart&rsquo;s
                                electrical rhythm and muscle function.
                            </p>
                        </motion.div>

                        <motion.dl
                            className="evidence-stats"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {stats.map(([num, label]) => (
                                <div key={label}>
                                    <dt>{num}</dt>
                                    <dd>{label}</dd>
                                </div>
                            ))}
                        </motion.dl>
                    </div>
                </section>

                {/* Ingredients */}
                <section className="section" data-surface="sunken">
                    <div className="container">
                        <motion.div
                            variants={reveal}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-80px' }}
                            className="evidence-head"
                        >
                            <p className="eyebrow">The Ingredients</p>
                            <h2 className="section-heading">Evidence Behind Every Ingredient</h2>
                            <p className="lead">
                                Tap any ingredient to explore the peer-reviewed research supporting
                                its inclusion.
                            </p>
                        </motion.div>

                        <ul className="ingredient-list">
                            {ingredients.map((item, i) => (
                                <Ingredient key={item.name} item={item} index={i} />
                            ))}
                        </ul>

                        {/* Summary table */}
                        <div className="summary">
                            <button
                                className="summary-toggle"
                                onClick={() => setShowTable((v) => !v)}
                                aria-expanded={showTable}
                                aria-controls="summary-table"
                            >
                                <span>
                                    <span className="summary-toggle-title">At-a-Glance Summary Table</span>
                                    <span className="summary-toggle-sub">
                                        All six ingredients, their roles, and top-line findings
                                    </span>
                                </span>
                                <span className={`ingredient-chevron ${showTable ? 'is-open' : ''}`} aria-hidden="true">
                                    <ChevronDown size={20} strokeWidth={2} />
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {showTable && (
                                    <motion.div
                                        id="summary-table"
                                        key="table"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        {/* Wide tables scroll inside their own container rather than
                                            forcing the page to scroll sideways. */}
                                        <div className="summary-scroll">
                                            <table className="summary-table">
                                                <thead>
                                                    <tr>
                                                        <th>Ingredient</th>
                                                        <th>Cardiac Role</th>
                                                        <th>Key Headline Finding</th>
                                                        <th>Evidence Level</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {summaryData.map((row) => (
                                                        <tr key={row.ingredient}>
                                                            <td className="summary-name">{row.ingredient}</td>
                                                            <td>{row.role}</td>
                                                            <td className="summary-highlight">{row.highlight}</td>
                                                            <td className="summary-level">{row.evidence}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
                            <p className="eyebrow">Who Is Rhythmia For?</p>
                            <h2 className="section-heading">Designed for Patients. Suitable for Everyone.</h2>
                        </motion.div>

                        <ul className="audience-grid">
                            {audiences.map(({ title, desc }, i) => (
                                <motion.li
                                    key={title}
                                    className="audience"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
                    heading="Confidence in Every Beat"
                    text="Built on peer-reviewed research. Formulated by cardiologists. Designed to support your heart at every level."
                    secondaryLabel="See how it's made"
                    secondaryTo="/how-its-made"
                />

                <section className="section-sm evidence-disclaimer-section">
                    <div className="container">
                        <p className="evidence-disclaimer">
                            <strong>Important:</strong> Rhythmia Heart Care is a food supplement. It is
                            not intended to diagnose, treat, cure, or prevent any disease. The research
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
