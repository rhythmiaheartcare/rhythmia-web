import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * Three headline findings lifted from the evidence page.
 *
 * These are results for the individual ingredients in published trials, not
 * claims about Rhythmia itself. Each card names its trial and cohort, and the
 * full disclaimer sits on the evidence page this section links to.
 */
const FINDINGS = [
    {
        figure: '43%',
        claim: 'reduction in major cardiac events and cardiovascular death with CoQ10 supplementation.',
        source: 'Q-SYMBIO trial (Mortensen et al., 2014) — 420 heart failure patients over 2 years',
    },
    {
        figure: '45%',
        claim: 'reduction in post-surgical atrial fibrillation with magnesium.',
        source: 'Cochrane systematic review of randomised controlled trials',
    },
    {
        figure: '20',
        claim: 'randomised controlled trials of taurine show improved blood pressure, ejection fraction and NYHA class.',
        source: 'Tzang et al. (2024) — meta-analysis',
    },
]

export default function EvidenceStrip() {
    return (
        <section className="section" id="evidence" data-surface="ink">
            <div className="container">
                <motion.div
                    className="evidence-strip-head"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div>
                        <p className="eyebrow">The evidence</p>
                        <h2 className="section-heading">Formulated from published research</h2>
                    </div>
                    <Link to="/evidence" className="btn btn-secondary">
                        Read all the research
                        <ArrowRight size={18} strokeWidth={2} />
                    </Link>
                </motion.div>

                <ul className="finding-grid">
                    {FINDINGS.map(({ figure, claim, source }, i) => (
                        <motion.li
                            key={source}
                            className="finding"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="finding-figure">{figure}</span>
                            <p className="finding-claim">{claim}</p>
                            <p className="finding-source">{source}</p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
