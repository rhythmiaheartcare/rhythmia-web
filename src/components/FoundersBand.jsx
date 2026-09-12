import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import Portrait from './Portrait'
import { founders } from '../data/people'

/**
 * A compact "who says so" beat between the evidence and the closing CTA.
 *
 * The full "We're Rhythmia Heart Care" and "Our Story" sections now live on the
 * About page, but the homepage funnel still needs the cardiologist credibility
 * to land before a visitor is asked to buy — so this stays, in short form.
 */
export default function FoundersBand() {
    return (
        <section className="section-sm" id="founders">
            <div className="container founders-band">
                <motion.div
                    className="founders-copy"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="eyebrow">Who makes it</p>
                    <h2 className="founders-title">
                        Formulated by the cardiologists who treat rhythm disorders
                    </h2>
                    <p className="founders-text">
                        Rhythmia was created by UK cardiologists specialising in heart rhythm, and is
                        guided by advisors from Imperial College Healthcare and the NHS.
                    </p>
                    <Link to="/about" className="btn btn-secondary">
                        Meet the people behind it
                        <ArrowRight size={18} strokeWidth={2} />
                    </Link>
                </motion.div>

                <motion.ul
                    className="founders-list"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    {founders.map((person) => (
                        <li key={person.name}>
                            <Portrait person={person} />
                            <h3 className="founders-name">{person.name}</h3>
                            <p className="founders-role">{person.title}</p>
                        </li>
                    ))}
                </motion.ul>
            </div>
        </section>
    )
}
