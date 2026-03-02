import React from 'react';
import './Cdu.css';

export const defaultCduData = {
    header: {
        title: "Confidence in\nEvery Beat",
        subtitle: "Support for your heart's electrical rhythm and muscle function",
        badge: "Formulated by Cardiologists",
        photoUrl: "/assets/photos/young-lifestyle-active.png"
    },
    sides: {
        leftBenefits: [
            { title: "TARGETED CARDIAC SUPPORT", text: "Nutrients that work together to support both muscle and electrical function" },
            { title: "Comprehensive Formula", text: "Developed by cardiologists" },
            { title: "Backed by Evidence ", text: "Based on peer-reviewed research" },
            { title: "UK Quality Standards", text: "Manufactured to the highest UK standards" }
        ],
        rightTitle: "Your Heart\nOur Priority",
        rightSubtitle: "The only evidence-based formulation designed to support the electrical system and muscle function of your heart.",
        showQrCode: true
    },
    shelves: {
        topText: "Give your heart the support it deserves",
        bottomText: "Confidence in Every Beat"
    },
    base: {
        website: "www.rhythmiaheartcare.com"
    },
    leaflet: {
        text: "Take one"
    }
};

export default function CduTemplate({ data = defaultCduData }) {
    const d = data;

    return (
        <div className="cdu-root">
            <div className="cdu-page">
                {/* Background cutter guide template layer */}
                <img className="cdu-template-bg" src="/template_page_0.png" alt="CDU Template" />

                {/* Overlays */}
                <div className="cdu-overlays">

                    {/* Header (Back board) Overlay */}
                    <div className="cdu-header-overlay">
                        {d.header.photoUrl && (
                            <img src={d.header.photoUrl} alt="Background Lifestyle" className="header-photo" />
                        )}
                        <div className="bg-pattern"></div>
                        <div className="header-content" style={{ position: 'relative', width: '100%', minHeight: '1600px' }}>
                            <div className="top-center-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingTop: '80px' }}>

                                <div className="header-visual" style={{ marginBottom: '30px' }}>
                                    <div className="glow-effect"></div>
                                    <img
                                        src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_White_Copy_RGB.svg"
                                        alt="Rhythmia"
                                        className="heart-logo"
                                    />
                                </div>
                            </div>

                            {/* Bottom Left Section (Fits around the physical Leaflet Holder on the right) */}
                            <div className="bottom-left-section" style={{
                                position: 'absolute',
                                top: '725px',
                                left: '40px',
                                width: '420px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                                <h1 style={{ marginBottom: '20px' }} dangerouslySetInnerHTML={{ __html: d.header.title.replace(/\n/g, '<br/>') }}></h1>
                                <p className="subtitle" style={{ fontSize: '28px', marginBottom: '40px', lineHeight: '1.4', color: 'rgba(255, 255, 255, 0.9)' }}>{d.header.subtitle}</p>
                                <div className="badge-pill" style={{ fontSize: '26px', padding: '14px 28px', marginBottom: '20px', border: '3px solid var(--color-secondary)', borderRadius: '60px', color: 'var(--color-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', background: 'rgba(0, 0, 0, 0.3)' }}>{d.header.badge}</div>
                                <p style={{ fontSize: '26px', color: 'var(--color-secondary)', fontWeight: '600' }}>{d.base.website}</p>
                            </div>
                        </div>
                    </div>

                    {/* Left Side Panel Overlay */}
                    <div className="cdu-side-overlay left">
                        <div className="bg-pattern" style={{ opacity: 0.2 }}></div>
                        <div className="side-content">
                            <div className="benefits-list">
                                {d.sides.leftBenefits?.map((benefit, i) => (
                                    <div key={i} className="benefit-item">

                                        <div className="benefit-text-wrapper">
                                            <strong>{benefit.title}</strong>
                                            <span>{benefit.text}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side Panel Overlay */}
                    <div className="cdu-side-overlay right">
                        <div className="bg-pattern" style={{ opacity: 0.2 }}></div>
                        <div className="side-content trust-panel">
                            <h2 dangerouslySetInnerHTML={{ __html: d.sides.rightTitle?.replace(/\n/g, '<br/>') }}></h2>
                            <p>{d.sides.rightSubtitle}</p>
                        </div>
                    </div>

                    {/* Top Shelf Lip */}
                    <div className="cdu-shelf-overlay top-shelf">
                        <p>{d.shelves.topText}</p>
                    </div>

                    {/* Bottom Shelf Lip */}
                    <div className="cdu-shelf-overlay bottom-shelf">
                        <div className="trust-badges shelf-badges">
                            <div className="badge">
                                <svg className="badge-icon" viewBox="0 0 600 487" style={{ fill: 'currentColor', stroke: 'none' }} preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0,487) scale(0.1,-0.1)">
                                        <path d="M1220 4543 c-413 -25 -769 -333 -867 -749 -22 -95 -24 -327 -4 -417 l12 -57 476 2 475 3 97 155 c85 135 103 158 141 178 79 40 171 25 222 -37 15 -17 93 -137 174 -266 80 -129 148 -235 150 -235 2 0 24 30 48 68 49 76 79 106 119 121 19 7 211 11 572 11 l544 0 13 58 c8 35 13 117 12 212 0 139 -3 164 -28 245 -105 348 -351 590 -691 681 -99 26 -360 26 -459 0 -99 -27 -199 -70 -285 -123 -60 -37 -77 -44 -90 -35 -63 45 -177 106 -245 131 -108 39 -267 61 -386 54z" />
                                        <path d="M4375 3926 c-299 -69 -529 -293 -611 -596 -24 -89 -25 -282 -1 -369 45 -165 103 -267 217 -381 96 -95 204 -164 313 -200 l67 -22 0 -273 c0 -195 -4 -296 -15 -356 -59 -340 -269 -631 -576 -798 -152 -83 -300 -120 -514 -127 -172 -7 -297 8 -435 51 -355 111 -646 421 -739 787 -38 149 -67 103 289 469 173 178 425 436 560 572 134 136 248 254 253 262 7 13 -43 15 -376 15 l-383 0 -100 -157 c-80 -127 -107 -162 -139 -180 -53 -30 -118 -30 -175 0 -39 20 -59 49 -202 277 -88 140 -163 256 -167 258 -5 1 -23 -21 -41 -50 -42 -67 -77 -105 -115 -126 -26 -15 -83 -17 -482 -20 -249 -2 -453 -6 -453 -9 0 -10 926 -963 1087 -1119 48 -45 63 -67 63 -88 0 -50 39 -223 71 -313 131 -370 411 -682 759 -847 180 -85 314 -119 537 -138 238 -20 489 12 692 88 364 135 654 403 821 757 55 116 83 201 112 337 17 80 21 144 25 412 l5 317 53 16 c30 8 84 31 120 51 293 155 464 453 442 769 -8 112 -30 193 -82 300 -97 200 -254 334 -480 411 -67 23 -100 27 -210 30 -86 3 -150 -1 -190 -10z m225 -616 c41 -11 94 -61 109 -103 36 -95 -15 -203 -109 -231 -118 -35 -219 33 -228 152 -10 133 98 218 228 182z" />
                                    </g>
                                </svg>
                                <span>Clinically<br />Formulated</span>
                            </div>
                            <div className="badge">
                                <svg className="badge-icon" viewBox="0 0 446 374" style={{ fill: 'currentColor', stroke: 'none' }}>
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
                                    <path strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>GMP<br />Certified</span>
                            </div>
                            <div className="badge">
                                <svg className="badge-icon" viewBox="0 0 496 355" style={{ fill: 'currentColor', stroke: 'none' }}>
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
                            <div className="badge">
                                <svg className="badge-icon" viewBox="0 0 600 600" style={{ fill: 'currentColor', stroke: 'none' }}>
                                    <g transform="translate(0,600) scale(0.1,-0.1)">
                                        <path d="M2183 5829 c-70 -34 -105 -72 -134 -149 -35 -92 -19 -221 38 -298 28 -38 28 -38 -77 -46 -167 -13 -282 -71 -336 -168 -24 -44 -29 -64 -28 -118 2 -177 116 -318 340 -420 112 -51 127 -57 161 -64 18 -4 35 -12 38 -17 4 -5 15 -9 25 -9 11 0 34 -6 52 -14 18 -8 80 -29 138 -46 58 -18 114 -36 125 -40 11 -5 49 -18 85 -30 36 -12 74 -26 85 -31 11 -5 45 -18 75 -29 75 -28 69 -26 290 -134 107 -53 205 -104 218 -114 l24 -18 -25 -62 c-51 -125 -123 -195 -231 -227 -69 -19 -294 -23 -424 -6 -245 31 -572 18 -737 -30 -148 -43 -245 -86 -405 -183 -144 -87 -208 -135 -328 -250 -327 -313 -524 -762 -548 -1248 l-7 -137 -32 -15 c-18 -9 -43 -16 -55 -16 -11 0 -49 -14 -83 -31 -281 -139 -392 -431 -265 -694 36 -73 46 -87 95 -138 181 -187 411 -218 692 -95 26 12 47 16 52 11 10 -10 -7 -97 -36 -193 -25 -81 -30 -216 -11 -262 32 -75 103 -137 196 -170 116 -42 207 -50 492 -45 150 3 354 10 453 17 195 13 926 7 1245 -10 269 -15 598 -12 738 5 129 16 187 34 238 72 31 23 31 23 49 3 23 -25 88 -56 145 -69 55 -13 483 -14 681 -1 201 12 284 43 326 123 37 70 8 248 -56 349 -91 143 -199 196 -534 264 -89 18 -89 18 -107 58 -10 23 -25 66 -33 96 -40 144 -47 169 -62 230 -9 36 -22 88 -30 115 -7 28 -21 77 -30 110 -8 33 -20 74 -25 90 -17 56 -40 180 -40 217 0 77 32 164 99 268 20 30 41 64 47 75 112 201 141 308 131 475 l-6 99 32 5 c18 3 70 10 117 16 154 21 313 59 368 90 9 5 42 20 73 34 146 64 241 154 286 271 24 64 27 82 26 200 -1 140 -16 219 -69 352 -133 336 -415 686 -686 851 -155 95 -281 143 -448 173 -130 23 -243 24 -381 3 l-107 -16 -128 129 c-262 262 -584 491 -937 665 -78 38 -151 74 -161 80 -11 6 -31 14 -45 18 -14 5 -51 18 -81 30 -134 52 -271 80 -390 80 -85 0 -102 -4 -157 -31z m269 -214 c96 -24 169 -45 213 -62 199 -78 475 -226 649 -348 34 -23 95 -65 136 -93 41 -28 84 -59 95 -69 11 -10 49 -43 85 -73 117 -100 190 -173 190 -190 0 -11 -24 -32 -61 -54 -33 -20 -63 -36 -66 -36 -5 0 -25 14 -156 103 -37 26 -69 47 -72 47 -2 0 -24 13 -47 29 -204 138 -384 234 -568 306 -95 37 -333 160 -417 215 -86 56 -123 89 -156 140 -22 32 -21 42 4 74 25 31 73 34 171 11z m-147 -531 c238 -47 366 -91 589 -204 316 -159 340 -172 475 -260 100 -65 131 -90 131 -106 0 -12 -16 -46 -36 -75 -20 -30 -43 -69 -50 -86 -8 -18 -20 -33 -27 -33 -6 0 -37 14 -67 30 -133 72 -443 220 -460 220 -5 0 -24 6 -42 14 -18 8 -51 21 -73 29 -22 8 -58 22 -80 30 -22 8 -107 36 -190 62 -383 120 -516 185 -576 281 -31 51 -23 74 36 95 67 23 259 25 370 3z m2237 -450 c51 -8 97 -20 103 -25 5 -5 16 -9 25 -9 21 0 167 -63 183 -79 6 -6 15 -11 20 -11 29 0 227 -172 315 -274 216 -251 343 -527 346 -751 1 -98 -10 -129 -61 -177 -67 -64 -248 -129 -458 -165 -143 -24 -511 -24 -650 1 -111 20 -204 41 -250 58 -234 85 -415 240 -511 435 -47 97 -58 150 -58 283 -1 118 12 186 49 264 14 29 25 56 25 60 0 15 70 114 111 157 190 196 502 286 811 233z m-1188 -985 c11 -55 85 -196 147 -279 53 -71 184 -210 200 -210 3 0 30 -18 60 -41 64 -48 241 -137 319 -161 145 -44 263 -65 439 -76 l104 -7 13 -35 c19 -53 17 -187 -4 -246 -16 -47 -90 -181 -117 -214 -7 -8 -29 -47 -49 -87 -104 -204 -115 -375 -43 -648 19 -71 53 -201 75 -287 98 -375 111 -409 177 -465 49 -40 108 -66 176 -77 114 -17 269 -55 317 -78 61 -28 104 -90 100 -143 l-3 -40 -60 -6 c-33 -4 -182 -10 -330 -14 -312 -9 -331 -6 -371 56 -13 22 -27 53 -31 69 -3 17 -10 33 -14 36 -5 3 -9 12 -9 20 0 8 -9 36 -21 62 -74 170 -116 232 -268 397 -21 22 -52 63 -71 90 -19 28 -36 52 -39 55 -18 16 -237 371 -302 489 -11 20 -28 50 -39 66 -11 17 -23 37 -27 45 -4 8 -19 33 -33 55 -14 22 -35 60 -45 85 -10 25 -25 52 -32 61 -7 8 -13 20 -13 26 0 20 -144 160 -200 195 -89 55 -215 111 -290 128 -19 4 -55 12 -80 18 -84 21 -183 33 -299 38 -102 5 -120 3 -151 -14 -70 -39 -77 -148 -12 -197 22 -16 50 -21 157 -27 387 -20 613 -126 709 -333 21 -47 31 -150 22 -228 -10 -77 -89 -207 -184 -303 -41 -41 -78 -74 -82 -74 -5 0 -15 -6 -22 -12 -44 -40 -198 -112 -323 -151 -69 -21 -229 -58 -320 -73 -85 -14 -126 -75 -105 -153 6 -25 22 -48 40 -61 27 -19 46 -21 262 -25 244 -5 511 -20 663 -36 215 -23 262 -29 295 -39 19 -5 47 -10 61 -10 25 0 51 -7 189 -47 79 -24 170 -68 203 -99 21 -20 27 -33 25 -57 -3 -27 -8 -32 -43 -41 -58 -14 -639 -13 -1175 3 -381 11 -512 11 -725 1 -450 -22 -784 -24 -868 -5 -137 30 -148 43 -123 128 67 219 79 294 72 453 -6 141 -19 187 -55 199 -10 3 -30 16 -45 30 -46 42 -90 72 -166 113 -74 40 -75 41 -91 98 -46 158 -52 204 -52 419 0 213 4 253 49 435 35 141 134 371 200 465 15 22 43 63 62 90 117 174 337 356 561 466 47 23 94 46 105 51 21 11 101 33 196 55 94 21 323 27 475 13 72 -7 211 -15 310 -17 238 -7 339 15 467 101 29 20 58 36 64 36 6 0 14 -14 18 -31z m-2726 -1984 c7 -14 12 -36 12 -49 0 -25 21 -101 49 -175 19 -51 101 -137 157 -166 44 -22 74 -44 74 -56 0 -10 -110 -63 -175 -85 -27 -9 -77 -16 -112 -16 -149 1 -283 139 -283 291 0 122 70 219 195 268 49 19 71 16 83 -12z m3079 -250 c86 -141 186 -293 211 -321 46 -50 92 -112 92 -124 0 -13 -49 -8 -100 10 -24 8 -189 37 -335 59 -38 6 -126 15 -195 21 -69 6 -140 13 -158 16 -33 6 -54 25 -35 31 5 2 43 26 84 53 129 86 255 222 308 333 15 32 29 47 39 45 9 -2 49 -57 89 -123z" />
                                        <path d="M4688 3930 c-123 -66 -128 -229 -9 -305 86 -54 204 -19 248 74 71 149 -93 308 -239 231z" />
                                    </g>
                                </svg>
                                <span>No animal<br />testing</span>
                            </div>
                        </div>
                    </div>

                    {/* Leaflet Holder Front (Now covers full bounding box of the intricate shape) */}
                    <div className="cdu-leaflet-holder-front">
                        {d.sides.showQrCode && (
                            <div className="leaflet-qr-wrapper">
                                <img src="/assets/qr_code.svg" alt="Scan to Visit" className="qr-img" />
                                <div className="qr-logo-centered">
                                    <img src="/assets/just_heart_logo/Rhythmia_Care_Logo_Heart_White_RGB.svg" alt="Logo" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
