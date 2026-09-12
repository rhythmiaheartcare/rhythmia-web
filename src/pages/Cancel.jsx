import { XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import Footer from '../components/Footer'

export default function Cancel() {
    return (
        <>
            <main className="outcome">
                <div className="container outcome-inner">
                    <span className="outcome-icon outcome-icon-cancel">
                        <XCircle size={32} strokeWidth={1.75} />
                    </span>
                    <h1 className="outcome-title">Payment cancelled</h1>
                    <p className="outcome-text">
                        Your payment wasn&rsquo;t processed and you haven&rsquo;t been charged. You can
                        pick up where you left off whenever you&rsquo;re ready.
                    </p>
                    <div className="outcome-actions">
                        <Link to="/product" className="btn btn-primary btn-lg">Try again</Link>
                        <Link to="/" className="btn btn-secondary btn-lg">Return home</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
