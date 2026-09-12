import { motion } from 'framer-motion'
import { Zap, ShieldCheck, Sparkles, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'

const INGREDIENTS = [
    {
        name: 'Magnesium Bisglycinate',
        role: 'Regulates the electrical signalling that sets your heart rhythm.',
        icon: Activity,
    },
    {
        name: 'L-Taurine',
        role: 'Supports cardiac cell membrane stability and calcium handling.',
        icon: ShieldCheck,
    },
    {
        name: 'Coenzyme Q10',
        role: 'Powers mitochondrial energy production in heart muscle.',
        icon: Zap,
    },
    {
        name: 'Vitamin B1, B6, B12 & Zinc',
        role: 'Metabolic, neurological and antioxidant support.',
        icon: Sparkles,
    },
]

export default function Product() {
    return (
        <section className="section" id="product">
            <div className="container">
                <motion.div
                    className="product-head"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="eyebrow">The formulation</p>
                    <h2 className="section-heading section-heading-center">
                        An all-in-one cardiac supplement
                    </h2>
                    <p className="lead">
                        Six active ingredients, each selected for its published evidence in supporting
                        the electrical function of the heart. Two capsules a day.
                    </p>
                </motion.div>

                <ul className="ingredient-grid">
                    {INGREDIENTS.map(({ name, role, icon: Icon }, i) => (
                        <motion.li
                            key={name}
                            className="ingredient-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="ingredient-icon">
                                <Icon size={20} strokeWidth={1.75} />
                            </span>
                            <h3 className="ingredient-name">{name}</h3>
                            <p className="ingredient-role">{role}</p>
                        </motion.li>
                    ))}
                </ul>

                <div className="product-cta">
                    <Link to="/product" className="btn btn-primary btn-lg">
                        Shop Rhythmia — £24.99
                    </Link>
                </div>
            </div>
        </section>
    )
}
