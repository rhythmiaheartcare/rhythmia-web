import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, Award, Lightbulb, GraduationCap, Stethoscope } from 'lucide-react';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const leadership = [
    {
        name: "Mohamed Zuhair",
        title: "CEO & Chief Medical Officer",
        credential: "Cardiologist – Specialist in Electrophysiology",
        bio: "Dr. Mohamed Zuhair is a Cardiologist specialised in cardiac electrophysiology with extensive experience in heart rhythm disorders and cardiovascular prevention. He founded the company to bridge clinical cardiology with evidence-based nutritional support. He leads the company's vision and strategy, oversees product scientific integrity and medical communication, and ensures every product reflects the highest standards of cardiovascular care.",
        photo: "/assets/photos/Mohamed_Zuhair.png",
        icon: <Stethoscope size={20} />,
        accentColor: "#D50F0F",
    },
    {
        name: "Mohammad Albatat",
        title: "Chief Operating Officer (COO)",
        credential: "PhD in Cardiac Rhythm Management",
        bio: "Dr. Mohammad Albatat holds a PhD in Cardiac Rhythm Management and has extensive experience in building and scaling healthcare ventures. Combining deep cardiovascular knowledge with strong commercial and operational expertise, he drives execution, efficiency, and sustainable growth. He leads operations, manufacturing and supply chain partnerships, regulatory and quality frameworks, and business development to ensure high performance at scale.",
        photo: "/assets/photos/Mohammad_Albatat.png",
        icon: <GraduationCap size={20} />,
        accentColor: "#e76f51",
    },
    {
        name: "Reda Albatat",
        title: "Chief Technology Officer (CTO)",
        credential: "Data Scientist | AI Specialist",
        bio: "Reda Albatat is a Data Scientist with expertise in artificial intelligence and healthcare analytics. He leads the company's technology and data strategy, applying AI-driven insights to support innovation and informed decision-making. He oversees digital infrastructure, analytics, and performance optimisation to ensure the company remains modern, data-driven, and forward-looking.",
        photo: "/assets/photos/Reda_Albatat.png",
        imageStyle: { transform: "scale(1.3)", transformOrigin: "center top", width: "100%", height: "100%" },
        icon: <Lightbulb size={20} />,
        accentColor: "#2a9d8f",
    },
];

const advisors = [
    {
        name: "Dr. Daniel Keene",
        title: "Consultant Cardiologist & Electrophysiologist",
        affiliation: "Imperial College Healthcare NHS Trust | Imperial College London",
        role: "Advisor – Cardiac Electrophysiology",
        bio: "Dr. Daniel Keene is a Consultant Cardiologist and Electrophysiologist at Imperial College Healthcare NHS Trust and Imperial College London, specialising in heart rhythm disorders and cardiac device therapy. His clinical and academic work focuses on advancing electrophysiological care and pacing strategies. As an advisor, he provides expert clinical insight to ensure our cardiovascular approach remains scientifically rigorous and aligned with modern rhythm management.",
    },
    {
        name: "Dr. P. Boon Lim",
        title: "Consultant Cardiologist & Electrophysiologist",
        affiliation: "Imperial College Healthcare NHS Trust | Imperial College London",
        role: "Advisor – Heart Rhythm & Syncope",
        bio: "Dr. P. Boon Lim is a Consultant Cardiologist and Electrophysiologist at Imperial College Healthcare NHS Trust and Imperial College London, with specialist expertise in arrhythmias and syncope. He is actively involved in research and innovation in heart rhythm disorders. As an advisor, he contributes strategic clinical guidance to strengthen the scientific foundation of our cardiovascular initiatives.",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }
    }
};

