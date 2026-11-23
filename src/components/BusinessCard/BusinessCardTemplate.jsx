import { Mail, Globe } from 'lucide-react';
import { ClinicallyIcon, VeganIcon, UKMapIcon } from '../BadgeIcons';
import './BusinessCard.css';

/* v2 thank-you card, packed with orders. Built from the website's own pieces
   so it reads as the same brand: the oxblood Clash heading, the ECG trace from
   "Every heartbeat counts", the ingredient cards' tinted icon tiles, a raised
   white tile for the QR and the trust badges from "Crafted with Precision &
   Purity". The back stays sparse on text: email, website, QR. Any field left
   blank is simply not printed. */
export const defaultCardData = {
    front: {
        heading: "Thank you for choosing Rhythmia",
        message: "Created by UK cardiologists to support your heart’s natural rhythm. We’re glad to be part of your day."
    },
    back: {
        heading: "We’re here for you",
        email: "admin@rhythmiaheartcare.com",
        website: "rhythmiaheartcare.com",
        qrLabel: "Scan to visit"
    }
};

/* One PQRST complex per beat, same geometry as components/RhythmLine.jsx. */
function beatPath(beats, beatW = 240, mid = 60) {
    const s = ['M 0 ' + mid];
    for (let i = 0; i < beats; i++) {
        const x = i * beatW;
        s.push(
            `H ${x + 30}`, 'q 10 -12 20 0',
            `H ${x + 76}`,
            `L ${x + 84} ${mid + 10}`,
            `L ${x + 92} ${mid - 44}`,
            `L ${x + 102} ${mid + 26}`,
            `L ${x + 110} ${mid}`,
            `H ${x + 140}`, 'q 16 -18 32 0',
            `H ${x + beatW}`
        );
    }
    return s.join(' ');
}

// Same marks and wording as the site's badge row (MadeStrip / Evidence page).
// Three, not four, so the labels can print at a legible 6pt.
const BADGES = [
    { label: 'Clinically formulated', icon: <ClinicallyIcon /> },
    { label: '100% vegan', icon: <VeganIcon /> },
    { label: 'Made in the UK', icon: <UKMapIcon /> },
];

const VIEW_W = 960;
const TRACE = beatPath(5);
// Third beat on its own (x 480–720), drawn over the faint trace.
const PULSE = 'M 500 60 H 510 q 10 -12 20 0 H 556 L 564 70 L 572 16 L 582 86 L 590 60 H 620 q 16 -18 32 0 H 690';
// Shift so the third beat's spike (x 572) sits at the card's centre line.
const CENTRE_SHIFT = VIEW_W / 2 - 572;

function CardRhythm() {
    // The whole trace faint, with the centre beat picked out in brand red —
    // the printed equivalent of the site's travelling pulse.
    return (
        <svg className="bc-rhythm" viewBox={`0 0 ${VIEW_W} 120`} preserveAspectRatio="none" aria-hidden="true">
            <g transform={`translate(${CENTRE_SHIFT} 0)`}>
                <path d={TRACE} className="bc-rhythm-track" />
                <path d={PULSE} className="bc-rhythm-pulse" />
            </g>
        </svg>
    );
}

export default function BusinessCardTemplate({ data = defaultCardData }) {
    const f = data.front || {};
    const b = data.back || {};

    const contacts = [
        { key: 'email', label: 'Email', value: b.email, Icon: Mail },
        { key: 'web', label: 'Website', value: b.website, Icon: Globe },
    ].filter(c => c.value);

    return (
        <div className="business-card-root">
            <div className="card-wrapper">

                {/* THANK-YOU SIDE */}
                <div className="card-side bc-front">
                    <img
                        src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_Black_Copy_RGB.svg"
                        alt="Rhythmia Heart Care"
                        className="bc-logo"
                    />

                    <div className="bc-note">
                        {f.heading && <div className="bc-heading">{f.heading}</div>}
                        {f.message && <p className="bc-message">{f.message}</p>}
                    </div>

                    <CardRhythm />
                </div>

                {/* CONTACT + QR SIDE */}
                <div className="card-side bc-back">
                    <div className="bc-main">
                        <div className="bc-info">
                            {b.heading && <div className="bc-back-heading">{b.heading}</div>}

                            {contacts.length > 0 && (
                                <ul className="bc-contacts">
                                    {contacts.map(({ key, label, value, Icon }) => (
                                        <li className="bc-contact" key={key}>
                                            <span className="bc-contact-icon" aria-hidden="true">
                                                <Icon strokeWidth={2} />
                                            </span>
                                            <span className="bc-contact-text">
                                                <span className="visually-hidden">{label}: </span>
                                                {value}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="bc-qr-col">
                            <div className="bc-qr-tile">
                                <img src="/assets/qr_code.svg" alt="QR code to rhythmiaheartcare.com" className="bc-qr" />
                                <span className="bc-qr-mark">
                                    <img src="/assets/logo/Rhythmia_Care_Logo_Heart_Red_RGB.svg" alt="" />
                                </span>
                            </div>
                            {b.qrLabel && <div className="bc-qr-label">{b.qrLabel}</div>}
                        </div>
                    </div>

                    <ul className="bc-badges">
                        {BADGES.map(({ label, icon }) => (
                            <li className="bc-badge" key={label}>
                                <span className="bc-badge-mark" aria-hidden="true">{icon}</span>
                                <span className="bc-badge-label">{label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
