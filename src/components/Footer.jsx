import { Instagram } from 'lucide-react'

/**
 * Two columns: brand on the left, company particulars on the right — the
 * original footer's structure, rebuilt on the design system.
 */
export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer" data-surface="ink-deep">
            <div className="container footer-grid">
                {/* Brand */}
                <div className="footer-brand">
                    <img
                        src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_White_Copy_RGB.svg"
                        alt="Rhythmia Heart Care"
                        width="180"
                        height="40"
                    />

                    <ul className="footer-badges">
                        <li>Made in the UK</li>
                        <li>
                            <img src="/assets/vegan-friendly.svg" alt="" width="20" height="17" />
                            Vegan friendly
                        </li>
                    </ul>

                    <a
                        href="https://www.instagram.com/rhythmiaheartcare/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-social"
                        aria-label="Rhythmia Heart Care on Instagram"
                    >
                        <Instagram size={18} strokeWidth={1.75} aria-hidden="true" />
                        <span>@rhythmiaheartcare</span>
                    </a>

                </div>

                {/* Company */}
                <dl className="footer-details">
                    <div>
                        <dt>Company</dt>
                        <dd>Afiamed Ltd</dd>
                    </div>
                    <div>
                        <dt>Registration</dt>
                        <dd>No. 16626732</dd>
                    </div>
                    <div>
                        <dt>Headquarters</dt>
                        <dd>
                            <address>
                                71&ndash;75 Shelton Street<br />
                                Covent Garden<br />
                                London WC2H 9JQ<br />
                                England
                            </address>
                        </dd>
                    </div>
                </dl>

                {/* Last in the DOM so it falls to the bottom on phones; placed under
                    the brand column on wider screens. */}
                <p className="footer-copyright">© {year} Afiamed Ltd. All rights reserved.</p>
            </div>
        </footer>
    )
}
