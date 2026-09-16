import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
    ClinicallyIcon,
    VeganIcon,
    GMPIcon,
    UKMapIcon,
    BunnyIcon,
} from './BadgeIcons'

const badges = [
    { label: 'Clinically Formulated', sub: 'Developed by experts', icon: <ClinicallyIcon /> },
    { label: '100% Vegan', sub: 'Plant-based capsules', icon: <VeganIcon /> },
    { label: 'GMP Certified', sub: 'Independently verified', icon: <GMPIcon /> },
    { label: 'Made in UK', sub: 'Kent, England', icon: <UKMapIcon /> },
    { label: 'No Animal Testing', sub: 'Cruelty free', icon: <BunnyIcon /> },
]

/** How it's made, in brief: the five marks of quality and a link to the page. */
export default function MadeStrip() {
    return (
        <section className="section" id="how-its-made" data-surface="sunken">
            <div className="container">
                <motion.div
                    className="strip-head"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div>
                        <p className="eyebrow">How it&rsquo;s made</p>
                        <h2 className="section-heading">Crafted with Precision &amp; Purity</h2>
                        <p className="lead">
                            We have partnered with industry leaders to bring you unparalleled quality.
                        </p>
                    </div>
                    <Link to="/how-its-made" className="btn btn-secondary">
                        See how it&rsquo;s made
                        <ArrowRight size={18} strokeWidth={2} />
                    </Link>
                </motion.div>

                <motion.ul
                    className="badge-row"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    {badges.map(({ label, sub, icon }) => (
                        <li key={label}>
                            <span className="badge-mark">{icon}</span>
                            <span className="badge-label">{label}</span>
                            <span className="badge-sub">{sub}</span>
                        </li>
                    ))}
                </motion.ul>
            </div>
        </section>
    )
}
