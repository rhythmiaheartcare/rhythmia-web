import React from 'react';
import './Booklet.css';

export const defaultBookletData = {
    backCover: {
        developedBy: "Developed by cardiologists and made in the UK to the highest standards.",
        evidenceTitle: "Key Evidence",
        evidenceIntro: "Each ingredient in Rhythmia was selected based on peer-reviewed research published in journals including the Journal of the American College of Cardiology and Circulation.",
        ingredients: [
            { name: "Magnesium", role: "Supports electrical signaling", research: "Lower magnesium status associated with increased cardiovascular concerns in the Framingham Heart Study²" },
            { name: "CoQ10", role: "Supports cellular energy production", research: "The Q-SYMBIO trial found CoQ10 supplementation supported cardiovascular outcomes in those with existing heart concerns³" },
            { name: "Taurine", role: "Supports cell membrane stability", research: "Meta-analysis of 20 trials found taurine supplementation associated with healthy blood pressure already in normal range⁴" },
            { name: "Thiamine (B1)", role: "Supports cardiac energy metabolism", research: "Thiamine is essential for ATP production in heart muscle cells⁵" },
            { name: "Zinc", role: "Supports ion channel function", research: "Zinc helps regulate calcium channels involved in heart rhythm⁶" },
            { name: "Vitamin B12", role: "Supports autonomic nerve function", research: "B12 status is associated with healthy heart rate variability⁷" }
        ],
        references: [
            "¹ Rosanoff A, et al. Nutr Rev. 2012;70(3):153-164.",
            "² Khan AM, et al. Circulation. 2013;127(1):33-38.",
            "³ Mortensen SA, et al. JACC Heart Fail. 2014;2(6):641-649.",
            "⁴ Tzang CC, et al. Nutrition Journal. 2024;23(1):93.",
            "⁵ DiNicolantonio JJ, et al. Ochsner J. 2013;13(4):495-499.",
            "⁶ Kokhabi P, et al. Curr Cardiol Rev. 2025;21(2).",
            "⁷ Aytemir K, et al. Pacing Clin Electrophysiol. 2000;23(6):975-978."
        ],
        disclaimer: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before starting any supplement, especially if you have a medical condition or take medications.",
        contactEmail: "info@rhythmiaheartcare.com",
        contactWeb: "www.rhythmiaheartcare.com",
        contactSocial: "@rhythmiaheartcare"
    },
    frontCover: {
        title: "Empowering Your\nHeart Health",
        subtitle: "Scientifically-formulated support for your heart's natural electrical rhythm and muscle function.",
        badge: "Cardiologist-led heart care"
    },
    insideLeft: {
        title: "WHY RHYTHMIA HEART CARE",
        intro: "Rhythmia Heart Care is an evidence-based formulation designed to support the electrical conduction system and muscle function of your heart.",
        scienceTitle: "The Science Behind Our Formula:",
        scienceText: "Your heart beats 100,000 times a day! It's your hardest-working muscle. Each beat requires precise electrical signals, cellular energy for contraction, membrane stability, and healthy nerve function to regulate rhythm. Rhythmia supports every aspect.",
        natureImageText: "Trusted by experts for cardiac stability"
    },
    insideRight: {
        keyBenefitsTitle: "Key Benefits",
        benefits: [
            { title: "Maximum Absorption & Regulation¹ ²", text: "Magnesium Bisglycinate Chelate for optimal bioavailability." },
            { title: "Stabilises Heart Cells⁴", text: "L-Taurine stabilises cell membranes in the heart." },
            { title: "Fuels Cardiac Contraction³", text: "Coenzyme Q10 powers the mitochondria (energy centre) of the heart." },
            { title: "Regulates Nervous System⁵ ⁶ ⁷", text: "Vitamin B Complex + Zinc helps regulate the nervous system to maintain a steady heart rhythm." }
        ]
    }
};

