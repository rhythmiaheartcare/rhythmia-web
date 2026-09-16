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
                        <h2 className="section-heading">Every Heartbeat Counts</h2>

                        <div className="prose">
                            <p>
                                Every beat of the heart is powered not just by blood flow, but by an
                                intricate electrical system that keeps the rhythm and life in motion.
                            </p>
                            <p>
                                Yet, for decades, most heart health products have focused only on
                                circulation &ndash; the &ldquo;plumbing&rdquo; of the heart &ndash;
                                leaving the electrical systems, which control rhythm, overlooked.
                            </p>
                        </div>

                        <div className="problem-stat">
                            <span className="problem-stat-figure">10&ndash;20%</span>
                            <span className="problem-stat-label">
                                of adults suffer with palpitations each year
                            </span>
                        </div>

                        <div className="prose">
                            <p>
                                Rhythm disorders are common affecting millions of people. Palpitations,
                                the feeling of flutters or skipped beats, can affect people of all ages.
                            </p>
                            <p>
                                Palpitations and irregular heartbeats disrupt sleep, exercise, and work
                                for a significant number of people who experience them.
                            </p>
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
