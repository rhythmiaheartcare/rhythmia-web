import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/** The evidence page's three figures, as on the evidence page. */
const STATS = [
    ['6', 'Active Ingredients'],
    ['38+', 'Published Studies'],
    ['265k+', 'Patients in Research'],
]

/** The evidence, in brief: the page's introduction and its three figures. */
export default function EvidenceStrip() {
    return (
        <section className="section" id="evidence" data-surface="ink">
            <div className="container">
                <motion.div
                    className="strip-head"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div>
                        <p className="eyebrow">The evidence</p>
                        <h2 className="section-heading">Evidence Behind Every Ingredient</h2>
                        <p className="lead">
                            The science behind every ingredient in Rhythmia Heart Care &mdash;
                            developed by expert cardiologists to support your heart&rsquo;s
                            electrical rhythm and muscle function.
                        </p>
                    </div>
                    <Link to="/evidence" className="btn btn-secondary">
                        See the evidence
                        <ArrowRight size={18} strokeWidth={2} />
                    </Link>
                </motion.div>

                <motion.dl
                    className="evidence-stats"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    {STATS.map(([num, label]) => (
                        <div key={label}>
                            <dt>{num}</dt>
                            <dd>{label}</dd>
                        </div>
                    ))}
                </motion.dl>
            </div>
        </section>
    )
}
