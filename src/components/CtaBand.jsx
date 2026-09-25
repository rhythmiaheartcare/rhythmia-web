import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * Closing call to action for the sub-pages.
 *
 * Deliberately a centred panel inset within the page rather than a full-bleed
 * dark band: sitting directly above the ink footer, a full-width dark section
 * read as footer chrome rather than as content.
 *
 * The secondary link is configurable because it has to point somewhere the
 * visitor is not already. As a backstop, a link matching the current path is
 * dropped rather than rendered dead.
 */
export default function CtaBand({
    heading = 'Confidence in every beat',
    text = 'Daily support for your heart’s electrical rhythm, formulated from published research.',
    secondaryLabel = 'See the evidence',
    secondaryTo = '/evidence',
}) {
    const { pathname } = useLocation()
    const showSecondary = secondaryTo !== pathname

    return (
        <section className="section cta-band-section">
            <div className="container">
                <motion.div
                    className="cta-band"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="cta-band-pattern" aria-hidden="true" />
                    <div className="cta-band-inner">
                        <h2 className="cta-band-title">{heading}</h2>
                        <p className="cta-band-text">{text}</p>
                        <div className="cta-band-actions">
                            <Link to="/product" className="btn btn-primary btn-lg">
                                Shop now · £24.99
                            </Link>
                            {showSecondary && (
                                <Link to={secondaryTo} className="btn btn-secondary btn-lg">
                                    {secondaryLabel}
                                    <ArrowRight size={18} strokeWidth={2} />
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
