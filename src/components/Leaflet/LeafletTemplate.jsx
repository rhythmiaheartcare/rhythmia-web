
import './Leaflet.css';

export const defaultLeafletData = {
    front: {
        title: "Confidence in Every Beat",
        subtitle: "Support for your heart's electrical rhythm and muscle function  ",
        badge: "Formulated by Cardiologists "
    },
    back: {
        whyTitle: "WHY RHYTHMIA HEART CARE?",
        whyText: "Rhythmia Heart Care is the only evidence-based formulation designed to support the electrical system and muscle function of your heart.",
        scienceTitle: "What your heart needs",
        scienceText: "Your heart beats 100,000 times a day. It's your hardest-working muscle. Each beat demands precise electrical signals, cellular energy, stable membranes, and healthy nerve function. Our bespoke formula is the only evidence-based supplement formulated to address each aspect of your heart's health and function.",
        natureImageText: "Give your heart the support it deserves",

        developedBy: "Confidence in Every Beat ",
        benefits: [
            { title: "Comprehensive Formula", text: "Developed by cardiologists" },
            { title: "Backed by Evidence", text: "Based on peer-reviewed research" },
            { title: "Holistic Cardiac care", text: "Nutrients that work together to support both muscle and electrical function" },
            { title: "UK Quality Standards", text: "Manufactured to the highest UK standards" }
        ],
        references: [
            "¹ Rosanoff A, et al. Nutr Rev. 2012;70(3):153",
            "² Khan AM, et al. Circulation. 2013;127(1):33",
            "³ Mortensen SA, et al. JACC. 2014;2(6):641",
            "⁴ Tzang CC, et al. Nutr J. 2024;23(1):93",
            "⁵ DiNicolantonio JJ, et al. 2013;13(4):495",
            "⁶ Kokhabi P, et al. Curr Cardiol Rev. 2025;21(2)",
            "⁷ Aytemir K, et al. Pacing Clin Electrophysiol. 2000"
        ],
        disclaimer: "Food supplements should not be used as a substitute for a varied and balanced diet. Consult your doctor before use.",
        contactEmail: "info@rhythmiaheartcare.com",
        contactWeb: "www.rhythmiaheartcare.com",
        contactSocial: "@rhythmiaheartcare"
    }
};

