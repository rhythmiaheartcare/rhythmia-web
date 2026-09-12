import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'

/* Every item is a real destination. "Product" goes to the product page rather
   than to a homepage anchor also called Product — two different things sharing
   one name was part of what made the nav confusing. */
const LINKS = [
    { label: 'Product', to: '/product' },
    { label: 'Evidence', to: '/evidence' },
    { label: "How It's Made", to: '/how-its-made' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/#contact' },
]

const EASE = [0.22, 1, 0.36, 1]

/* Sheet and items animate together — the items are not made to wait for the
   sheet to finish. With a 25ms stagger the last item settles at ~380ms; the
   sequential version had the menu still arriving at close to a second. */
const sheet = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE, staggerChildren: 0.025 } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.16, ease: EASE } },
}

const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: EASE } },
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()
    const burgerRef = useRef(null)
    const firstLinkRef = useRef(null)

    // The header's scrolled state is frozen while the menu is open. Locking
    // scroll zeroes window.scrollY on phones, and without the freeze that
    // fired this listener, un-set "scrolled", re-expanded the announcement
    // bar, and grew the header by 34px the moment the menu opened.
    useEffect(() => {
        if (menuOpen) return
        const onScroll = () => setScrolled(window.scrollY > 24)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [menuOpen])

    // Lock scrolling while the menu is open without moving the page: fix the
    // body in place at its current offset, and put it back on close. This is
    // the technique iOS actually honours (it ignores overflow: hidden on
    // body), and unlike overflow on <html> it does not reset scroll position.
    useEffect(() => {
        if (!menuOpen) return
        const y = window.scrollY
        const body = document.body
        Object.assign(body.style, { position: 'fixed', top: `-${y}px`, left: '0', right: '0', width: '100%' })

        return () => {
            Object.assign(body.style, { position: '', top: '', left: '', right: '', width: '' })
            window.scrollTo({ top: y, left: 0, behavior: 'instant' })
        }
    }, [menuOpen])

    // Close on route change, and on Escape.
    useEffect(() => { setMenuOpen(false) }, [location.pathname, location.hash])
    useEffect(() => {
        if (!menuOpen) return
        const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [menuOpen])

    // Move focus into the menu when it opens and back to the control on close.
    useEffect(() => {
        if (menuOpen) {
            const t = setTimeout(() => firstLinkRef.current?.focus(), 80)
            return () => clearTimeout(t)
        }
        burgerRef.current?.focus({ preventScroll: true })
    }, [menuOpen])

    const close = () => setMenuOpen(false)
    const linkClass = ({ isActive }) => (isActive ? 'is-active' : undefined)

    const renderLink = (link, ref) =>
        link.to.includes('#') ? (
            <Link to={link.to} onClick={close} ref={ref}>{link.label}</Link>
        ) : (
            <NavLink to={link.to} className={linkClass} onClick={close} ref={ref}>{link.label}</NavLink>
        )

    return (
        <>
            <div className={`site-head ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
                <div className="announcement">
                    <span>Now available in</span>
                    <strong className="announcement-brand">Selfridges</strong>
                </div>

                <nav className="nav" aria-label="Primary">
                    <div className="container nav-inner">
                        <Link to="/" className="nav-brand" aria-label="Rhythmia Heart Care — home" onClick={close}>
                            <img
                                src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_Black_Copy_RGB.svg"
                                alt=""
                                width="150"
                                height="34"
                            />
                        </Link>

                        <ul className="nav-links">
                            {LINKS.map((link) => (
                                <li key={link.label}>{renderLink(link)}</li>
                            ))}
                        </ul>

                        <div className="nav-actions">
                            <Link to="/product" className="btn btn-primary btn-sm">Buy now</Link>
                            {/* The same control opens and closes the menu, morphing between
                                the two states where it stands — nothing jumps. */}
                            <button
                                ref={burgerRef}
                                className={`burger ${menuOpen ? 'is-open' : ''}`}
                                onClick={() => setMenuOpen((v) => !v)}
                                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={menuOpen}
                                aria-controls="site-menu"
                            >
                                <span aria-hidden="true" />
                                <span aria-hidden="true" />
                                <span aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="site-menu"
                        className="menu"
                        variants={sheet}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        role="dialog"
                        aria-label="Menu"
                    >
                        <div className="container menu-inner">
                            <nav aria-label="Menu">
                                <ul className="menu-list">
                                    {LINKS.map((link, i) => (
                                        <motion.li key={link.label} variants={item}>
                                            {renderLink(link, i === 0 ? firstLinkRef : undefined)}
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            <motion.div className="menu-foot" variants={item}>
                                <a
                                    href="https://www.instagram.com/rhythmiaheartcare/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="menu-social"
                                    aria-label="Rhythmia Heart Care on Instagram"
                                >
                                    <Instagram size={18} strokeWidth={1.75} aria-hidden="true" />
                                    <span>@rhythmiaheartcare</span>
                                </a>
                                <p className="menu-trust">
                                    Cardiologist-formulated <span aria-hidden="true">·</span> Made in the UK
                                </p>
                                <Link to="/product" onClick={close} className="btn btn-primary btn-lg btn-block">
                                    Buy now
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
