import React from 'react'
import { ArrowLeft, Check, ShieldCheck, Zap, Lock } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ProductJar from '../components/3d/ProductJar'
import ProductReviews from '../components/ProductReviews'
import Footer from '../components/Footer'

export default function ProductPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = (e) => {
        e.preventDefault();
        if (location.key !== "default") {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    const [purchaseType, setPurchaseType] = React.useState('onetime');
    const [activeTab, setActiveTab] = React.useState('reviews');

    const handleCheckout = () => {
        // Open appropriate Stripe Payment Link based on selection
        const link = purchaseType === 'subscription'
            ? import.meta.env.VITE_STRIPE_LINK_SUBSCRIPTION
            : import.meta.env.VITE_STRIPE_LINK_ONETIME;

        if (link) {
            window.open(link, '_blank');
        } else {
            console.error("Stripe link not configured for", purchaseType);
            alert("Checkout link not configured yet. Please check environment variables.");
        }
    };

    const price = purchaseType === 'subscription' ? '£22.49' : '£24.99';

    return (
        <div className="product-page-root">
            <div className="product-content-wrapper">
                <a href="/" onClick={handleBack} className="back-link">
                    <ArrowLeft size={20} /> Back to Home
                </a>

                <div className="product-page-container container">
                    <div className="product-page-grid">
                        {/* Left: Image/Visual */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="product-visual"
                        >
                            {/* Using a high-quality static image for the sales page for stability, or re-using the 3D model if preferred. 
                                 For a sales conversion page, a static high-res render often converts better than an interactive model 
                                 that might distract. I'll stick to a clean placeholder/render style for now. */}
                            <div className="product-visual-container">
                                <ProductJar />
                            </div>
                        </motion.div>

                        {/* Right: Details & Checkout */}
                        <div className="product-details">
                            <h1 className="product-title">Rhythmia Heart Care</h1>
                            <p className="product-subtitle">Daily support for the electrical rhythm of your heart</p>

                            <div className="price-tag">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={purchaseType}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {price} <span className="text-sm text-gray-400 font-normal">
                                            {purchaseType === 'subscription' ? '/ month' : '/ bottle'}
                                        </span>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="description-container">
                                <p className="product-description">
                                    All-in-one supplement created specifically to support the electrical function of the
                                    heart. Clinically formulated with natural, vegan ingredients.
                                </p>
                            </div>

                            <ul className="benefit-list">
                                <li>
                                    <div className="benefit-icon"><Check size={18} /></div>
                                    <div className="benefit-text">
                                        <span className="benefit-key">Magnesium Bisglycinate</span>
                                        <span className="benefit-desc">Regulates electrical signalling</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="benefit-icon"><Check size={18} /></div>
                                    <div className="benefit-text">
                                        <span className="benefit-key">L-Taurine</span>
                                        <span className="benefit-desc">Supports cardiac membrane stability</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="benefit-icon"><Check size={18} /></div>
                                    <div className="benefit-text">
                                        <span className="benefit-key">Coenzyme Q10</span>
                                        <span className="benefit-desc">Promotes mitochondrial function</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="benefit-icon"><Check size={18} /></div>
                                    <div className="benefit-text">
                                        <span className="benefit-key">Vitamin B Complex + Zinc</span>
                                        <span className="benefit-desc">Metabolic & neurological support</span>
                                    </div>
                                </li>
                            </ul>

                            {/* Purchase Options Selector - Horizontal Split Cards */}
                            <div className="purchase-options-container">
                                <div
                                    className={`option-card ${purchaseType === 'onetime' ? 'active' : ''}`}
                                    onClick={() => setPurchaseType('onetime')}
                                >
                                    <div className="option-header">
                                        <span className="option-title">One-time</span>
                                    </div>
                                    <span className="option-price">£24.99</span>
                                </div>
                                <div
                                    className={`option-card ${purchaseType === 'subscription' ? 'active' : ''}`}
                                    onClick={() => setPurchaseType('subscription')}
                                >
                                    <div className="option-header">
                                        <span className="option-title">Subscribe</span>
                                    </div>
                                    <span className="option-price">£22.49</span>
                                    <span className="save-badge">Save 10%</span>
                                    <div
                                        className={`sub-note-embedded ${purchaseType === 'subscription' ? 'visible' : ''}`}
                                    >
                                        Cancel anytime<br />No hidden fees
                                    </div>
                                </div>
                            </div>

                            {/* Old External Note Removed */}



                            <button onClick={handleCheckout} className="buy-now-btn-large">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={purchaseType}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ display: 'inline-flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}
                                    >
                                        {purchaseType === 'subscription' ? 'Subscribe Now' : 'Buy Now'}
                                        <span className="secure-suffix"> Secure Checkout</span>
                                    </motion.span>
                                </AnimatePresence>
                            </button>

                            <div className="trust-badges">
                                <span><ShieldCheck size={16} /> 30-Day Guarantee</span>
                                <span><Zap size={16} /> Fast Shipping</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabbed Info Section - Full Width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="product-info-section"
                >
                    <div className="tab-header">
                        <button
                            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
                            onClick={() => setActiveTab('ingredients')}
                        >
                            Full Ingredients
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'ingredients' && (
                            <motion.div
                                key="ingredients"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="info-content"
                            >
                                <p className="info-section-text">
                                    Magnesium (Magnesium Bisglycinate Chelate Buffered), Taurine, Coenzyme Q10 (Ubiquinone), Zinc (Zinc Picolinate), Vitamin B1 (Thiamine Hydrochloride), Vitamin B6 (Pyridoxine Hydrochloride), Vitamin B12 (Methylcobalamin), Capsule Shell (Hydroxypropylmethylcellulose)
                                </p>
                            </motion.div>
                        )}

                        {activeTab === 'reviews' && (
                            <motion.div
                                key="reviews"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProductReviews />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
            <Footer />

            <style>{`
                /* Tab Styles */
                .tab-header {
                    display: flex;
                    gap: 2rem;
                    margin-bottom: 2rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 1rem;
                }
                .tab-btn {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.4);
                    font-family: var(--font-main);
                    font-size: 1.1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    cursor: pointer;
                    padding-bottom: 0.5rem;
                    position: relative;
                    transition: all 0.3s;
                    font-weight: 600; /* Fixed weight to prevent wiggle */
                }
                .tab-btn:hover {
                    color: rgba(255,255,255,0.8);
                }
                .tab-btn.active {
                    color: white;
                    /* font-weight removed to prevent layout shift */
                }
                .tab-btn.active::after {
                    content: '';
                    position: absolute;
                    bottom: -1.1rem; /* align with border bottom */
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: var(--color-secondary);
                    box-shadow: 0 -2px 10px var(--color-secondary);
                }
                .tab-content {
                    min-height: 200px;
                }
                /* End Tab Styles */

                .product-page-root {
                    min-height: 100vh;
                    background-color: var(--color-quaternary);
                    color: var(--color-primary);
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                }
                .product-content-wrapper {
                    padding: 2rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--color-primary);
                    text-decoration: none;
                    opacity: 0.7;
                    transition: opacity 0.3s;
                    margin-bottom: 2rem;
                    font-weight: 500;
                }
                .back-link:hover {
                    opacity: 1;
                }
                .product-page-container {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .product-page-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6rem;
                    align-items: flex-start;
                    width: 100%;
                    max-width: 1200px;
                }
                .product-visual {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: sticky;
                    top: 2rem;
                }
                .product-visual-container {
                    width: 100%;
                    height: 550px;
                    position: relative;
                }
                .product-details {
                    padding-top: 1rem;
                }
                .product-title {
                    font-size: 3.5rem;
                    line-height: 1.1;
                    margin-bottom: 0.75rem;
                    color: white;
                    font-weight: 600;
                    letter-spacing: -0.02em;
                }
                .product-subtitle {
                    font-size: 1.1rem;
                    color: var(--color-secondary);
                    margin-bottom: 2rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    font-weight: 600;
                    opacity: 0.9;
                }
                .price-tag {
                    font-size: 2.75rem;
                    font-weight: 600;
                    color: white;
                    margin-bottom: 2rem;
                    display: flex;
                    align-items: baseline;
                    gap: 0.5rem;
                }
                .description-container {
                    margin-bottom: 2.5rem;
                    /* Removed border and padding */
                }
                .product-description {
                    line-height: 1.8;
                    color: rgba(255,255,255,0.8);
                    font-size: 1.05rem;
                    margin: 0;
                }
                .benefit-list {
                    list-style: none;
                    margin-bottom: 3.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }
                .benefit-list li {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                }
                .benefit-icon {
                    color: var(--color-secondary);
                    margin-top: 2px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(213, 15, 15, 0.1);
                    padding: 4px;
                    border-radius: 50%;
                }
                .benefit-text {
                    display: flex;
                    flex-direction: column;
                }
                .benefit-key {
                    font-weight: 600;
                    color: white;
                    font-size: 1.05rem;
                    margin-bottom: 2px;
                }
                .benefit-desc {
                    font-size: 0.95rem;
                    color: rgba(255,255,255,0.6);
                }
                .product-info-section {
                    width: 100%;
                    max-width: 1200px;
                    margin: 4rem auto 0;
                    padding: 3rem;
                    background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%);
                    border-radius: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .info-content {
                    text-align: center;
                }
                .info-section-title {
                    color: rgba(255,255,255,0.5);
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                }
                .info-section-text {
                    color: rgba(255,255,255,0.8);
                    font-size: 1rem;
                    line-height: 1.9;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .buy-now-btn-large {
                    width: 100%;
                    padding: 1.25rem;
                    background-color: var(--color-secondary);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1.2rem;
                    font-weight: 600;
                    font-family: var(--font-main); /* Ensure Clash Display is used */
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    box-shadow: 0 4px 20px rgba(213, 15, 15, 0.4);
                }
                .buy-now-btn-large:hover {
                    background-color: #ff1f1f;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(213, 15, 15, 0.6);
                }
                .trust-badges {
                    margin-top: 2rem;
                    display: flex;
                    gap: 2rem;
                    justify-content: center;
                    opacity: 0.4;
                    font-size: 0.85rem;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }
                .trust-badges span {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                @media (max-width: 900px) {
                    .product-page-grid {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                        text-align: left; /* Align left for consistent tick column */
                    }
                    .benefit-list li {
                        justify-content: flex-start; /* Align left */
                    }
                    .trust-badges {
                        justify-content: center;
                    }
                    .product-title {
                        font-size: 2.5rem;
                    }
                    .product-visual {
                        position: relative; /* Disable sticky on mobile */
                        top: 0;
                    }
                    .product-visual-container {
                         height: 400px;
                    }
                     .purchase-options-container {
                        grid-template-columns: 1fr 1fr; 
                        gap: 0.75rem;
                     }
                     .option-card {
                        padding: 1rem 0.5rem;
                     }
                }
                
                /* Purchase Options Styling - Horizontal Split */
                .purchase-options-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                .option-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 1.5rem 1rem;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: rgba(255,255,255,0.02);
                    position: relative;
                    min-height: 140px;
                }
                .option-card:hover {
                    background: rgba(255,255,255,0.05);
                    transform: translateY(-2px);
                }
                .option-card.active {
                    border-color: var(--color-secondary);
                    background: rgba(213, 15, 15, 0.08);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                }
                
                /* Hide the radio circle for this modern "Plan" look */
                .option-radio {
                    display: none;
                }
                
                .option-header {
                    margin-bottom: 0.5rem;
                }
                
                .option-title {
                    font-size: 0.95rem;
                    font-weight: 500;
                    color: rgba(255,255,255,0.7);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .option-price {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: white;
                }
                
                .save-badge {
                    margin-top: 0.5rem;
                    background: var(--color-secondary);
                    color: white;
                    font-size: 0.75rem;
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-weight: 600;
                }
                
                .sub-note-embedded {
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.5);
                    margin-top: 0.5rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    min-height: 2.5em; /* Reserve height for 2 lines */
                    line-height: 1.4;
                }
                .sub-note-embedded.visible {
                    opacity: 1;
                }

                .subscription-note {
                    display: none; /* We will embed the text inside the card */
                }

                @media (max-width: 900px) {
                    /* On mobile, keep them side-by-side but tighter */
                     .purchase-options-container {
                        grid-template-columns: 1fr 1fr; 
                        gap: 0.75rem;
                     }
                     .option-card {
                        padding: 1rem 0.5rem;
                     }
                     
                     /* Fix for button text wrapping on mobile */
                     .buy-now-btn-large {
                         font-size: 1.2rem; /* Larger, close to original */
                         white-space: nowrap; 
                         padding: 1.25rem 0.25rem; /* Max height, min side padding */
                     }
                }
                
                .secure-suffix {
                    font-size: 0.75em; /* Smaller suffix to allow main text to be big */
                    font-weight: 400;
                    opacity: 0.8;
                    text-transform: none; 
                    letter-spacing: -0.02em; /* Squeeze slightly */
                    margin-left: 0.4rem;
                }
                
                .secure-checkout-label {
                    display: none;
                }
            `}</style>
        </div>
    )
}
