import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, CheckCircle2, FlaskConical, ShieldCheck, Leaf, Factory, Droplets, MapPin, Award, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const ClinicallyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const VeganIcon = () => (
    <svg viewBox="0 0 446 374" style={{ fill: 'currentColor', stroke: 'none' }}>
        <g transform="translate(0,374) scale(0.05,-0.05)">
            <path d="M8130 7112 c-1743 -767 -3083 -2094 -3537 -3505 -235 -730 -293 -1650 -150 -2385 l21 -108 254 498 c475 928 956 1671 1523 2346 188 225 419 465 419 437 0 -57 -328 -719 -834 -1685 -416 -791 -802 -1615 -1048 -2236 l-39 -96 96 55 c2319 1347 3333 2965 3555 5677 38 458 41 1110 5 1109 -14 0 -133 -48 -265 -107z" />
            <path d="M860 5307 c3 -1454 561 -2765 1520 -3576 405 -342 1433 -1025 1476 -981 31 30 -485 963 -956 1730 -379 618 -607 1019 -589 1038 16 16 508 -491 706 -728 329 -394 636 -821 899 -1252 37 -59 61 -85 53 -58 -30 115 -33 1047 -3 1270 l30 220 -52 130 c-302 762 -1070 1490 -2129 2017 -321 160 -736 333 -900 374 l-55 13 0 -197z" />
        </g>
    </svg>
);

const GMPIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const UKMapIcon = () => (
    <svg viewBox="0 0 496 355" style={{ fill: 'currentColor', stroke: 'none' }}>
        <g transform="translate(0,355) scale(0.05,-0.05)">
            <path d="M1190 6404 c55 -31 280 -160 500 -287 220 -127 679 -391 1020 -587 341 -196 829 -476 1084 -623 256 -147 470 -267 475 -267 6 0 11 410 11 910 l0 910 -1595 0 -1595 -1 100 -55z" />
            <path d="M4800 5190 l0 -1270 -2050 0 -2050 0 0 -380 0 -380 2050 0 2050 0 5 -1275 5 -1275 370 0 370 0 5 1275 5 1275 2050 0 2050 0 0 380 0 380 -2050 0 -2050 0 0 1270 0 1270 -380 0 -380 0 0 -1270z" />
            <path d="M6080 5550 c0 -500 5 -910 11 -910 6 0 381 213 835 473 453 260 1148 659 1544 887 396 227 738 423 760 436 30 17 -346 23 -1555 23 l-1595 1 0 -910z" />
            <path d="M700 5262 l0 -822 1410 0 c776 0 1410 4 1410 9 0 13 -128 87 -1930 1120 -418 239 -789 453 -825 475 l-65 39 0 -821z" />
            <path d="M9390 5926 c-242 -141 -669 -387 -1990 -1145 -291 -167 -539 -312 -549 -322 -12 -12 526 -19 1395 -19 l1414 0 0 820 c0 451 -2 820 -5 819 -3 -1 -122 -69 -265 -153z" />
            <path d="M700 1820 c0 -451 4 -820 8 -820 5 0 241 134 525 297 763 439 1678 965 2002 1150 156 90 285 170 285 178 0 8 -634 15 -1410 15 l-1410 0 0 -820z" />
            <path d="M6840 2625 c1 -8 228 -145 505 -304 629 -359 1316 -754 1872 -1075 235 -135 430 -246 435 -246 4 0 8 369 8 820 l0 820 -1410 0 c-775 0 -1410 -7 -1410 -15z" />
            <path d="M6085 1526 l5 -916 1575 -5 c866 -3 1575 2 1575 10 0 8 -66 52 -145 98 -80 45 -442 253 -805 462 -532 305 -2133 1224 -2195 1259 -9 5 -13 -404 -10 -908z" />
            <path d="M3470 1979 c-418 -241 -1117 -643 -1554 -893 -437 -251 -787 -463 -779 -471 8 -8 717 -13 1574 -10 l1559 5 5 905 c4 718 0 905 -20 904 -14 -1 -367 -199 -785 -440z" />
        </g>
    </svg>
);