export default function TeamPage() {
    const navigate = useNavigate();

    return (
        <div className="team-page-root">
            {/* Background pattern */}
            <div className="team-bg-pattern" />

            <div className="team-content-wrapper">
                <BackButton className="back-link" />
            </div>

            {/* Hero */}
            <div className="team-hero">
                <div className="team-hero-glow" />
                <div className="team-hero-glow-2" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="team-hero-content container"
                >
                    <div className="team-hero-badge">
                        <Users size={16} /> Our Team
                    </div>
                    <h1 className="team-hero-title">
                        The Minds Behind<br /><span className="text-secondary">Rhythmia</span>
                    </h1>
                    <p className="team-hero-subtitle">
                        A team of cardiologists, scientists, and innovators united by a single mission &mdash; to support your heart with science-backed, physician-developed care.
                    </p>
                </motion.div>
            </div>

            {/* Mission Statement */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="container team-mission-container"
            >
                <div className="team-mission-card">
                    <Heart size={32} className="team-mission-icon" />
                    <h2 className="team-mission-title">Built by Clinicians, Driven by Science</h2>
                    <p className="team-mission-text">
                        Rhythmia Heart Care was born inside the walls of one of the UK&apos;s leading cardiac centres. Our team brings together frontline clinical experience, deep cardiovascular research, and technology expertise to create heart supplements that truly reflect what the science says.
                    </p>
                </div>
            </motion.div>

            {/* Leadership Section */}
            <div className="container team-section-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="team-section-label">Leadership</h2>
                    <h3 className="team-section-heading">Meet Our Founders</h3>
                </motion.div>

                <motion.div
                    className="team-leadership-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {leadership.map((person, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            className="team-leader-card"
                        >
                            {/* Photo */}
                            <div className="team-leader-photo-wrapper">
                                <div style={person.imageStyle || { width: '100%', height: '100%' }}>
                                    <img
                                        src={person.photo}
                                        alt={person.name}
                                        className="team-leader-photo"
                                    />
                                </div>
                                <div className="team-leader-photo-overlay" />
                                <div className="team-leader-icon-badge" style={{ background: person.accentColor }}>
                                    {person.icon}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="team-leader-info">
                                <h3 className="team-leader-name">{person.name}</h3>
                                <div className="team-leader-title" style={{ color: person.accentColor }}>
                                    {person.title}
                                </div>
                                <div className="team-leader-credential">{person.credential}</div>
                                <div className="team-leader-divider" style={{ background: `${person.accentColor}44` }} />
                                <p className="team-leader-bio">{person.bio}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Advisors Section */}
            <div className="container team-section-container team-advisors-section">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="team-section-label">Clinical Advisors</h2>
                    <h3 className="team-section-heading">Guided by World-Class Expertise</h3>
                    <p className="team-section-intro">
                        Our advisory board brings specialist knowledge from one of the world&apos;s leading cardiac institutions, ensuring every decision we make is grounded in clinical excellence.
                    </p>
                </motion.div>

                <motion.div
                    className="team-advisors-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {advisors.map((person, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            className="team-advisor-card"
                        >
                            <div className="team-advisor-top">
                                <div className="team-advisor-header">
                                    <h3 className="team-advisor-name">{person.name}</h3>
                                    <div className="team-advisor-title">{person.title}</div>
                                    <div className="team-advisor-affiliation">{person.affiliation}</div>
                                    <div className="team-advisor-role-badge">
                                        <Award size={14} />
                                        {person.role}
                                    </div>
                                </div>
                            </div>
                            <div className="team-advisor-divider" />
                            <p className="team-advisor-bio">{person.bio}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="team-cta-section container"
            >
                <div className="cta-card">
                    <Award size={48} className="text-secondary mb-4" />
                    <h2>Confidence in Every Beat</h2>
                    <p>Expert-led. Evidence-based. Designed to support your heart at every level.</p>
                    <button onClick={() => navigate('/product')} className="buy-now-btn-large cta-btn">
                        View Product
                    </button>
                </div>
            </motion.div>

            <Footer />

            <style>{`
                .team-page-root {
                    background-color: var(--color-quaternary);
                    min-height: 100vh;
                    position: relative;
                    color: white;
                    display: flex;
                    flex-direction: column;
                }

                .team-bg-pattern {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-image: url('/assets/pattern/Rhythmia_Care_Pattern_Red.svg');
                    background-repeat: repeat;
                    background-position: center center;
                    background-size: 1500px;
                    opacity: 0.1;
                    pointer-events: none;
                    z-index: 0;
                }

                .team-content-wrapper {
                    padding: 2rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 10;
                }

                /* Hero */
                .team-hero {
                    position: relative;
                    overflow: hidden;
                    padding: 10rem 2rem 6rem;
                    text-align: center;
                }

                .team-hero-glow {
                    position: absolute;
                    top: -200px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 700px;
                    height: 700px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(213, 15, 15, 0.12) 0%, transparent 70%);
                    pointer-events: none;
                }

                .team-hero-glow-2 {
                    position: absolute;
                    bottom: -100px;
                    right: -100px;
                    width: 400px;
                    height: 400px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(213, 15, 15, 0.06) 0%, transparent 70%);
                    pointer-events: none;
                }

                .team-hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 760px;
                    margin: 0 auto;
                }

                .team-hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    background: rgba(213, 15, 15, 0.15);
                    color: var(--color-secondary);
                    padding: 0.4rem 1rem;
                    border-radius: 50px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 1.5rem;
                    border: 1px solid rgba(213, 15, 15, 0.3);
                }

                .team-hero-title {
                    font-size: clamp(2.4rem, 5vw, 4rem);
                    font-weight: 700;
                    line-height: 1.05;
                    margin: 0 0 1.5rem 0;
                    color: white;
                    letter-spacing: -0.02em;
                }

                .team-hero-subtitle {
                    font-size: 1.15rem;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.6);
                    max-width: 600px;
                    margin: 0 auto;
                }

                /* Mission */
                .team-mission-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding-bottom: 2rem;
                }

                .team-mission-card {
                    padding: 3rem;
                    border-radius: 24px;
                    text-align: center;
                    background: linear-gradient(135deg, rgba(213, 15, 15, 0.08) 0%, rgba(213, 15, 15, 0.02) 100%);
                    border: 1px solid rgba(213, 15, 15, 0.15);
                    backdrop-filter: blur(8px);
                }

                .team-mission-icon {
                    color: var(--color-secondary);
                    margin-bottom: 1.25rem;
                }

                .team-mission-title {
                    font-size: 1.6rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    color: white;
                    text-transform: none;
                    letter-spacing: -0.01em;
                }

                .team-mission-text {
                    font-size: 1.05rem;
                    line-height: 1.8;
                    color: rgba(255,255,255,0.65);
                    max-width: 620px;
                    margin: 0 auto;
                }

                /* Section shared */
                .team-section-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 3rem 2rem 2rem;
                }

                .team-section-label {
                    font-size: 0.85rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: var(--color-secondary);
                    margin-bottom: 0.75rem;
                }

                .team-section-heading {
                    font-size: 2.2rem;
                    font-weight: 700;
                    margin: 0 0 0.5rem 0;
                    line-height: 1.15;
                    color: white;
                    text-transform: none;
                    letter-spacing: -0.01em;
                }

                .team-section-intro {
                    font-size: 1.05rem;
                    line-height: 1.75;
                    color: rgba(255,255,255,0.55);
                    margin: 0 0 2rem 0;
                    max-width: 600px;
                }

                /* Leadership Grid */
                .team-leadership-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                    margin-top: 1.5rem;
                }

                .team-leader-card {
                    background: linear-gradient(165deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 24px;
                    overflow: hidden;
                    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .team-leader-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 24px 48px rgba(0,0,0,0.35);
                    border-color: rgba(213, 15, 15, 0.25);
                }

                /* Photo */
                .team-leader-photo-wrapper {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 1;
                    overflow: hidden;
                }

                .team-leader-photo {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center top;
                    transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .team-leader-card:hover .team-leader-photo {
                    transform: scale(1.05);
                }

                .team-leader-photo-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 50%;
                    background: linear-gradient(to top, rgba(77, 13, 18, 0.9) 0%, transparent 100%);
                    pointer-events: none;
                }

                .team-leader-icon-badge {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    z-index: 2;
                }

                /* Info */
                .team-leader-info {
                    padding: 1.75rem;
                }

                .team-leader-name {
                    font-size: 1.4rem;
                    font-weight: 700;
                    margin: 0 0 0.35rem 0;
                    color: white;
                    text-transform: none;
                    letter-spacing: 0;
                }

                .team-leader-title {
                    font-size: 0.85rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    margin-bottom: 0.3rem;
                }

                .team-leader-credential {
                    font-size: 0.82rem;
                    color: rgba(255,255,255,0.45);
                    margin-bottom: 0.75rem;
                }

                .team-leader-divider {
                    height: 2px;
                    width: 40px;
                    border-radius: 2px;
                    margin-bottom: 1rem;
                }

                .team-leader-bio {
                    font-size: 0.92rem;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.6);
                    margin: 0;
                }

                /* Advisors */
                .team-advisors-section {
                    padding-top: 4rem;
                }

                .team-advisors-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                    margin-top: 1rem;
                }

                .team-advisor-card {
                    background: linear-gradient(165deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 24px;
                    padding: 2rem;
                    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .team-advisor-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    border-color: rgba(213, 15, 15, 0.2);
                }

                .team-advisor-top {
                    display: flex;
                    gap: 1.5rem;
                    align-items: flex-start;
                }

                .team-advisor-header {
                    flex: 1;
                }

                .team-advisor-name {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin: 0 0 0.3rem 0;
                    color: white;
                    text-transform: none;
                    letter-spacing: 0;
                    line-height: 1.2;
                }

                .team-advisor-title {
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.7);
                    font-weight: 500;
                    margin-bottom: 0.2rem;
                }

                .team-advisor-affiliation {
                    font-size: 0.78rem;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 0.6rem;
                    line-height: 1.4;
                }

                .team-advisor-role-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    font-size: 0.72rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--color-secondary);
                    background: rgba(213, 15, 15, 0.1);
                    border: 1px solid rgba(213, 15, 15, 0.2);
                    padding: 0.3rem 0.75rem;
                    border-radius: 50px;
                }

                .team-advisor-divider {
                    height: 1px;
                    background: rgba(255,255,255,0.06);
                    margin: 1.25rem 0;
                }

                .team-advisor-bio {
                    font-size: 0.92rem;
                    line-height: 1.75;
                    color: rgba(255,255,255,0.55);
                    margin: 0;
                }

                /* CTA */
                .team-cta-section {
                    padding: 3rem 2rem 2rem;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .cta-card {
                    text-align: center;
                    padding: 3.5rem 2.5rem;
                    border-radius: 24px;
                    background: linear-gradient(145deg, rgba(213, 15, 15, 0.08) 0%, rgba(213, 15, 15, 0.02) 100%);
                    border: 1px solid rgba(213, 15, 15, 0.18);
                }

                .cta-card h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    color: white;
                    text-transform: none;
                    letter-spacing: -0.01em;
                }

                .cta-card p {
                    font-size: 1.1rem;
                    color: rgba(255,255,255,0.6);
                    margin-bottom: 2rem;
                    max-width: 450px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background-color: var(--color-secondary);
                    color: white;
                    border: none;
                    padding: 1rem 2.5rem;
                    border-radius: 50px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: var(--font-main);
                    letter-spacing: 0.02em;
                }

                .cta-btn:hover {
                    background-color: #ff1f1f;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(213, 15, 15, 0.3);
                }

                .mb-4 {
                    margin-bottom: 1rem;
                }

                /* Responsive */
                @media (max-width: 1000px) {
                    .team-leadership-grid {
                        grid-template-columns: 1fr;
                        max-width: 480px;
                        margin-left: auto;
                        margin-right: auto;
                        margin-top: 1.5rem;
                    }

                    .team-advisors-grid {
                        grid-template-columns: 1fr;
                        max-width: 560px;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .team-hero-title {
                        font-size: clamp(2rem, 8vw, 3rem);
                    }

                    .team-section-heading {
                        font-size: 1.8rem;
                    }
                }

                @media (max-width: 600px) {
                    .team-hero {
                        padding: 8rem 1.5rem 4rem;
                    }

                    .team-mission-card {
                        padding: 2rem 1.5rem;
                    }

                    .team-advisor-top {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }

                    .team-advisor-role-badge {
                        margin: 0 auto;
                    }

                    .team-advisor-bio {
                        text-align: center;
                    }

                    .team-leader-info {
                        text-align: center;
                    }

                    .team-leader-divider {
                        margin-left: auto;
                        margin-right: auto;
                    }
                }
            `}</style>
        </div>
    );
}