export default function LeafletTemplate({ data = defaultLeafletData }) {
    const d = data;

    return (
        <div className="leaflet-root">
            {/* PAGE 1: FRONT */}
            <div className="leaflet-page front-page">
                <div className="bg-pattern"></div>

                <div className="content-layer">

                    <div className="front-visual">
                        <div className="glow-effect"></div>
                        <img
                            src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_White_Copy_RGB.svg"
                            alt="Rhythmia"
                            className="heart-logo-large"
                        />
                    </div>

                    <div className="front-text-group">
                        <h1 dangerouslySetInnerHTML={{ __html: d.front.title.replace(/\n/g, '<br/>') }}></h1>
                        <p className="front-subtitle">{d.front.subtitle}</p>

                        <div className="badge-pill">
                            {d.front.badge}
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 2: BACK */}
            <div className="leaflet-page back-page">
                <div className="bg-pattern"></div>
                <div className="content-layer">

                    {/* Header with Logo */}
                    <div className="back-header">
                        <img
                            src="/assets/logo/Rhythmia_Care_Logo_Wordmark_White_RGB.svg"
                            alt="Rhythmia"
                            className="logo-small"
                        />
                        <p className="developed-by-text">
                            {d.back.developedBy}
                        </p>
                    </div>

                    {/* TOP IMAGE - Nature Image from Booklet WITH OVERLAY TEXT */}
                    <div className="nature-image-container">
                        <img
                            src="/assets/photos/getty-images-3UDtdrn3qsQ-unsplash.jpg"
                            alt="Natural Balance"
                            className="nature-image"
                        />
                        <div className="image-overlay"></div>
                        <p className="nature-text-overlay">
                            {d.back.natureImageText || "Give your heart the support it deserves"}
                        </p>
                    </div>

                    {/* WHY RHYTHMIA TEXT SECTION */}
                    <div className="why-section">
                        <h2 className="section-title">{d.back.whyTitle}</h2>

                        <p className="why-intro">{d.back.whyText}</p>

                        <h3 className="science-title">{d.back.scienceTitle}</h3>
                        <p className="science-text">{d.back.scienceText}</p>
                    </div>

                    {/* BENEFITS GRID */}
                    <div className="leaflet-benefits-grid">
                        {d.back.benefits && d.back.benefits.map((benefit, idx) => (
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

                    {/* 4 TRUST BADGES - from Booklet but smaller */}
                    <div className="trust-badges-row">
                        <div className="badge-small">
                            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Clinically<br />Formulated</span>
                        </div>
                        <div className="badge-small">
                            <svg className="badge-icon" viewBox="0 0 446 374" style={{ fill: 'var(--color-secondary)', stroke: 'none' }}>
                                <g transform="translate(0,374) scale(0.05,-0.05)">
                                    <path d="M8130 7112 c-1743 -767 -3083 -2094 -3537 -3505 -235 -730 -293 -1650 -150 -2385 l21 -108 254 498 c475 928 956 1671 1523 2346 188 225 419 465 419 437 0 -57 -328 -719 -834 -1685 -416 -791 -802 -1615 -1048 -2236 l-39 -96 96 55 c2319 1347 3333 2965 3555 5677 38 458 41 1110 5 1109 -14 0 -133 -48 -265 -107z" />
                                    <path d="M860 5307 c3 -1454 561 -2765 1520 -3576 405 -342 1433 -1025 1476 -981 31 30 -485 963 -956 1730 -379 618 -607 1019 -589 1038 16 16 508 -491 706 -728 329 -394 636 -821 899 -1252 37 -59 61 -85 53 -58 -30 115 -33 1047 -3 1270 l30 220 -52 130 c-302 762 -1070 1490 -2129 2017 -321 160 -736 333 -900 374 l-55 13 0 -197z" />
                                </g>
                            </svg>
                            <span>100%<br />Vegan</span>
                        </div>
                        <div className="badge-small">
                            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>GMP<br />Certified</span>
                        </div>
                        <div className="badge-small">
                            {/* UK Map SVG - Inlined to allow color control */}
                            <svg className="badge-icon" viewBox="0 0 496 355" style={{ fill: 'var(--color-secondary)', stroke: 'none' }}>
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
                            <span>Made in<br />UK</span>
                        </div>
                        <div className="badge-small">
                            <svg className="badge-icon" viewBox="0 0 600 600" style={{ fill: 'var(--color-secondary)', stroke: 'none' }}>
                                <g transform="translate(0,600) scale(0.1,-0.1)">
                                    <path d="M2183 5829 c-70 -34 -105 -72 -134 -149 -35 -92 -19 -221 38 -298 28 -38 28 -38 -77 -46 -167 -13 -282 -71 -336 -168 -24 -44 -29 -64 -28 -118 2 -177 116 -318 340 -420 112 -51 127 -57 161 -64 18 -4 35 -12 38 -17 4 -5 15 -9 25 -9 11 0 34 -6 52 -14 18 -8 80 -29 138 -46 58 -18 114 -36 125 -40 11 -5 49 -18 85 -30 36 -12 74 -26 85 -31 11 -5 45 -18 75 -29 75 -28 69 -26 290 -134 107 -53 205 -104 218 -114 l24 -18 -25 -62 c-51 -125 -123 -195 -231 -227 -69 -19 -294 -23 -424 -6 -245 31 -572 18 -737 -30 -148 -43 -245 -86 -405 -183 -144 -87 -208 -135 -328 -250 -327 -313 -524 -762 -548 -1248 l-7 -137 -32 -15 c-18 -9 -43 -16 -55 -16 -11 0 -49 -14 -83 -31 -281 -139 -392 -431 -265 -694 36 -73 46 -87 95 -138 181 -187 411 -218 692 -95 26 12 47 16 52 11 10 -10 -7 -97 -36 -193 -25 -81 -30 -216 -11 -262 32 -75 103 -137 196 -170 116 -42 207 -50 492 -45 150 3 354 10 453 17 195 13 926 7 1245 -10 269 -15 598 -12 738 5 129 16 187 34 238 72 31 23 31 23 49 3 23 -25 88 -56 145 -69 55 -13 483 -14 681 -1 201 12 284 43 326 123 37 70 8 248 -56 349 -91 143 -199 196 -534 264 -89 18 -89 18 -107 58 -10 23 -25 66 -33 96 -40 144 -47 169 -62 230 -9 36 -22 88 -30 115 -7 28 -21 77 -30 110 -8 33 -20 74 -25 90 -17 56 -40 180 -40 217 0 77 32 164 99 268 20 30 41 64 47 75 112 201 141 308 131 475 l-6 99 32 5 c18 3 70 10 117 16 154 21 313 59 368 90 9 5 42 20 73 34 146 64 241 154 286 271 24 64 27 82 26 200 -1 140 -16 219 -69 352 -133 336 -415 686 -686 851 -155 95 -281 143 -448 173 -130 23 -243 24 -381 3 l-107 -16 -128 129 c-262 262 -584 491 -937 665 -78 38 -151 74 -161 80 -11 6 -31 14 -45 18 -14 5 -51 18 -81 30 -134 52 -271 80 -390 80 -85 0 -102 -4 -157 -31z m269 -214 c96 -24 169 -45 213 -62 199 -78 475 -226 649 -348 34 -23 95 -65 136 -93 41 -28 84 -59 95 -69 11 -10 49 -43 85 -73 117 -100 190 -173 190 -190 0 -11 -24 -32 -61 -54 -33 -20 -63 -36 -66 -36 -5 0 -25 14 -156 103 -37 26 -69 47 -72 47 -2 0 -24 13 -47 29 -204 138 -384 234 -568 306 -95 37 -333 160 -417 215 -86 56 -123 89 -156 140 -22 32 -21 42 4 74 25 31 73 34 171 11z m-147 -531 c238 -47 366 -91 589 -204 316 -159 340 -172 475 -260 100 -65 131 -90 131 -106 0 -12 -16 -46 -36 -75 -20 -30 -43 -69 -50 -86 -8 -18 -20 -33 -27 -33 -6 0 -37 14 -67 30 -133 72 -443 220 -460 220 -5 0 -24 6 -42 14 -18 8 -51 21 -73 29 -22 8 -58 22 -80 30 -22 8 -107 36 -190 62 -383 120 -516 185 -576 281 -31 51 -23 74 36 95 67 23 259 25 370 3z m2237 -450 c51 -8 97 -20 103 -25 5 -5 16 -9 25 -9 21 0 167 -63 183 -79 6 -6 15 -11 20 -11 29 0 227 -172 315 -274 216 -251 343 -527 346 -751 1 -98 -10 -129 -61 -177 -67 -64 -248 -129 -458 -165 -143 -24 -511 -24 -650 1 -111 20 -204 41 -250 58 -234 85 -415 240 -511 435 -47 97 -58 150 -58 283 -1 118 12 186 49 264 14 29 25 56 25 60 0 15 70 114 111 157 190 196 502 286 811 233z m-1188 -985 c11 -55 85 -196 147 -279 53 -71 184 -210 200 -210 3 0 30 -18 60 -41 64 -48 241 -137 319 -161 145 -44 263 -65 439 -76 l104 -7 13 -35 c19 -53 17 -187 -4 -246 -16 -47 -90 -181 -117 -214 -7 -8 -29 -47 -49 -87 -104 -204 -115 -375 -43 -648 19 -71 53 -201 75 -287 98 -375 111 -409 177 -465 49 -40 108 -66 176 -77 114 -17 269 -55 317 -78 61 -28 104 -90 100 -143 l-3 -40 -60 -6 c-33 -4 -182 -10 -330 -14 -312 -9 -331 -6 -371 56 -13 22 -27 53 -31 69 -3 17 -10 33 -14 36 -5 3 -9 12 -9 20 0 8 -9 36 -21 62 -74 170 -116 232 -268 397 -21 22 -52 63 -71 90 -19 28 -36 52 -39 55 -18 16 -237 371 -302 489 -11 20 -28 50 -39 66 -11 17 -23 37 -27 45 -4 8 -19 33 -33 55 -14 22 -35 60 -45 85 -10 25 -25 52 -32 61 -7 8 -13 20 -13 26 0 20 -144 160 -200 195 -89 55 -215 111 -290 128 -19 4 -55 12 -80 18 -84 21 -183 33 -299 38 -102 5 -120 3 -151 -14 -70 -39 -77 -148 -12 -197 22 -16 50 -21 157 -27 387 -20 613 -126 709 -333 21 -47 31 -150 22 -228 -10 -77 -89 -207 -184 -303 -41 -41 -78 -74 -82 -74 -5 0 -15 -6 -22 -12 -44 -40 -198 -112 -323 -151 -69 -21 -229 -58 -320 -73 -85 -14 -126 -75 -105 -153 6 -25 22 -48 40 -61 27 -19 46 -21 262 -25 244 -5 511 -20 663 -36 215 -23 262 -29 295 -39 19 -5 47 -10 61 -10 25 0 51 -7 189 -47 79 -24 170 -68 203 -99 21 -20 27 -33 25 -57 -3 -27 -8 -32 -43 -41 -58 -14 -639 -13 -1175 3 -381 11 -512 11 -725 1 -450 -22 -784 -24 -868 -5 -137 30 -148 43 -123 128 67 219 79 294 72 453 -6 141 -19 187 -55 199 -10 3 -30 16 -45 30 -46 42 -90 72 -166 113 -74 40 -75 41 -91 98 -46 158 -52 204 -52 419 0 213 4 253 49 435 35 141 134 371 200 465 15 22 43 63 62 90 117 174 337 356 561 466 47 23 94 46 105 51 21 11 101 33 196 55 94 21 323 27 475 13 72 -7 211 -15 310 -17 238 -7 339 15 467 101 29 20 58 36 64 36 6 0 14 -14 18 -31z m-2726 -1984 c7 -14 12 -36 12 -49 0 -25 21 -101 49 -175 19 -51 101 -137 157 -166 44 -22 74 -44 74 -56 0 -10 -110 -63 -175 -85 -27 -9 -77 -16 -112 -16 -149 1 -283 139 -283 291 0 122 70 219 195 268 49 19 71 16 83 -12z m3079 -250 c86 -141 186 -293 211 -321 46 -50 92 -112 92 -124 0 -13 -49 -8 -100 10 -24 8 -189 37 -335 59 -38 6 -126 15 -195 21 -69 6 -140 13 -158 16 -33 6 -54 25 -35 31 5 2 43 26 84 53 129 86 255 222 308 333 15 32 29 47 39 45 9 -2 49 -57 89 -123z" />
                                    <path d="M4688 3930 c-123 -66 -128 -229 -9 -305 86 -54 204 -19 248 74 71 149 -93 308 -239 231z" />
                                </g>
                            </svg>
                            <span>No animal<br />testing</span>
                        </div>
                    </div>

                    {/* Footer Group - Matching Booklet Exact Structure */}
                    <footer className="contact-section">
                        <div>
                            <h3>Get in Touch</h3>
                            <div className="contact-detail">
                                <svg className="contact-icon" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                <span>{d.back.contactEmail}</span>
                            </div>
                            <div className="contact-detail">
                                <svg className="contact-icon" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                </svg>
                                <span>{d.back.contactWeb}</span>
                            </div>
                            <div className="contact-detail">
                                <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,6.8A5.2,5.2 0 0,1 17.2,12A5.2,5.2 0 0,1 12,17.2A5.2,5.2 0 0,1 6.8,12A5.2,5.2 0 0,1 12,6.8M12,8.8A3.2,3.2 0 0,0 8.8,12A3.2,3.2 0 0,0 12,15.2A3.2,3.2 0 0,0 15.2,12A3.2,3.2 0 0,0 12,8.8M18,5A1,1 0 0,1 19,6A1,1 0 0,1 18,7A1,1 0 0,1 17,6A1,1 0 0,1 18,5Z" />
                                </svg>
                                <span>{d.back.contactSocial}</span>
                            </div>
                        </div>

                        {/* QR Code with Logo Overlay - Matching Booklet */}
                        <div style={{ marginBottom: '0.2rem', position: 'relative', width: '90px', height: '90px' }}>
                            <img src="/assets/qr_code.svg" alt="Scan to Visit" style={{ width: '100%', height: '100%', display: 'block' }} />
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '22px', height: '22px', backgroundColor: 'transparent', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="/assets/logo/Rhythmia_Care_Logo_Heart_Red_RGB.svg" alt="Logo" style={{ width: '100%', height: 'auto' }} />
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
