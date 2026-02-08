import React from 'react';
import './BusinessCard.css';

export const defaultCardData = {
    front: {
        tagline: "Empowering Your Heart Health"
    },
    back: {
        name: "Dr. Mohamed Zuhair",
        title: "Chief Medical Officer",
        email: "mohamed@rhythmiaheartcare.com",
        phone: "+44 7894 883492",
        website: "www.rhythmiaheartcare.com",
        address: "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ",
        qrLabel: "Scan to Visit"
    }
};

export default function BusinessCardTemplate({ data = defaultCardData }) {
    const d = data;

    // Contact Icons
    const PhoneIcon = () => (
        <svg viewBox="0 0 24 24" className="detail-icon">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
    );

    const EmailIcon = () => (
        <svg viewBox="0 0 24 24" className="detail-icon">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
    );

    const WebIcon = () => (
        <svg viewBox="0 0 24 24" className="detail-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
    );

    const PinIcon = () => (
        <svg viewBox="0 0 24 24" className="detail-icon" style={{ transform: 'scale(1.5) translateX(1px) translateY(-1px)' }}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
    );

    return (
        <div className="business-card-root">
            <div className="card-wrapper">

                {/* FRONT OF CARD */}
                <div className="card-side card-front">
                    <div className="bg-pattern"></div>
                    <div className="glow"></div>
                    <img
                        src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_White_Copy_RGB.svg"
                        alt="Rhythmia Heart Care"
                        className="logo"
                    />
                    {d.front.tagline && <div className="tagline">{d.front.tagline}</div>}
                </div>

                {/* BACK OF CARD */}
                <div className="card-side card-back">
                    <div className="bg-pattern"></div>

                    <div className="info-col">
                        <div className="title-block">
                            <div className="name">{d.back.name}</div>
                            <div className="role">{d.back.title}</div>
                        </div>

                        <div className="contact-details">
                            {d.back.email && (
                                <div className="detail-row">
                                    <EmailIcon />
                                    <span>{d.back.email}</span>
                                </div>
                            )}
                            {d.back.phone && (
                                <div className="detail-row">
                                    <PhoneIcon />
                                    <span>{d.back.phone}</span>
                                </div>
                            )}
                            {d.back.website && (
                                <div className="detail-row">
                                    <WebIcon />
                                    <span>{d.back.website}</span>
                                </div>
                            )}
                            {d.back.address && (
                                <div className="detail-row">
                                    <PinIcon />
                                    <span>{d.back.address}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="qr-col">
                        <div className="qr-code">
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                <img src="/assets/qr_code.svg" alt="Scan QR" style={{ width: '100%', height: '100%', display: 'block' }} />
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '25%', height: '25%', backgroundColor: 'transparent', padding: '2px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src="/assets/logo/Rhythmia_Care_Logo_Heart_Red_RGB.svg" alt="Logo" style={{ width: '100%', height: 'auto' }} />
                                </div>
                            </div>
                        </div>
                        {d.back.qrLabel && <div className="qr-label">{d.back.qrLabel}</div>}
                    </div>

                </div>
            </div>
        </div>
    );
}
