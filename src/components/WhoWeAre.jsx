import React from 'react'
import { motion } from 'framer-motion'

export default function WhoWeAre() {
    return (
        <section className="info-section light-section" id="who-we-are">
            {/* Decor */}
            <div className="pattern-bg" style={{ backgroundImage: 'url(/assets/pattern/Rhythmia_Care_Pattern_Red.svg)' }}></div>

            <div className="container relative z-10">
                <div className="split-layout">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="split-text"
                    >
                        <h2 className="section-title text-secondary">We’re Rhythmia HeartCare</h2>
                        <div className="divider bg-secondary" style={{ width: '100px' }}></div>
                        <p className="section-text text-dark">
                            Founded by UK cardiologists, we deliver trusted, clinically informed support for the heart’s electrical rhythm.
                        </p>
                        <p className="section-text text-dark mt-4">
                            More than a capsule, it’s a commitment: to empower patients with arrhythmias, to give confidence to those wanting to look after their heart rhythm.
                        </p>
                        <p className="section-text text-dark mt-4">
                            Proper heart health is about caring for your heart’s natural rhythm.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="split-image-wrapper"
                            style={{ height: '400px', transform: 'rotate(-2deg)', width: '90%' }}
                        >
                            <img
                                src="/assets/photos/getty-images-3UDtdrn3qsQ-unsplash.jpg"
                                alt="Medical Professionals"
                                className="split-image"
                                loading="lazy"
                            />
                        </motion.div>
                        {/* Secondary Image Overlap */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="split-image-wrapper absolute"
                            style={{
                                height: '250px',
                                width: '60%',
                                bottom: '-40px',
                                right: '-20px',
                                border: '4px solid white',
                                transform: 'rotate(5deg)',
                                zIndex: 2
                            }}
                        >
                            <img
                                src="/assets/photos/young-lab-researcher.png"
                                alt="Lab Research"
                                className="split-image"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
