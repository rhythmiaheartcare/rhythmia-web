import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactUs() {
    const [status, setStatus] = useState('idle') // idle | submitting | success | error

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('submitting')

        const formData = new FormData(e.target)

        try {
            const response = await fetch('https://formsubmit.co/ajax/info@rhythmiaheartcare.com', {
                method: 'POST',
                body: formData,
            })
            if (response.ok) {
                setStatus('success')
                e.target.reset()
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    return (
        <section className="section" id="contact">
            <div className="container">
                <div className="contact-grid">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="eyebrow">Contact</p>
                        <h2 className="section-heading">Get in touch</h2>
                        <p className="lead">
                            Have a question about Rhythmia? We&rsquo;re here to help you understand how
                            to support your heart&rsquo;s rhythm naturally.
                        </p>
                        <p className="prose" style={{ marginTop: 'var(--space-6)' }}>
                            If you are taking prescribed medication or being treated for a heart
                            condition, speak to your doctor before starting any supplement.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {status === 'success' ? (
                            <div className="contact-form" role="status">
                                <div className="form-status form-status-success">
                                    <CheckCircle size={20} strokeWidth={2} />
                                    <span>
                                        <strong>Message sent.</strong> Thank you for reaching out — we&rsquo;ll
                                        get back to you shortly.
                                    </span>
                                </div>
                                <button onClick={() => setStatus('idle')} className="btn btn-secondary">
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                <input type="hidden" name="_subject" value="New Contact from Rhythmia Website" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_template" value="table" />

                                <div className="field">
                                    <label htmlFor="contact-name">Your name</label>
                                    <input id="contact-name" type="text" name="name" required autoComplete="name" />
                                </div>

                                <div className="field">
                                    <label htmlFor="contact-email">Email address</label>
                                    <input id="contact-email" type="email" name="email" required autoComplete="email" />
                                </div>

                                <div className="field">
                                    <label htmlFor="contact-message">How can we help?</label>
                                    <textarea id="contact-message" name="message" required rows="5" />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    disabled={status === 'submitting'}
                                >
                                    {status === 'submitting' ? 'Sending…' : 'Send message'}
                                    {status !== 'submitting' && <Send size={18} strokeWidth={2} />}
                                </button>

                                {status === 'error' && (
                                    <div className="form-status form-status-error" role="alert">
                                        <AlertCircle size={18} strokeWidth={2} />
                                        <span>Something went wrong. Please try again.</span>
                                    </div>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
