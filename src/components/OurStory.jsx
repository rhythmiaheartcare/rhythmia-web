import React from 'react'
import { motion } from 'framer-motion'

export default function OurStory() {
    return (
        <section className="info-section light-section" id="our-story">
            {/* Decor */}
            <div className="pattern-bg" style={{ backgroundImage: 'url(/assets/pattern/Rhythmia_Care_Pattern_Red.svg)' }}></div>

            <div className="container relative z-10">
                <div className="split-layout">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="split-image-wrapper"
                        style={{ order: 1 }} // Image on right by default, but we want alternating flow? Let's check CSS. 
                    // Actually, let's put image on left for second section for variety?
                    // Previous section: Text Left, Image Right. 
                    // This section: Image Left, Text Right.
                    >
                        <img
                            src="/assets/photos/young-lifestyle-active.png"
                            alt="Our Story Beginnings"
                            className="split-image"
                            loading="lazy"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="split-text"
                    >
                        <h2 className="section-title text-secondary">Our Story</h2>
                        <div className="divider bg-secondary" style={{ width: '100px' }}></div>
                        <p className="section-text text-dark">
                            It began with a single heartbeat, a realized potential to save lives not just through medicine, but through understanding the delicate rhythm of the human heart.
                        </p>
                        <p className="section-text text-dark mt-4">
                            The founders brought together a carefully selected blend of ingredients they often recommend to their patients, with one clear mission: to support everyday heart rhythm health. It’s designed for people living with arrhythmias, as well as anyone who wants to take care of their heart’s electrical balance, providing gentle, daily support you can rely on.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
