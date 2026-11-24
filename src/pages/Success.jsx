import { CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import Footer from '../components/Footer'

export default function Success() {
    return (
        <>
            <main className="outcome">
                <div className="container outcome-inner">
                    <span className="outcome-icon outcome-icon-success">
                        <CheckCircle size={32} strokeWidth={1.75} />
                    </span>
                    <h1 className="outcome-title">Payment Successful!</h1>
                    <p className="outcome-text">
                        Thank you for your order. We are processing it and will send a confirmation
                        email shortly.
                    </p>
                    <div className="outcome-actions">
                        <Link to="/" className="btn btn-primary btn-lg">Return home</Link>
                        <Link to="/evidence" className="btn btn-secondary btn-lg">Read the evidence</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
