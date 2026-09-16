import { motion } from 'framer-motion'
import { Zap, ShieldCheck, Sparkles, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import JarViewer from './jar/JarViewer'

/* Two ingredients either side of the jar, as on the original site. */
const LEFT = [
    { name: 'Magnesium Bisglycinate', role: 'Regulates electrical signaling', icon: Activity },
    { name: 'Coenzyme Q10', role: 'Mitochondrial function and antioxidant', icon: Zap },
]
const RIGHT = [
    { name: 'L-Taurine', role: 'Supports cardiac membrane stability', icon: ShieldCheck },
    { name: 'Vitamin B1, B6, B12, Zinc', role: 'Metabolic, neurological support, and antioxidant support', icon: Sparkles },
]

function IngredientCard({ name, role, icon: Icon, index }) {
    return (
        <motion.li
            className="ingredient-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
            <span className="ingredient-icon">
                <Icon size={20} strokeWidth={1.75} />
            </span>
            <h3 className="ingredient-name">{name}</h3>
            <p className="ingredient-role">{role}</p>
        </motion.li>
    )
}

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
                        The all-in-one cardiac supplement
                    </h2>
                    <p className="lead">
                        created specifically to support the electrical function of the heart.
                    </p>
                </motion.div>

                <div className="product-stage">
                    <ul className="ingredient-col ingredient-col-left">
                        {LEFT.map((item, i) => <IngredientCard key={item.name} {...item} index={i} />)}
                    </ul>

                    <motion.div
                        className="product-jar"
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <JarViewer />
                    </motion.div>

                    <ul className="ingredient-col ingredient-col-right">
                        {RIGHT.map((item, i) => <IngredientCard key={item.name} {...item} index={i + 2} />)}
                    </ul>
                </div>

                <div className="product-cta">
                    <Link to="/product" className="btn btn-primary btn-lg">
                        Shop Rhythmia — £24.99
                    </Link>
                </div>
            </div>
        </section>
    )
}
