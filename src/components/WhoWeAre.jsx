import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

/** "We're Rhythmia HeartCare" — the About page's opening, with a link to the rest. */
export default function WhoWeAre() {
    return (
        <section className="section" id="who-we-are">
            <div className="container">
                <div className="grid-split">
                    <motion.div
                        variants={reveal}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <p className="eyebrow">Who we are</p>
                        <h2 className="section-heading">We&rsquo;re Rhythmia HeartCare</h2>
                        <div className="prose">
                            <p>
                                Founded by UK cardiologists, we deliver trusted, clinically
                                informed support for the heart&rsquo;s electrical rhythm.
                            </p>
                            <p>
                                More than a capsule, it&rsquo;s a commitment: to empower
                                patients with arrhythmias, to give confidence to those wanting
                                to look after their heart rhythm.
                            </p>
                            <p>
                                Proper heart health is about caring for your heart&rsquo;s
                                natural rhythm.
                            </p>
                        </div>
                        <Link to="/about" className="btn btn-secondary section-link">
                            More about us
                            <ArrowRight size={18} strokeWidth={2} />
                        </Link>
                    </motion.div>

                    {/* PLACEHOLDER: replace with a photograph of the cardiologists behind
                        Rhythmia (Zuhair, Keene, Boon Lim). Drop the file into
                        public/assets/photos/ and swap the src below. */}
                    <motion.div
                        className="media media-zoom"
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <img
                            src="/assets/photos/getty-images-3UDtdrn3qsQ-unsplash.jpg"
                            alt="Cardiologists reviewing heart rhythm data"
                            loading="lazy"
                            decoding="async"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