export default function BookletTemplate({ data = defaultBookletData }) {
    const d = data; // shorthand

    return (
        <div className="booklet-root">
            {/* SHEET 1: OUTER SIDE (Back Cover + Front Cover) */}
            <div className="sheet">
                {/* LEFT COLUMN: Back Cover (Page 4) */}
                <div className="page-slot left back-cover">
                    <div className="bg-pattern"></div>

                    <header>
                        <img src="/assets/logo/Rhythmia_Care_Logo_Wordmark_White_RGB.svg" alt="Rhythmia Heart Care"
                            className="logo-small" />
                        <div style={{ marginTop: '1rem' }}>
                            <p>{d.backCover.developedBy}</p>
                        </div>
                    </header>

                    {/* KEY EVIDENCE SECTION */}
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginTop: '0.5rem' }}>
                        <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{d.backCover.evidenceTitle}</h2>
                        <p style={{ fontSize: '0.75rem', marginBottom: '0.8rem', lineHeight: 1.3 }}
                            dangerouslySetInnerHTML={{ __html: d.backCover.evidenceIntro.replace('Journal of the American College of Cardiology', '<em>Journal of the American College of Cardiology</em>').replace('Circulation', '<em>Circulation</em>') }}>
                        </p>

                        <table className="evidence-table">
                            <thead>
                                <tr>
                                    <th width="20%">Ingredient</th>
                                    <th width="25%">Role</th>
                                    <th width="55%">What the Research Shows</th>
                                </tr>
                            </thead>
                            <tbody>
                                {d.backCover.ingredients.map((ing, idx) => (
                                    <tr key={idx}>
                                        <td>{ing.name}</td>
                                        <td>{ing.role}</td>
                                        <td>{ing.research}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="ref-list" style={{ columnCount: 2, columnGap: '1rem', marginTop: '0.2rem' }}>
                            {d.backCover.references.map((ref, idx) => (
                                <div key={idx} style={{ breakInside: 'avoid', marginBottom: '0.1rem' }}>
                                    {ref}
                                </div>
                            ))}
                        </div>

                        <div className="disclaimer-text">
                            {d.backCover.disclaimer}
                        </div>
                    </div>

                    <footer className="contact-section"
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <h3>Get in Touch</h3>
                            <div className="contact-detail">
                                <svg className="contact-icon" viewBox="0 0 24 24">
                                    <path
                                        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                <span>{d.backCover.contactEmail}</span>
                            </div>
                            <div className="contact-detail">
                                <svg className="contact-icon" viewBox="0 0 24 24">
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                </svg>
                                <span>{d.backCover.contactWeb}</span>
                            </div>
                            <div className="contact-detail">
                                <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,6.8A5.2,5.2 0 0,1 17.2,12A5.2,5.2 0 0,1 12,17.2A5.2,5.2 0 0,1 6.8,12A5.2,5.2 0 0,1 12,6.8M12,8.8A3.2,3.2 0 0,0 8.8,12A3.2,3.2 0 0,0 12,15.2A3.2,3.2 0 0,0 15.2,12A3.2,3.2 0 0,0 12,8.8M18,5A1,1 0 0,1 19,6A1,1 0 0,1 18,7A1,1 0 0,1 17,6A1,1 0 0,1 18,5Z" />
                                </svg>
                                <span>{d.backCover.contactSocial}</span>
                            </div>
                        </div>
                        {/* QR Code in bottom right with Logo Overlay */}
                        <div style={{ marginBottom: '0.5rem', position: 'relative', width: '100px', height: '100px' }}>
                            <img src="/assets/qr_code.svg" alt="Scan to Visit" style={{ width: '100%', height: '100%', display: 'block' }} />
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '25px', height: '25px', backgroundColor: '#00000000', padding: '2px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="/assets/logo/Rhythmia_Care_Logo_Heart_Red_RGB.svg" alt="Logo" style={{ width: '100%', height: 'auto' }} />
                            </div>
                        </div>
                    </footer>
                </div>

                {/* RIGHT COLUMN: Front Cover (Page 1) */}
                <div className="page-slot right front-cover">
                    <div className="bg-pattern"></div>

                    <div className="front-visual">
                        <div className="glow-effect"></div>
                        {/* Middle Logo: Wordmark with Red Heart and White Text (Larger) */}
                        <img src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_White_Copy_RGB.svg" alt="Rhythmia Wordmark"
                            className="heart-logo-large" style={{ width: '420px', maxWidth: '95%' }} />
                    </div>

                    <div>
                        <h1 style={{ color: 'white', textTransform: 'uppercase', fontSize: '1.8rem' }} dangerouslySetInnerHTML={{ __html: d.frontCover.title.replace('\n', '<br/>') }}>
                        </h1>
                        <p style={{ fontSize: '1rem', letterSpacing: '0.05em', opacity: 0.9, maxWidth: '80%', margin: '0 auto' }}>
                            {d.frontCover.subtitle}</p>
                        <div
                            style={{ marginTop: '1.5rem', display: 'inline-block', border: '1px solid var(--color-secondary)', padding: '0.5rem 1rem', borderRadius: '50px', color: 'var(--color-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {d.frontCover.badge}
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', width: '100%' }}>
                        {/* Small photo strip or accent could go here */}
                    </div>
                </div>
            </div>

            {/* SHEET 2: INNER SIDE (Inside Left + Inside Right) */}
            <div className="sheet">
                {/* LEFT COLUMN: Inside Left (Page 2) */}
                <div className="page-slot left inside-left">
                    <div className="bg-pattern" style={{ zIndex: 0 }}></div>
                    {/* Full width photo at top */}
                    <img src="/assets/photos/young-lifestyle-active.png" alt="Active Lifestyle" className="photo-upper"
                        style={{ position: 'relative', zIndex: 1 }} />

                    <div className="inside-content-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                        <h2>{d.insideLeft.title}</h2>
                        <div className="text-body">
                            <p style={{ fontSize: '0.85rem', marginBottom: '0.8rem' }}>
                                {d.insideLeft.intro}
                            </p>

                            <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '0.95rem', marginTop: '1.5rem' }}>
                                {d.insideLeft.scienceTitle}
                            </h3>
                            <p style={{ fontSize: '0.9rem', marginBottom: 0, lineHeight: 1.5 }}>
                                {d.insideLeft.scienceText}
                            </p>
                        </div>

                        {/* Re-integrated Nature Image (Pushed to bottom) */}
                        <div
                            style={{ marginTop: 'auto', height: '125px', width: '100%', borderRadius: '8px', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                            <img src="/assets/photos/getty-images-3UDtdrn3qsQ-unsplash.jpg" alt="Natural Balance"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, objectPosition: 'center 35%' }} />
                            {/* Gradient Overlay (Bottom-Up Dark) */}
                            <div
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(26,5,7,0.95) 0%, transparent 100%)' }}>
                            </div>
                            {/* Text Overlay (Centered) */}
                            <div style={{ position: 'absolute', bottom: '12px', left: '15px', right: '15px', textAlign: 'center' }}>
                                <p
                                    style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.95)', fontWeight: 500, letterSpacing: '0.02em', marginBottom: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                    {d.insideLeft.natureImageText}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Inside Right (Page 3) */}
                <div className="page-slot right inside-right">
                    <div className="bg-pattern"></div>

                    {/* Lab Researcher Photo (Incorporated nicely) */}
                    <div
                        style={{ width: '100%', height: '180px', overflow: 'hidden', marginBottom: '2rem', borderRadius: '8px', position: 'relative' }}>
                        <img src="/assets/photos/young-lab-researcher.png" alt="Research"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                    </div>

                    <h2>{d.insideRight.keyBenefitsTitle}</h2>

                    <div className="benefits-grid">
                        {d.insideRight.benefits.map((benefit, idx) => (
                            <div className="benefit-item" key={idx}>
                                <svg className="check-icon" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                <div className="benefit-text">
                                    <h4>{benefit.title}</h4>
                                    <p>{benefit.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="trust-badges" style={{ justifyContent: 'center', gap: '20px' }}>
                        <div className="badge">
                            <svg className="badge-icon" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Clinically<br />Formulated</span>
                        </div>
                        <div className="badge">
                            <svg className="badge-icon" viewBox="0 0 446 374" style={{ fill: 'var(--color-secondary)', stroke: 'none' }}>
                                <g transform="translate(0,374) scale(0.05,-0.05)">
                                    <path
                                        d="M8130 7112 c-1743 -767 -3083 -2094 -3537 -3505 -235 -730 -293 -1650 -150 -2385 l21 -108 254 498 c475 928 956 1671 1523 2346 188 225 419 465 419 437 0 -57 -328 -719 -834 -1685 -416 -791 -802 -1615 -1048 -2236 l-39 -96 96 55 c2319 1347 3333 2965 3555 5677 38 458 41 1110 5 1109 -14 0 -133 -48 -265 -107z" />
                                    <path
                                        d="M860 5307 c3 -1454 561 -2765 1520 -3576 405 -342 1433 -1025 1476 -981 31 30 -485 963 -956 1730 -379 618 -607 1019 -589 1038 16 16 508 -491 706 -728 329 -394 636 -821 899 -1252 37 -59 61 -85 53 -58 -30 115 -33 1047 -3 1270 l30 220 -52 130 c-302 762 -1070 1490 -2129 2017 -321 160 -736 333 -900 374 l-55 13 0 -197z" />
                                </g>
                            </svg>
                            <span>100%<br />Vegan</span>
                        </div>
                        <div className="badge">
                            <svg className="badge-icon" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>GMP<br />Certified</span>
                        </div>
                        <div className="badge">
                            <svg className="badge-icon" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14l-4-4 1.41-1.41L11 13.17l6.59-6.59L19 8l-8 8z" />
                            </svg>
                            <span>Made in<br />UK</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