const BunnyIcon = () => (
    <svg viewBox="0 0 600 600" style={{ fill: 'currentColor', stroke: 'none' }}>
        <g transform="translate(0,600) scale(0.1,-0.1)">
            <path d="M2183 5829 c-70 -34 -105 -72 -134 -149 -35 -92 -19 -221 38 -298 28 -38 28 -38 -77 -46 -167 -13 -282 -71 -336 -168 -24 -44 -29 -64 -28 -118 2 -177 116 -318 340 -420 112 -51 127 -57 161 -64 18 -4 35 -12 38 -17 4 -5 15 -9 25 -9 11 0 34 -6 52 -14 18 -8 80 -29 138 -46 58 -18 114 -36 125 -40 11 -5 49 -18 85 -30 36 -12 74 -26 85 -31 11 -5 45 -18 75 -29 75 -28 69 -26 290 -134 107 -53 205 -104 218 -114 l24 -18 -25 -62 c-51 -125 -123 -195 -231 -227 -69 -19 -294 -23 -424 -6 -245 31 -572 18 -737 -30 -148 -43 -245 -86 -405 -183 -144 -87 -208 -135 -328 -250 -327 -313 -524 -762 -548 -1248 l-7 -137 -32 -15 c-18 -9 -43 -16 -55 -16 -11 0 -49 -14 -83 -31 -281 -139 -392 -431 -265 -694 36 -73 46 -87 95 -138 181 -187 411 -218 692 -95 26 12 47 16 52 11 10 -10 -7 -97 -36 -193 -25 -81 -30 -216 -11 -262 32 -75 103 -137 196 -170 116 -42 207 -50 492 -45 150 3 354 10 453 17 195 13 926 7 1245 -10 269 -15 598 -12 738 5 129 16 187 34 238 72 31 23 31 23 49 3 23 -25 88 -56 145 -69 55 -13 483 -14 681 -1 201 12 284 43 326 123 37 70 8 248 -56 349 -91 143 -199 196 -534 264 -89 18 -89 18 -107 58 -10 23 -25 66 -33 96 -40 144 -47 169 -62 230 -9 36 -22 88 -30 115 -7 28 -21 77 -30 110 -8 33 -20 74 -25 90 -17 56 -40 180 -40 217 0 77 32 164 99 268 20 30 41 64 47 75 112 201 141 308 131 475 l-6 99 32 5 c18 3 70 10 117 16 154 21 313 59 368 90 9 5 42 20 73 34 146 64 241 154 286 271 24 64 27 82 26 200 -1 140 -16 219 -69 352 -133 336 -415 686 -686 851 -155 95 -281 143 -448 173 -130 23 -243 24 -381 3 l-107 -16 -128 129 c-262 262 -584 491 -937 665 -78 38 -151 74 -161 80 -11 6 -31 14 -45 18 -14 5 -51 18 -81 30 -134 52 -271 80 -390 80 -85 0 -102 -4 -157 -31z m269 -214 c96 -24 169 -45 213 -62 199 -78 475 -226 649 -348 34 -23 95 -65 136 -93 41 -28 84 -59 95 -69 11 -10 49 -43 85 -73 117 -100 190 -173 190 -190 0 -11 -24 -32 -61 -54 -33 -20 -63 -36 -66 -36 -5 0 -25 14 -156 103 -37 26 -69 47 -72 47 -2 0 -24 13 -47 29 -204 138 -384 234 -568 306 -95 37 -333 160 -417 215 -86 56 -123 89 -156 140 -22 32 -21 42 4 74 25 31 73 34 171 11z m-147 -531 c238 -47 366 -91 589 -204 316 -159 340 -172 475 -260 100 -65 131 -90 131 -106 0 -12 -16 -46 -36 -75 -20 -30 -43 -69 -50 -86 -8 -18 -20 -33 -27 -33 -6 0 -37 14 -67 30 -133 72 -443 220 -460 220 -5 0 -24 6 -42 14 -18 8 -51 21 -73 29 -22 8 -58 22 -80 30 -22 8 -107 36 -190 62 -383 120 -516 185 -576 281 -31 51 -23 74 36 95 67 23 259 25 370 3z m2237 -450 c51 -8 97 -20 103 -25 5 -5 16 -9 25 -9 21 0 167 -63 183 -79 6 -6 15 -11 20 -11 29 0 227 -172 315 -274 216 -251 343 -527 346 -751 1 -98 -10 -129 -61 -177 -67 -64 -248 -129 -458 -165 -143 -24 -511 -24 -650 1 -111 20 -204 41 -250 58 -234 85 -415 240 -511 435 -47 97 -58 150 -58 283 -1 118 12 186 49 264 14 29 25 56 25 60 0 15 70 114 111 157 190 196 502 286 811 233z m-1188 -985 c11 -55 85 -196 147 -279 53 -71 184 -210 200 -210 3 0 30 -18 60 -41 64 -48 241 -137 319 -161 145 -44 263 -65 439 -76 l104 -7 13 -35 c19 -53 17 -187 -4 -246 -16 -47 -90 -181 -117 -214 -7 -8 -29 -47 -49 -87 -104 -204 -115 -375 -43 -648 19 -71 53 -201 75 -287 98 -375 111 -409 177 -465 49 -40 108 -66 176 -77 114 -17 269 -55 317 -78 61 -28 104 -90 100 -143 l-3 -40 -60 -6 c-33 -4 -182 -10 -330 -14 -312 -9 -331 -6 -371 56 -13 22 -27 53 -31 69 -3 17 -10 33 -14 36 -5 3 -9 12 -9 20 0 8 -9 36 -21 62 -74 170 -116 232 -268 397 -21 22 -52 63 -71 90 -19 28 -36 52 -39 55 -18 16 -237 371 -302 489 -11 20 -28 50 -39 66 -11 17 -23 37 -27 45 -4 8 -19 33 -33 55 -14 22 -35 60 -45 85 -10 25 -25 52 -32 61 -7 8 -13 20 -13 26 0 20 -144 160 -200 195 -89 55 -215 111 -290 128 -19 4 -55 12 -80 18 -84 21 -183 33 -299 38 -102 5 -120 3 -151 -14 -70 -39 -77 -148 -12 -197 22 -16 50 -21 157 -27 387 -20 613 -126 709 -333 21 -47 31 -150 22 -228 -10 -77 -89 -207 -184 -303 -41 -41 -78 -74 -82 -74 -5 0 -15 -6 -22 -12 -44 -40 -198 -112 -323 -151 -69 -21 -229 -58 -320 -73 -85 -14 -126 -75 -105 -153 6 -25 22 -48 40 -61 27 -19 46 -21 262 -25 244 -5 511 -20 663 -36 215 -23 262 -29 295 -39 19 -5 47 -10 61 -10 25 0 51 -7 189 -47 79 -24 170 -68 203 -99 21 -20 27 -33 25 -57 -3 -27 -8 -32 -43 -41 -58 -14 -639 -13 -1175 3 -381 11 -512 11 -725 1 -450 -22 -784 -24 -868 -5 -137 30 -148 43 -123 128 67 219 79 294 72 453 -6 141 -19 187 -55 199 -10 3 -30 16 -45 30 -46 42 -90 72 -166 113 -74 40 -75 41 -91 98 -46 158 -52 204 -52 419 0 213 4 253 49 435 35 141 134 371 200 465 15 22 43 63 62 90 117 174 337 356 561 466 47 23 94 46 105 51 21 11 101 33 196 55 94 21 323 27 475 13 72 -7 211 -15 310 -17 238 -7 339 15 467 101 29 20 58 36 64 36 6 0 14 -14 18 -31z m-2726 -1984 c7 -14 12 -36 12 -49 0 -25 21 -101 49 -175 19 -51 101 -137 157 -166 44 -22 74 -44 74 -56 0 -10 -110 -63 -175 -85 -27 -9 -77 -16 -112 -16 -149 1 -283 139 -283 291 0 122 70 219 195 268 49 19 71 16 83 -12z m3079 -250 c86 -141 186 -293 211 -321 46 -50 92 -112 92 -124 0 -13 -49 -8 -100 10 -24 8 -189 37 -335 59 -38 6 -126 15 -195 21 -69 6 -140 13 -158 16 -33 6 -54 25 -35 31 5 2 43 26 84 53 129 86 255 222 308 333 15 32 29 47 39 45 9 -2 49 -57 89 -123z" />
            <path d="M4688 3930 c-123 -66 -128 -229 -9 -305 86 -54 204 -19 248 74 71 149 -93 308 -239 231z" />
        </g>
    </svg>
);

