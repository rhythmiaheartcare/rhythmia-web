import React from 'react'
import ProductJar from './3d/ProductJar'
import { motion } from 'framer-motion'
import { Zap, ShieldCheck, Sparkles, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'

const Card = ({ title, desc, icon, delay, align = 'left' }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="premium-card"
        style={{ marginLeft: align === 'right' ? 'auto' : '0', marginRight: align === 'left' ? 'auto' : '0' }}
    >
        <div className="card-icon">
            {icon}
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
    </motion.div>
)

export default function Product() {
    return (
        <section className="product-section" id="product">
            <div className="container relative z-10">
                <div className="text-center mb-16">
                    <h2 className="section-title text-primary" style={{ color: 'var(--color-primary)' }}>An all-in-one cardiac supplement</h2>
                    <div className="divider bg-secondary mx-auto"></div>
                    <p className="text-primary mt-4 max-w-2xl mx-auto" style={{ color: '#ffffff' }}>
                        created specifically to support the electrical function of the heart.
                    </p>
                </div>

                <div className="product-grid-refined">
                    {/* Left Column */}
                    <div className="product-col-side">
                        <Card
                            align="right"
                            title="Magnesium Bisglycinate"
                            desc="Regulates electrical signaling"
                            icon={<Activity size={24} />}
                            delay={0.1}
                        />
                        <Card
                            align="right"
                            title="Coenzyme Q10"
                            desc="Mitochondrial function and antioxidant"
                            icon={<Zap size={24} />}
                            delay={0.3}
                        />
                    </div>

                    {/* Center Column - Jar */}
                    <div className="product-col-center relative product-jar-wrapper flex flex-col items-center">
                        <ProductJar />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 z-10"
                        >
                            <Link to="/product" className="buy-now-btn">
                                Buy Now
                            </Link>
                        </motion.div>
                        <style>{`
                            .buy-now-btn {
                                display: inline-block;
                                padding: 1rem 2.5rem;
                                background-color: var(--color-secondary);
                                color: white;
                                border-radius: 50px;
                                font-size: 1.2rem;
                                font-weight: 600;
                                text-decoration: none;
                                text-transform: uppercase;
                                letter-spacing: 0.05em;
                                box-shadow: 0 4px 20px rgba(213, 15, 15, 0.4);
                                transition: all 0.3s ease;
                                margin-top: -30px; /* Pull it up a bit closer to jar if needed, or rely on flex gap */
                            }
                            .buy-now-btn:hover {
                                transform: translateY(-3px) scale(1.05);
                                background-color: #ff1f1f;
                                box-shadow: 0 8px 30px rgba(213, 15, 15, 0.6);
                            }
                        `}</style>
                    </div>

                    {/* Right Column */}
                    <div className="product-col-side">
                        <Card
                            align="left"
                            title="L-Taurine"
                            desc="Supports cardiac membrane stability"
                            icon={<ShieldCheck size={24} />}
                            delay={0.2}
                        />
                        <Card
                            align="left"
                            title="Vitamin B1, B6, B12, Zinc"
                            desc="Metabolic, neurological support, and antioxidant support"
                            icon={<Sparkles size={24} />}
                            delay={0.4}
                        />
                    </div>
                </div>

                {/* Ingredients List - Text Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-20 max-w-5xl mx-auto px-4 text-center"
                >
                    <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold" style={{ margin: '3rem 0 1rem 0', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', fontWeight: 600 }}>Full ingredients</p>
                    <p style={{
                        color: '#ffffff',
                        fontSize: '1rem',
                        lineHeight: '1.8',
                        marginTop: '1rem',
                        opacity: 0.9
                    }}>
                        Magnesium (Magnesium Bisglycinate Chelate Buffered), Taurine, Coenzyme Q10 (Ubiquinone), Zinc (Zinc Picolinate), Vitamin B1 (Thiamine Hydrochloride), Vitamin B6 (Pyridoxine Hydrochloride), Vitamin B12 (Methylcobalamin), Capsule Shell (Hydroxypropylmethylcellulose)
                    </p>
                </motion.div>

                <style>{`

                `}</style>
            </div>
        </section>
    )
}
