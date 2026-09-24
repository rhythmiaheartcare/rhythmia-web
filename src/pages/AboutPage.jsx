import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Portrait from '../components/Portrait'
import CtaBand from '../components/CtaBand'
import { people } from '../data/people'
import { usePageMeta } from '../hooks/usePageMeta'

const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const EASE = [0.22, 1, 0.36, 1]

/** Portrait, name and role. People with a written bio open it in a pop-up. */
function PersonCard({ person, index, onOpen }) {
    const content = (
        <>
            <Portrait person={person} />
            <h4 className="person-name">{person.name}</h4>
            <p className="person-title">{person.title}</p>
            {person.bio && <span className="person-more">Read bio</span>}
        </>
    )

    return (
        <motion.li
            className="person"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
        >
            {person.bio ? (
                <button
                    type="button"
                    className="person-button"
                    onClick={(e) => onOpen(person, e.currentTarget)}
                    aria-haspopup="dialog"
                >
                    {content}
                </button>
            ) : (
                content
            )}
        </motion.li>
    )
}

/** Full biography in a pop-up. Closes on the button, the backdrop or Escape,
 * and hands focus back to the card that opened it. */
function BioDialog({ person, onClose }) {
    const closeRef = useRef(null)

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose()
        const { overflow } = document.body.style
        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', onKey)
        closeRef.current?.focus()
        return () => {
            document.body.style.overflow = overflow
            document.removeEventListener('keydown', onKey)
        }
    }, [onClose])

    return (
        <motion.div
            className="bio-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
        >
            <motion.div
                className="bio-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="bio-dialog-name"
                initial={{ opacity: 0, y: 32, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.4, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
            >
                <button ref={closeRef} type="button" className="bio-close" onClick={onClose} aria-label="Close">
                    <X size={20} strokeWidth={2} aria-hidden="true" />
                </button>
                <div className="bio-head">
                    <Portrait person={person} className="bio-portrait" />
                    <div>
                        <h3 id="bio-dialog-name" className="bio-name">{person.name}</h3>
                        <p className="bio-title">{person.title}</p>
                        {person.credential && <p className="bio-credential">{person.credential}</p>}
                        {person.affiliation && <p className="bio-affiliation">{person.affiliation}</p>}
                    </div>
                </div>
                <p className="bio-text">{person.bio}</p>
            </motion.div>
        </motion.div>
    )
}

export default function AboutPage() {
    usePageMeta({
        title: 'About',
        description: 'Founded by UK cardiologists specialising in heart rhythm, and guided by advisors from Imperial College Healthcare and the NHS. Meet the people behind Rhythmia Heart Care.',
        path: '/about',
    })
    const [selected, setSelected] = useState(null)
    const openerRef = useRef(null)
    const openBio = (person, opener) => {
        openerRef.current = opener
        setSelected(person)
    }
    const closeBio = () => setSelected(null)

    return (
        <>
            <a className="skip-link" href="#main">Skip to content</a>
            <Navbar />

            <main id="main">
                {/* Hero */}
                <section className="section about-hero">
                    <div className="container">
                        <motion.div
                            variants={reveal}
                            initial="hidden"
                            animate="show"
                            className="about-hero-copy"
                        >
                            <p className="eyebrow">About</p>
                            <h1 className="about-hero-title">
                                The Minds Behind Rhythmia
                            </h1>
                            <p className="lead">
                                A team of cardiologists, scientists, and innovators united by a
                                single mission &mdash; to support your heart with science-backed,
                                physician-developed care.
                            </p>
                            <p className="prose about-mission">
                                <strong>Built by Clinicians, Driven by Science.</strong> Rhythmia
                                Heart Care was born inside the walls of one of the UK&rsquo;s leading
                                cardiac centres. Our team brings together frontline clinical
                                experience, deep cardiovascular research, and technology expertise to
                                create heart supplements that truly reflect what the science says.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Our story */}
                <section className="section" id="our-story">
                    <div className="container">
                        <div className="grid-split">
                            <motion.div
                                className="media media-zoom story-media"
                                initial={{ opacity: 0, scale: 0.97 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <img
                                    src="/assets/photos/young-lifestyle-active.png"
                                    alt="Someone out walking, keeping active"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </motion.div>

                            <motion.div
                                variants={reveal}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-80px' }}
                            >
                                <p className="eyebrow">Our story</p>
                                <h2 className="section-heading">Our Story</h2>
                                <div className="prose">
                                    <p>
                                        It began with a single heartbeat, a realized potential to save
                                        lives not just through medicine, but through understanding the
                                        delicate rhythm of the human heart.
                                    </p>
                                    <p>
                                        The founders brought together a carefully selected blend of
                                        ingredients they often recommend to their patients, with one
                                        clear mission: to support everyday heart rhythm health.
                                        It&rsquo;s designed for people living with arrhythmias, as well
                                        as anyone who wants to take care of their heart&rsquo;s
                                        electrical balance, providing gentle, daily support you can
                                        rely on.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* The people behind it */}
                <section className="section" id="people" data-surface="sunken">
                    <div className="container">
                        <motion.div
                            className="people-head"
                            variants={reveal}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            <p className="eyebrow">Our people</p>
                            <h2 className="section-heading">The people behind it</h2>
                            <p className="lead">
                                Cardiologists, researchers and operators who between them have spent
                                careers on heart rhythm.
                            </p>
                        </motion.div>

                        <ul className="person-grid">
                            {people.map((person, i) => (
                                <PersonCard key={person.name} person={person} index={i} onOpen={openBio} />
                            ))}
                        </ul>
                    </div>
                </section>

                <CtaBand
                    heading="Confidence in Every Beat"
                    text="Expert-led. Evidence-based. Designed to support your heart at every level."
                />
            </main>

            <Footer />

            <AnimatePresence onExitComplete={() => openerRef.current?.focus()}>
                {selected && <BioDialog key={selected.name} person={selected} onClose={closeBio} />}
            </AnimatePresence>
        </>
    )
}
