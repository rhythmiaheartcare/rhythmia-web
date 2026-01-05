import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-root">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <img
                            src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_White_Copy_RGB.svg"
                            alt="Rhythmia Heart Care"
                            className="footer-logo"
                        />
                        <div className="brand-badges desktop-only-flex">
                            <span className="made-in-uk">Made in the UK</span>
                            <div className="vegan-badge-small">
                                <img src="/assets/vegan-friendly.svg" alt="Vegan Friendly" className="vegan-icon-small" />
                                <span>Vegan Friendly</span>
                            </div>
                        </div>
                        <p className="copyright-text">
                            © {currentYear} Afiamed Ltd. All rights reserved.
                        </p>
                    </div>

                    {/* Company Details Section */}
                    <div className="footer-details">
                        <div className="detail-group">
                            <span className="detail-label">Company</span>
                            <span className="detail-value">AFIAMED LTD</span>
                        </div>

                        <div className="detail-group">
                            <span className="detail-label">Registration</span>
                            <span className="detail-value">No. 16626732</span>
                        </div>

                        <div className="detail-group">
                            <span className="detail-label">Headquarters</span>
                            <address className="detail-value address">
                                71-75 Shelton Street<br />
                                London, England<br />
                                WC2H 9JQ
                            </address>
                        </div>

                        {/* Mobile Only Badge Placement */}
                        <div className="mobile-badges mobile-only">
                            <span className="made-in-uk">Made in the UK</span>
                            <div className="vegan-badge-small">
                                <img src="/assets/vegan-friendly.svg" alt="Vegan Friendly" className="vegan-icon-small" />
                                <span>Vegan Friendly</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .footer-root {
                    background-color: #38080c; /* Slightly darker than quaternary for contrast */
                    color: var(--color-primary);
                    padding: 5rem 0 3rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    margin-top: auto;
                }

                .footer-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                }

                /* Brand Column */
                .footer-brand {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .footer-logo {
                    width: 180px;
                    height: auto;
                    filter: brightness(0) invert(1); 
                    opacity: 0.9;
                }
                
                .brand-badges {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 0.5rem;
                }
                
                .made-in-uk {
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.9);
                }
                
                .vegan-badge-small {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .vegan-icon-small {
                    width: 24px;
                    height: 24px;
                    filter: brightness(0) invert(1);
                }
                
                .vegan-badge-small span {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.9);
                }

                .copyright-text {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.4);
                    margin: 0;
                }

                /* Details Column */
                .footer-details {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2.5rem;
                    text-align: left;
                }

                .detail-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .detail-label {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: var(--color-secondary);
                    font-weight: 600;
                    opacity: 0.8;
                }

                .detail-value {
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.8);
                    font-weight: 400;
                    line-height: 1.5;
                }
                
                .font-medium {
                    font-weight: 500;
                    color: white;
                }

                .address {
                    font-style: normal;
                }
                
                .mobile-only {
                    display: none;
                }
                
                .desktop-only-flex {
                    display: flex;
                }

                @media (max-width: 900px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }

                    .footer-brand {
                        align-items: center;
                        text-align: center;
                        padding-bottom: 2rem;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    }
                    
                    .desktop-only-flex {
                        display: none;
                    }
                    
                    .mobile-only {
                        display: flex;
                    }
                    
                    .footer-details {
                        grid-template-columns: repeat(2, 1fr);
                        text-align: center;
                        justify-content: center;
                        gap: 2rem;
                        row-gap: 3rem;
                    }

                    .detail-group:nth-child(3) { /* Headquarters */
                        grid-column: span 2;
                    }
                    
                    .mobile-badges {
                        grid-column: span 2;
                        flex-direction: column;
                        align-items: center;
                        gap: 1rem;
                        margin-top: 1rem;
                        opacity: 0.8;
                    }

                    /* Center content in groups on mobile */
                    .detail-group {
                        align-items: center;
                    }
                }
            `}</style>
        </footer>
    )
}
