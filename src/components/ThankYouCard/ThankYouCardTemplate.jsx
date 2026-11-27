import './ThankYouCard.css';
import { defaultThankYouCardData } from './defaultThankYouCardData';

/* Cardiologist-accurate Lead II normal sinus rhythm trace:
   two subtle muted beats leading into one highlighted brand-red beat,
   extending smoothly past the right trim edge into the 3 mm bleed. */
function ThankYouEcg() {
    return (
        <div className="tyc-ecg-track" aria-hidden="true">
            <svg viewBox="0 0 536 82" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="tycEcgMuted" x1="0" y1="0" x2="536" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#D50F0F" stopOpacity="0.06" />
                        <stop offset="16%" stopColor="#D50F0F" stopOpacity="0.24" />
                        <stop offset="68%" stopColor="#D50F0F" stopOpacity="0.24" />
                        <stop offset="100%" stopColor="#D50F0F" stopOpacity="0.24" />
                    </linearGradient>
                </defs>
                <path
                    d="M 0 54 L 38 54
                       C 43 54, 46 47, 52 47 C 58 47, 61 54, 66 54
                       L 74 54 L 78 60 L 85 16 L 92 66 L 97 54
                       L 109 54 C 115 54, 120 42, 129 42 C 137 42, 142 54, 149 54
                       L 196 54
                       C 201 54, 204 47, 210 47 C 216 47, 219 54, 224 54
                       L 232 54 L 236 60 L 243 16 L 250 66 L 255 54
                       L 267 54 C 273 54, 278 42, 287 42 C 295 42, 300 54, 307 54
                       L 354 54
                       C 359 54, 362 47, 368 47 C 374 47, 377 54, 382 54
                       L 390 54 L 394 60 L 401 16 L 408 66 L 413 54
                       L 425 54 C 431 54, 436 42, 445 42 C 453 42, 458 54, 465 54
                       L 536 54"
                    stroke="url(#tycEcgMuted)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M 346 54 L 354 54
                       C 359 54, 362 47, 368 47 C 374 47, 377 54, 382 54
                       L 390 54 L 394 60 L 401 16 L 408 66 L 413 54
                       L 425 54 C 431 54, 436 42, 445 42 C 453 42, 458 54, 465 54
                       L 472 54"
                    stroke="#D50F0F"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

export default function ThankYouCardTemplate({ data = defaultThankYouCardData }) {
    const p = { ...defaultThankYouCardData.print, ...(data.print || {}) };
    const f = { ...defaultThankYouCardData.front, ...(data.front || {}) };
    const b = { ...defaultThankYouCardData.back, ...(data.back || {}) };

    const showCodeBlock = Boolean(b.codeLabel || b.codeValue || b.codeNote);
    const sizeLabel = p.includeBleed
        ? '85 × 55 mm trim · 91 × 61 mm with 3 mm bleed'
        : '85 × 55 mm exact trim';

    return (
        <div className={`thank-you-card-root ${p.includeBleed ? 'has-bleed' : ''}`}>
            <div className="tyc-stack">

                {/* PAGE 1: FRONT */}
                <div className="tyc-item">
                    <div className="tyc-sheet-label no-print">Front &middot; {sizeLabel}</div>
                    <div className="tyc-sheet">
                        <div className="tyc-trim">
                            <img
                                className="tyc-jar-photo"
                                src="/assets/photos/thank-you-card-jar.jpg"
                                alt="Rhythmia Heart Care amber glass bottle"
                            />

                            {p.showPattern && <div className="tyc-pattern tyc-pattern-front" aria-hidden="true" />}

                            <div className="tyc-front-right">
                                <img
                                    className="tyc-logo"
                                    src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_Black_Copy_RGB.svg"
                                    alt="Rhythmia Heart Care"
                                />
                                {f.heading && <div className="tyc-heading">{f.heading}</div>}
                                {f.subline && <div className="tyc-subline">{f.subline}</div>}
                            </div>

                            {f.showEcg && <ThankYouEcg />}

                            {p.showGuides && (
                                <>
                                    <div className="tyc-guide-trim no-print" />
                                    <div className="tyc-guide-safe no-print" />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* PAGE 2: BACK */}
                <div className="tyc-item">
                    <div className="tyc-sheet-label no-print">Back &middot; {sizeLabel}</div>
                    <div className="tyc-sheet">
                        {p.showPattern && <div className="tyc-pattern tyc-pattern-back" aria-hidden="true" />}
                        <div className="tyc-trim">
                            <div className="tyc-back-inner">
                                <div className="tyc-back-left">
                                    {b.offerHeadline && <div className="tyc-offer-pct">{b.offerHeadline}</div>}
                                    {b.offerSubheading && <div className="tyc-offer-next">{b.offerSubheading}</div>}

                                    {showCodeBlock && (
                                        <div className="tyc-code-callout">
                                            {b.codeLabel && <div className="tyc-code-label">{b.codeLabel}</div>}
                                            {b.codeValue ? (
                                                <div className="tyc-code-value">{b.codeValue}</div>
                                            ) : (
                                                <div className="tyc-code-blank" aria-hidden="true" />
                                            )}
                                            {b.codeNote && <div className="tyc-code-note">{b.codeNote}</div>}
                                        </div>
                                    )}
                                </div>

                                <div className="tyc-back-right">
                                    <div className="tyc-qr-card">
                                        <img
                                            className="tyc-qr-img"
                                            src="/assets/qr_code_thank_you.svg"
                                            alt="QR code to rhythmiaheartcare.com"
                                        />
                                        <div className="tyc-qr-heart-circle" aria-hidden="true">
                                            <img
                                                src="/assets/just_heart_logo/Rhythmia_Care_Logo_Heart_Red_RGB.svg"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    {b.website && <div className="tyc-site-url">{b.website}</div>}
                                </div>
                            </div>

                            {p.showGuides && (
                                <>
                                    <div className="tyc-guide-trim no-print" />
                                    <div className="tyc-guide-safe no-print" />
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
