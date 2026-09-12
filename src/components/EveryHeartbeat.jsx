import { motion } from 'framer-motion'

import RhythmLine from './RhythmLine'

const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function EveryHeartbeat() {
    return (
        <section className="section" id="every-heartbeat" data-surface="sunken">
            <div className="container">
                <div className="problem-grid">
                    <motion.div
                        variants={reveal}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <p className="eyebrow">Why rhythm matters</p>
                        <h2 className="section-heading">Every heartbeat is an electrical event</h2>

                        <div className="prose">
                            <p>
                                For decades, heart health products have focused on circulation — the
                                &ldquo;plumbing&rdquo;. The electrical system that actually sets your
                                rhythm has been left overlooked.
                            </p>
                        </div>

                        <div className="problem-stat">
                            <span className="problem-stat-figure">10&ndash;20%</span>
                            <span className="problem-stat-label">
                                of adults experience palpitations each year
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="problem-visual"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <RhythmLine className="problem-rhythm" beats={3} />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
