import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Portrait from '../components/Portrait'
import CtaBand from '../components/CtaBand'
import { founders, advisors, team } from '../data/people'
import { usePageMeta } from '../hooks/usePageMeta'

const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const EASE = [0.22, 1, 0.36, 1]
const PREVIEW_LINES = 2

/** Expanded card — used for people who have a written bio. The biography
 * shows its first two lines; "Read more" opens the rest of this card only. */
function ProfileCard({ person, index }) {
    const [open, setOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(null)   // height of the preview, px
    const [overflows, setOverflows] = useState(false)  // bio longer than the preview?
    const bioRef = useRef(null)
    const id = `bio-${person.name.replace(/\W+/g, '-').toLowerCase()}`

    useLayoutEffect(() => {
        const el = bioRef.current
        if (!el) return
        const measure = () => {
            const lh = parseFloat(getComputedStyle(el).lineHeight)
            const h = Math.round(lh * PREVIEW_LINES)
            setCollapsed(h)
            setOverflows(el.scrollHeight > h + 2)
        }
        measure()
        const ro = new ResizeObserver(measure)
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    return (
        <motion.li
            className={`profile ${open ? 'is-open' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
        >
            <Portrait person={person} className="portrait-lg" />
            <div className="profile-body">
                <h4 className="profile-name">{person.name}</h4>
                <p className="profile-title">{person.title}</p>
                {person.credential && <p className="profile-credential">{person.credential}</p>}
                {person.affiliation && <p className="profile-affiliation">{person.affiliation}</p>}
                <motion.div
                    id={id}
                    className="profile-bio-wrap"
                    initial={false}
                    animate={{ height: open || collapsed === null ? 'auto' : collapsed }}
                    transition={{ duration: 0.4, ease: EASE }}
                    style={{ overflow: 'hidden' }}
                >
                    <p ref={bioRef} className="profile-bio">{person.bio}</p>
                </motion.div>
                {overflows && (
                    <button
                        className="profile-more"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-controls={id}
                    >
                        {open ? 'Read less' : 'Read more'}
                        <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                )}
            </div>
        </motion.li>
    )
}

/** Compact card — name, title and portrait only. */
function PersonCard({ person, index }) {
    return (
        <motion.li
            className="person"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
            <Portrait person={person} />
            <h4 className="person-name">{person.name}</h4>
            <p className="person-title">{person.title}</p>
        </motion.li>
    )
}

function Group({ label, people }) {
    const profiled = people.filter((p) => p.bio)
    const compact = people.filter((p) => !p.bio)

    return (
        <div className="people-group">
            <h3 className="people-group-label">{label}</h3>
            {profiled.length > 0 && (
                /* Side by side on wide screens when there are two or three. */
                <ul
                    className={`profile-list ${profiled.length > 1 ? `is-columns cols-${Math.min(profiled.length, 3)}` : ''}`}
                    style={{ '--profile-cols': Math.min(profiled.length, 3) }}
                >
                    {profiled.map((person, i) => (
                        <ProfileCard key={person.name} person={person} index={i} />
                    ))}
                </ul>
            )}
            {compact.length > 0 && (
                <ul className="person-grid">
                    {compact.map((person, i) => (
                        <PersonCard key={person.name} person={person} index={i} />
                    ))}
                </ul>
            )}
        </div>
    )
}

export default function AboutPage() {
    usePageMeta({
        title: 'About',
        description: 'Founded by UK cardiologists specialising in heart rhythm, and guided by advisors from Imperial College Healthcare and the NHS. Meet the people behind Rhythmia Heart Care.',
        path: '/about',
    })
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

                        <Group label="Founders" people={founders} />
                        <Group label="Medical advisors" people={advisors} />
                        <Group label="Team" people={team} />
                    </div>
                </section>

                <CtaBand
                    heading="Confidence in Every Beat"
                    text="Expert-led. Evidence-based. Designed to support your heart at every level."
                />
            </main>

            <Footer />
        </>
    )
}
