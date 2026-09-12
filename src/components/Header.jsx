import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import Navbar from './Navbar'

const TRUST = ['Cardiologist-formulated', 'GMP certified', 'Made in the UK', 'Vegan']

const rise = {
    hidden: { opacity: 0, y: 20 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
}

export default function Header() {
    return (
        <>
            <Navbar />

            {/* Full-viewport hero. Two photographs of the same scene, each composed
                for its device: a 16:9 with the jar in the left third and the copy
                over the clean right side on desktop; a 4:5 with the jar in the lower
                half and the copy above it on phones. <picture> serves whichever
                applies, so neither device downloads the other's image. */}
            <header className="hero">
                <div className="hero-media">
                    <picture>
                        <source media="(max-width: 900px)" srcSet="/assets/photos/hero-banner-mobile.jpg" />
                        <img
                            src="/assets/photos/hero-banner.jpg"
                            alt="A jar of Rhythmia Heart Care on a sunlit stone surface"
                            width="1376"
                            height="768"
                            decoding="async"
                        />
                    </picture>
                    <div className="hero-scrim" aria-hidden="true" />
                </div>

                <div className="container hero-inner">
                    <div className="hero-copy">
                        <motion.p className="eyebrow" variants={rise} initial="hidden" animate="show" custom={0}>
                            Created by UK cardiologists
                        </motion.p>

                        <motion.h1 className="hero-title" variants={rise} initial="hidden" animate="show" custom={1}>
                            Daily support for your heart&rsquo;s electrical rhythm
                        </motion.h1>

                        <motion.div className="hero-actions" variants={rise} initial="hidden" animate="show" custom={2}>
                            <Link to="/product" className="btn btn-primary btn-lg">
                                Shop now — £24.99
                            </Link>
                            {/* Second button on desktop; a text link on phones, where two
                                stacked buttons would cost ~135px of a full-height hero. */}
                            <Link to="/evidence" className="btn btn-secondary btn-lg hero-secondary">
                                See the evidence
                                <ArrowRight size={18} strokeWidth={2} />
                            </Link>
                            <Link to="/evidence" className="hero-link">
                                See the evidence
                                <ArrowRight size={16} strokeWidth={2} />
                            </Link>
                        </motion.div>

                        <motion.ul className="hero-trust" variants={rise} initial="hidden" animate="show" custom={3}>
                            {TRUST.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </motion.ul>
                    </div>
                </div>
            </header>
        </>
    )
}
