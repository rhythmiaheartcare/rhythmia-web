import { motion } from 'framer-motion'
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

/** Expanded card — used for people who have a written bio. */
function ProfileCard({ person, index }) {
    return (
        <motion.li
            className="profile"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
            <Portrait person={person} className="portrait-lg" />
            <div className="profile-body">
                <h4 className="profile-name">{person.name}</h4>
                <p className="profile-title">{person.title}</p>
                {person.credential && <p className="profile-credential">{person.credential}</p>}
                {person.affiliation && <p className="profile-affiliation">{person.affiliation}</p>}
                <p className="profile-bio">{person.bio}</p>
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
                <ul className="profile-list">
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
                                Built by clinicians, driven by science
                            </h1>
                            <p className="lead">
                                Rhythmia Heart Care was founded by UK cardiologists to support
                                something most heart supplements overlook — the electrical system
                                that sets your heartbeat.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Who we are — moved here from the homepage */}
                <section className="section" id="who-we-are" data-surface="sunken">
                    <div className="container">
                        <div className="grid-split">
                            <motion.div
                                variants={reveal}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '-80px' }}
                            >
                                <p className="eyebrow">Who we are</p>
                                <h2 className="section-heading">We&rsquo;re Rhythmia Heart Care</h2>
                                <div className="prose">
                                    <p>
                                        Founded by UK cardiologists, we deliver trusted, clinically
                                        informed support for the heart&rsquo;s electrical rhythm.
                                    </p>
                                    <p>
                                        More than a capsule, it&rsquo;s a commitment: to empower
                                        patients with arrhythmias, and to give confidence to anyone
                                        wanting to look after their heart rhythm.
                                    </p>
                                    <p>
                                        Proper heart health is about caring for your heart&rsquo;s
                                        natural rhythm.
                                    </p>
                                </div>
                            </motion.div>

                            {/* PLACEHOLDER: replace with a photograph of the cardiologists behind
                                Rhythmia (Zuhair, Keene, Boon Lim). Drop the file into
                                public/assets/photos/ and swap the src below. */}
                            <motion.div
                                className="media media-zoom story-media"
                                initial={{ opacity: 0, scale: 0.97 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <img
                                    src="/assets/photos/getty-images-3UDtdrn3qsQ-unsplash.jpg"
                                    alt="Cardiologists reviewing heart rhythm data"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Our story — moved here from the homepage */}
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
                                <h2 className="section-heading">It began with a single heartbeat</h2>
                                <div className="prose">
                                    <p>
                                        A realised potential to save lives not just through medicine,
                                        but through understanding the delicate rhythm of the human
                                        heart.
                                    </p>
                                    <p>
                                        The founders brought together a carefully selected blend of
                                        ingredients they often recommend to their patients, with one
                                        clear mission: to support everyday heart rhythm health.
                                        It&rsquo;s designed for people living with arrhythmias, as well
                                        as anyone who wants to take care of their heart&rsquo;s
                                        electrical balance — gentle, daily support you can rely on.
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

                <CtaBand />
            </main>

            <Footer />
        </>
    )
}
