import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const lenis = useLenis()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (id) => {
        setMobileMenuOpen(false) // Close menu on click

        // If not on home page, go to home then scroll
        if (location.pathname !== '/') {
            navigate(`/#${id}`);
            return;
        }

        if (lenis) {
            lenis.scrollTo(`#${id}`)
        } else {
            const element = document.getElementById(id)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                {/* Mobile Menu Button - Left Aligned */}
                <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
                    <Menu size={28} color="var(--color-primary)" />
                </div>

                {/* Logo - Center Aligned */}
                <div className="nav-logo" onClick={() => {
                    navigate('/');
                    if (lenis) lenis.scrollTo(0);
                    else window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                    <img src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_White_Copy_RGB.svg" alt="Rhythmia" className="nav-logo-img" />
                </div>

                {/* Desktop Links - Right Aligned */}
                <ul className="nav-links desktop-only">
                    <li onClick={() => scrollToSection('product')}>Product</li>
                    <li onClick={() => scrollToSection('who-we-are')}>Who We Are</li>
                    <li onClick={() => scrollToSection('every-heartbeat')}>Rhythm</li>
                    <li onClick={() => scrollToSection('our-story')}>Our Story</li>
                    <li onClick={() => scrollToSection('contact')}>Contact</li>
                    <li>
                        <Link to="/product" className="nav-cta-btn">
                            Buy Now
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="mobile-menu-overlay"
                    >
                        <div className="mobile-menu-header">
                            <div className="nav-logo" onClick={() => { setMobileMenuOpen(false); navigate('/'); }}>
                                <img src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_White_Copy_RGB.svg" alt="Rhythmia" style={{ width: '100px' }} />
                            </div>
                            <div className="close-btn" onClick={() => setMobileMenuOpen(false)}>
                                <X size={32} color="var(--color-primary)" />
                            </div>
                        </div>
                        <ul className="mobile-nav-links">
                            <li onClick={() => scrollToSection('product')}>Product</li>
                            <li onClick={() => scrollToSection('who-we-are')}>Who We Are</li>
                            <li onClick={() => scrollToSection('every-heartbeat')}>Rhythm</li>
                            <li onClick={() => scrollToSection('our-story')}>Our Story</li>
                            <li onClick={() => scrollToSection('contact')}>Contact</li>
                            <li>
                                <Link to="/product" onClick={() => setMobileMenuOpen(false)} className="mobile-cta-btn">
                                    Buy Now
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .nav-links {
                    align-items: center; /* Ensure vertical alignment */
                }
                
                .nav-cta-btn {
                    background-color: var(--color-secondary);
                    color: white;
                    padding: 0.5rem 1.5rem;
                    border-radius: 20px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: transform 0.2s, background-color 0.2s;
                    display: inline-block;
                }
                .nav-cta-btn:hover {
                    background-color: #ff1f1f;
                    transform: scale(1.05);
                    color: white;
                    padding: 0.5rem 1.5rem;
                }

                .mobile-cta-btn {
                    display: inline-block;
                    margin-top: 1rem;
                    background-color: var(--color-secondary);
                    color: white;
                    padding: 0.8rem 2rem;
                    border-radius: 30px;
                    text-decoration: none;
                    font-weight: 600;
                }
            `}</style>
        </nav>
    )
}