export default function ManufacturingPage() {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();

    // Parallax effect for header
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);

    const timelineSteps = [
        {
            id: 1,
            title: "Expert UK Manufacturing",
            subtitle: "Over 20 Years of Experience",
            description: "Partnering with Arena Health, a leading UK manufacturer with over two decades of expertise in the food supplements industry. Based in Ashford, Kent, our state-of-the-art facilities ensure every batch of Rhythmia Heart Care meets the highest standards of quality and efficacy.",
            icon: <Factory size={32} />,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
            features: [
                "Based in Ashford, Kent, UK",
                "Over 20 years industry experience",
                "Integrated contract manufacturing"
            ]
        },
        {
            id: 2,
            title: "Bespoke Formulation",
            subtitle: "Precision & Purity",
            description: "Specialising in high-quality powders and two-piece hard capsules. Our custom formulations are developed to exact specifications, ensuring the perfect balance of vitamins, minerals, and nutraceuticals required for optimal heart health support.",
            icon: <FlaskConical size={32} />,
            image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&q=80&w=1000",
            features: [
                "Specialist encapsulation",
                "Custom formulation development",
                "Premium raw ingredients"
            ]
        },
        {
            id: 3,
            title: "Rigorous Quality Control",
            subtitle: "SALSA Certified (13796)",
            description: "Our cleanrooms and warehousing operate under strict SALSA certification. Every single product undergoes rigorous testing and stringent quality control checks from raw material to finished capsule, ensuring absolute safety and consistent excellence.",
            icon: <ShieldCheck size={32} />,
            image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000",
            features: [
                "SALSA Certified facilities",
                "Stringent QA protocols",
                "Batch tested for safety"
            ]
        },
        {
            id: 4,
            title: "Sustainable & Ethical",
            subtitle: "Soil Association Organic Certified",
            description: "We believe in manufacturing that respects both the body and the planet. Our facilities are certified by the Soil Association (DA30761), proving our manufacturing process from start to finish meets the highest organic and sustainable standards.",
            icon: <Leaf size={32} />,
            image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1000",
            features: [
                "Soil Association Certified",
                "Ethically sourced materials",
                "Vegan-friendly capsules"
            ]
        }
    ];

    const certifications = [
        { title: "GMP Standards", desc: "Manufactured to Good Manufacturing Practice standards" },
        { title: "SALSA Certified", desc: "Independently audited food safety certification for our cleanrooms and warehouse" },
        { title: "Food Hygiene Rating 5", desc: "The highest rating possible, awarded by local authority inspection" },
        { title: "BCMPA Member", desc: "Member of the UK trade association for contract manufacturers and packers" },
        { title: "Soil Association Organic Certified", desc: "Facility certified for organic manufacturing from start to finish" },
    ];

    const qualitySteps = [
        {
            title: "Ingredient Sourcing",
            desc: "Every supplier undergoes a rigorous approval process including auditing of recall and traceability systems. All raw materials must arrive with an approved Certificate of Analysis before being accepted.",
        },
        {
            title: "Pre-Release Testing",
            desc: "All ingredients are tested for microbiology, heavy metals, and contaminants before being cleared for production. Nothing enters our cleanrooms without passing these checks.",
        },
        {
            title: "Manufacturing",
            desc: "Capsules are produced in certified cleanrooms and weighed regularly throughout production to ensure a consistent, accurate dose in every capsule. All equipment and rooms are cleaned with food-grade products between every batch.",
        },
        {
            title: "Batch Testing",
            desc: "Every batch is metal tested before being packaged and dispatched. Additional accredited laboratory testing is available for microbiological count, allergens, vitamins, minerals, and more.",
        },
        {
            title: "Ongoing Facility Checks",
            desc: "The facility undergoes quarterly microbiological testing to verify cleaning procedures and water quality. Staff complete refresher hygiene training every six months.",
        },
    ];

    const bottomBadgesList = [
        { label: "Clinically Formulated", sub: "Developed by experts", icon: <ClinicallyIcon /> },
        { label: "100% Vegan", sub: "Plant-based capsules", icon: <VeganIcon /> },
        { label: "GMP Certified", sub: "Independently verified", icon: <GMPIcon /> },
        { label: "Made in UK", sub: "Kent, England", icon: <UKMapIcon /> },
        { label: "No Animal Testing", sub: "Cruelty free", icon: <BunnyIcon /> },
    ];

    return (
        <div className="manufacturing-page-root">
            {/* Global Page Pattern */}
            <div className="manufacturing-bg-pattern"></div>

            <div className="manufacturing-content-wrapper">
                <BackButton className="back-link" />
            </div>

            {/* Header / Hero */}
            <div className="manufacturing-hero">
                <motion.div style={{ y: yHero }} className="manufacturing-hero-bg">
                    {/* Dark gradient overlay */}
                    <div className="hero-overlay"></div>
                    <img
                        src="https://images.unsplash.com/photo-1581090464731-31f0e4284b23?auto=format&fit=crop&q=80&w=1920"
                        alt="Manufacturing Facility"
                        className="hero-image"
                    />
                </motion.div>

                <div className="manufacturing-hero-content container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hero-text-container"
                    >
                        <div className="badge">
                            <MapPin size={16} /> UK Manufactured
                        </div>
                        <h1 className="hero-title">Crafted with<br /><span className="text-secondary">Precision</span> & <span className="text-secondary">Purity</span></h1>
                        <p className="hero-subtitle">
                            Discover the state-of-the-art manufacturing behind Rhythmia Heart Care.
                            Partnered with industry leaders to bring you unparalleled quality.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* UK Badge Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="container uk-badge-container"
            >
                <div className="uk-badge-card">
                    <div className="uk-badge-emoji">🇬🇧</div>
                    <div className="uk-badge-title">Proudly Made in the United Kingdom</div>
                    <p className="uk-badge-text">
                        Every bottle of Rhythmia Heart Care is manufactured, tested, and packaged in the UK — from raw ingredient to finished product.
                    </p>
                </div>
            </motion.div>


            {/* Timeline Section */}
            <div className="timeline-section container">
                <div className="timeline-line"></div>

                {timelineSteps.map((step, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        key={step.id}
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                    >
                        {/* Timeline Center Node */}
                        <div className="timeline-node">
                            <div className="node-icon">{step.icon}</div>
                        </div>

                        {/* Floating Subtitle (Alternating Side) */}
                        <div className="timeline-floating-subtitle">
                            <div className="floating-line"></div>
                            <h3 className="floating-text">{step.subtitle}</h3>
                        </div>

                        {/* Content Card */}
                        <div className="timeline-content">
                            <div className="content-image-wrapper">
                                <img src={step.image} alt={step.title} className="content-image" />
                                <div className="image-overlay"></div>
                            </div>

                            <div className="content-text-wrapper">
                                <h2 className="step-title">{step.title}</h2>
                                <p className="step-description">{step.description}</p>

                                <ul className="step-features">
                                    {step.features.map((feature, i) => (
                                        <li key={i}>
                                            <CheckCircle2 size={16} className="feature-icon" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quality Process */}
            <div className="container quality-process-container">
                <div className="section-header">
                    <h2 className="section-subtitle">Quality Process</h2>
                    <h3 className="section-title">From Raw Ingredient to Finished Capsule</h3>
                </div>

                <div className="quality-steps-list">
                    {qualitySteps.map((step, i) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            key={i}
                            className="quality-step-item"
                        >
                            <div className="step-number-container">
                                <div className="step-number">{i + 1}</div>
                                {i < qualitySteps.length - 1 && <div className="step-line" />}
                            </div>
                            <div className="step-content">
                                <div className="step-content-title">{step.title}</div>
                                <p className="step-content-desc">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Certifications */}
            <div className="container certifications-container">
                <div className="section-header">
                    <h2 className="section-subtitle">Certifications</h2>
                    <h3 className="section-title">Independently Verified Standards</h3>
                </div>

                <div className="certifications-grid">
                    {certifications.map((cert, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            key={i}
                            className="cert-card"
                        >
                            <div className="cert-icon-wrapper">
                                <CheckCircle2 size={24} className="cert-icon" />
                            </div>
                            <div className="cert-details">
                                <div className="cert-title">{cert.title}</div>
                                <div className="cert-desc">{cert.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Badges */}
            <div className="container bottom-badges-container">
                <div className="bottom-badges-grid">
                    {bottomBadgesList.map((item, i) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            key={i}
                            className="bottom-badge-card"
                        >
                            <div className="bottom-badge-icon-wrapper">
                                {item.icon}
                            </div>
                            <div className="bottom-badge-label">{item.label}</div>
                            <div className="bottom-badge-sub">{item.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA / Guarantee section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="manufacturing-footer-cta container"
            >
                <div className="cta-card">
                    <Award size={48} className="text-secondary mb-4" />
                    <h2>Uncompromising Quality</h2>
                    <p>Every capsule of Rhythmia Heart Care is a testament to our commitment to your cardiovascular health. Manufactured in the UK to the highest possible standards.</p>
                    <button onClick={() => navigate('/product')} className="buy-now-btn-large cta-btn">
                        View Product
                    </button>
                </div>
            </motion.div>

            <Footer />

            <style>{`
                .manufacturing-page-root {
                    background-color: var(--color-quaternary);
                    min-height: 100vh;
                    position: relative;
                    color: white;
                    display: flex;
                    flex-direction: column;
                }

                .manufacturing-content-wrapper {
                    padding: 2rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 10;
                }

                /* Hero Section */
                .manufacturing-hero {
                    position: relative;
                    height: 80vh;
                    min-height: 600px;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .manufacturing-hero-bg {
                    position: absolute;
                    top: -10%;
                    left: 0;
                    width: 100%;
                    height: 120%;
                    z-index: 0;
                }

                .hero-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .hero-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to right, rgba(77, 13, 18, 0.95) 0%, rgba(77, 13, 18, 0.7) 50%, rgba(77, 13, 18, 0.4) 100%),
                                radial-gradient(circle at center, transparent 0%, rgba(77, 13, 18, 0.8) 100%);
                    z-index: 1;
                }

                .hero-pattern-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url('/assets/pattern/Rhythmia_Care_Pattern_Red.svg');
                    background-repeat: repeat;
                    background-position: center center;
                    background-size: 600px;
                    opacity: 0.15;
                    z-index: 2;
                    pointer-events: none;
                }

                .manufacturing-bg-pattern {
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

                .manufacturing-hero-content {
                    position: relative;
                    z-index: 10;
                    padding-top: 4rem;
                }

                .back-link-hero:hover {
                    color: white;
                    background: rgba(0,0,0,0.4);
                    border-color: rgba(255,255,255,0.3);
                }

                .hero-text-container {
                    max-width: 700px;
                }

                .badge {
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

                .hero-title {
                    font-size: 4.5rem;
                    line-height: 1.05;
                    margin-bottom: 1.5rem;
                    color: white;
                    letter-spacing: -0.02em;
                }

                .hero-subtitle {
                    font-size: 1.25rem;
                    color: rgba(255,255,255,0.8);
                    max-width: 600px;
                    line-height: 1.6;
                }

                /* New Brand Sections CSS */
                .uk-badge-container {
                    padding: 6rem 2rem 0;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .uk-badge-card {
                    padding: 3rem;
                    border-radius: 20px;
                    text-align: center;
                    background: linear-gradient(135deg, rgba(213, 15, 15, 0.1) 0%, rgba(213, 15, 15, 0.03) 100%);
                    border: 1px solid rgba(213, 15, 15, 0.18);
                }
                .uk-badge-emoji {
                    font-size: 3rem;
                    margin-bottom: 0.5rem;
                }
                .uk-badge-title {
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    color: white;
                }
                .uk-badge-text {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.7);
                    margin: 0 auto;
                    max-width: 600px;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }
                .section-subtitle {
                    font-size: 0.9rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: var(--color-secondary);
                    margin-bottom: 0.5rem;
                }
                .section-title {
                    font-size: 2.2rem;
                    font-weight: 700;
                    color: white;
                    margin: 0;
                }

                .quality-process-container {
                    padding: 4rem 2rem;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .quality-steps-list {
                    display: flex;
                    flex-direction: column;
                }
                .quality-step-item {
                    display: flex;
                    gap: 1.5rem;
                }
                .step-number-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex-shrink: 0;
                }
                .step-number {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: rgba(213, 15, 15, 0.12);
                    border: 1px solid rgba(213, 15, 15, 0.25);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--color-secondary);
                }
                .step-line {
                    width: 2px;
                    flex: 1;
                    background: rgba(255,255,255,0.1);
                    min-height: 30px;
                    margin: 0.5rem 0;
                }
                .step-content {
                    padding-bottom: 2.5rem;
                    padding-top: 0.5rem;
                }
                .quality-step-item:last-child .step-content {
                    padding-bottom: 0;
                }
                .step-content-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.5rem;
                }
                .step-content-desc {
                    font-size: 1.05rem;
                    line-height: 1.7;
                    color: rgba(255,255,255,0.7);
                    margin: 0;
                }

                .certifications-container {
                    padding: 4rem 2rem;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .certifications-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .cert-card {
                    display: flex;
                    gap: 1.25rem;
                    align-items: flex-start;
                    padding: 1.5rem;
                    border-radius: 16px;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    transition: all 0.3s ease;
                }
                .cert-card:hover {
                    background: rgba(255,255,255,0.04);
                    border-color: rgba(213, 15, 15, 0.2);
                    transform: translateX(5px);
                }
                .cert-icon-wrapper {
                    margin-top: 2px;
                    flex-shrink: 0;
                }
                .cert-icon {
                    color: var(--color-secondary);
                }
                .cert-details {
                    flex: 1;
                }
                .cert-title {
                    font-size: 1.15rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.25rem;
                }
                .cert-desc {
                    font-size: 0.95rem;
                    color: rgba(255,255,255,0.6);
                    line-height: 1.6;
                }

                .bottom-badges-container {
                    padding: 2rem 2rem 4rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .bottom-badges-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 1rem;
                }
                .bottom-badge-card {
                    padding: 1.5rem;
                    text-align: center;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px;
                    transition: all 0.3s ease;
                }
                .bottom-badge-card:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.1);
                    transform: translateY(-2px);
                }
                .bottom-badge-icon-wrapper {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 48px;
                    height: 48px;
                    margin-bottom: 1rem;
                    color: var(--color-secondary);
                }
                .bottom-badge-icon-wrapper svg {
                    width: 100%;
                    height: 100%;
                }
                .bottom-badge-label {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.25rem;
                }
                .bottom-badge-sub {
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.4);
                }


                /* Timeline Section */
                .timeline-section {
                    position: relative;
                    padding: 8rem 2rem 4rem;
                    max-width: 1200px;
                }

                .timeline-line {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: 8rem;
                    bottom: 4rem;
                    width: 2px;
                    background: linear-gradient(to bottom, 
                        rgba(213, 15, 15, 0) 0%, 
                        rgba(213, 15, 15, 0.5) 10%, 
                        rgba(213, 15, 15, 0.5) 90%, 
                        rgba(213, 15, 15, 0) 100%);
                    z-index: 1;
                }

                .timeline-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 6rem;
                    position: relative;
                    z-index: 2;
                }
                .timeline-item:last-child {
                    margin-bottom: 0;
                }

                .timeline-item.left {
                    flex-direction: row-reverse;
                }

                .timeline-node {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 64px;
                    height: 64px;
                    background: var(--color-quaternary);
                    border: 2px solid var(--color-secondary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 3;
                    box-shadow: 0 0 20px rgba(213, 15, 15, 0.4);
                }

                .node-icon {
                    color: white;
                }

                .timeline-floating-subtitle {
                    width: calc(50% - 4rem);
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .timeline-item.right .timeline-floating-subtitle {
                    flex-direction: row-reverse;
                    justify-content: flex-start;
                }
                .timeline-item.right .floating-line {
                    margin-right: -2.5rem;
                }

                .timeline-item.left .timeline-floating-subtitle {
                    flex-direction: row;
                    justify-content: flex-start;
                }
                .timeline-item.left .floating-line {
                    margin-left: -2.5rem;
                }

                .floating-line {
                    height: 2px;
                    width: 3rem;
                    background: var(--color-secondary);
                    position: relative;
                }
                .floating-line::after {
                    content: '';
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--color-secondary);
                    top: 50%;
                    transform: translateY(-50%);
                }
                .timeline-item.left .floating-line::after {
                    right: 0;
                }
                .timeline-item.right .floating-line::after {
                    left: 0;
                }

                .floating-text {
                    font-size: 1.6rem;
                    font-weight: 500;
                    color: var(--color-secondary);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    line-height: 1.3;
                    margin: 0;
                }

                .timeline-content {
                    width: calc(50% - 4rem);
                    background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 20px;
                    overflow: hidden;
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                }
                .timeline-content:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    border-color: rgba(213, 15, 15, 0.3);
                }

                .content-image-wrapper {
                    position: relative;
                    height: 240px;
                    overflow: hidden;
                }

                .content-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s ease;
                }
                .timeline-content:hover .content-image {
                    transform: scale(1.05);
                }

                .image-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 0%, rgba(77, 13, 18, 0.8) 100%);
                }

                .content-text-wrapper {
                    padding: 2.5rem;
                }

                .step-title {
                    font-size: 2rem;
                    color: white;
                    margin-bottom: 1rem;
                    text-transform: none;
                    letter-spacing: -0.01em;
                }

                .step-description {
                    font-size: 1.05rem;
                    color: rgba(255,255,255,0.7);
                    line-height: 1.7;
                    margin-bottom: 1.5rem;
                }

                .step-features {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .step-features li {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 0.95rem;
                    color: rgba(255,255,255,0.9);
                }

                .feature-icon {
                    color: var(--color-secondary);
                    flex-shrink: 0;
                }

                /* CTA Section */
                .manufacturing-footer-cta {
                    padding: 4rem 2rem 8rem;
                    text-align: center;
                }

                .cta-card {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 4rem;
                    background: linear-gradient(145deg, rgba(213, 15, 15, 0.1) 0%, rgba(77, 13, 18, 0.4) 100%);
                    border: 1px solid rgba(213, 15, 15, 0.2);
                    border-radius: 24px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .cta-card h2 {
                    font-size: 2.5rem;
                    color: white;
                    margin: 1rem 0;
                }

                .cta-card p {
                    color: rgba(255,255,255,0.8);
                    max-width: 500px;
                    margin-bottom: 2.5rem;
                }

                .cta-btn {
                    width: auto;
                    min-width: 250px;
                }
                
                .buy-now-btn-large {
                    padding: 1.25rem 2rem;
                    background-color: var(--color-secondary);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1.2rem;
                    font-weight: 600;
                    font-family: var(--font-main);
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

                .mb-4 {
                    margin-bottom: 1rem;
                }

                /* Responsive Design */
                @media (max-width: 900px) {
                    .hero-title {
                        font-size: 3rem;
                    }

                    .uk-badge-container {
                        padding: 4rem 1.5rem 0;
                    }
                    .uk-badge-card {
                        padding: 2rem 1.5rem;
                    }
                    .uk-badge-title {
                        font-size: 1.4rem;
                    }
                    
                    .timeline-line {
                        left: 1.5rem;
                    }

                    .timeline-item, .timeline-item.left {
                        flex-direction: column;
                        align-items: flex-start;
                        padding-left: 1rem;
                    }

                    .timeline-floating-subtitle {
                        width: 100%;
                        flex-direction: row !important;
                        justify-content: flex-start !important;
                        margin-bottom: 1rem;
                        margin-top: 0;
                        min-height: 48px;
                        padding-left: 2.5rem;
                    }

                    .floating-line {
                        display: none;
                    }

                    .floating-text {
                        font-size: 1.2rem;
                        line-height: 1.4;
                        margin: 0;
                    }

                    .timeline-node {
                        left: 1.5rem;
                        top: 0;
                        transform: translateX(-50%);
                        width: 48px;
                        height: 48px;
                    }

                    .node-icon {
                        transform: scale(0.7);
                    }

                    .timeline-content {
                        width: 100%;
                    }

                    .cta-card {
                        padding: 2.5rem 1.5rem;
                    }
                    
                    .cta-card h2 {
                        font-size: 2rem;
                    }

                    .bottom-badges-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            `}</style>
        </div>
    );
}

