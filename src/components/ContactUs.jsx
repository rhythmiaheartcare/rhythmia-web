import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Mail, MapPin } from 'lucide-react'

export default function ContactUs() {
    const [formStatus, setFormStatus] = useState('idle') // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormStatus('submitting')

        const formData = new FormData(e.target)

        try {
            const response = await fetch('https://formsubmit.co/ajax/info@rhythmiaheartcare.com', {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                setFormStatus('success')
                e.target.reset()
            } else {
                setFormStatus('error')
            }
        } catch (error) {
            setFormStatus('error')
        }
    }

    return (
        <section className="contact-section" id="contact">
            {/* Background Pattern */}
            <div className="contact-bg-pattern"></div>

            <div className="container relative z-10">
                <div className="contact-grid">
                    {/* Left Column: Text & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="contact-info"
                    >
                        <h2 className="section-title text-primary">Get in Touch</h2>
                        <div className="divider bg-secondary" style={{ width: '80px', backgroundColor: 'var(--color-secondary)' }}></div>

                        <p className="contact-desc">
                            Have a question about Rhythmia? We’re here to help you understand how to support your heart’s rhythm naturaly.
                        </p>

                        {/* Contact Details Removed as per request */}
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="contact-form-wrapper"
                    >
                        {formStatus === 'success' ? (
                            <div className="success-message">
                                <CheckCircle size={48} color="#4ade80" />
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. We will get back to you shortly.</p>
                                <button onClick={() => setFormStatus('idle')} className="reset-btn">Send another message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                {/* FormSubmit Configuration */}
                                <input type="hidden" name="_subject" value="New Contact from Rhythmia Website" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_template" value="table" />

                                <div className="form-group">
                                    <input type="text" name="name" required placeholder=" " className="form-input" />
                                    <label className="form-label">Your Name</label>
                                </div>

                                <div className="form-group">
                                    <input type="email" name="email" required placeholder=" " className="form-input" />
                                    <label className="form-label">Email Address</label>
                                </div>

                                <div className="form-group">
                                    <textarea name="message" required rows="4" placeholder=" " className="form-input textarea"></textarea>
                                    <label className="form-label">How can we help?</label>
                                </div>

                                <button type="submit" className="submit-btn" disabled={formStatus === 'submitting'}>
                                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                                    {!formStatus === 'submitting' && <Send size={18} />}
                                </button>

                                {formStatus === 'error' && (
                                    <div className="error-message">
                                        <AlertCircle size={16} />
                                        <span>Something went wrong. Please try again.</span>
                                    </div>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>

            <style>{`
                .contact-section {
                    position: relative;
                    padding: 8rem 0;
                    background-color: var(--color-quaternary); /* Dark brand color */
                    background: linear-gradient(180deg, var(--color-quaternary) 0%, #2a0507 100%);
                    overflow: hidden;
                    color: white;
                }

                .contact-bg-pattern {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url('/assets/pattern/Rhythmia_Care_Pattern_Red.svg');
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: cover;
                    opacity: 0.05;
                    pointer-events: none;
                }

                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6rem;
                    align-items: center;
                }

                .contact-desc {
                    font-size: 1.15rem;
                    line-height: 1.6;
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 3rem;
                    max-width: 90%;
                }

                .contact-details {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .icon-box {
                    width: 50px;
                    height: 50px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .contact-item .label {
                    display: block;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: rgba(255, 255, 255, 0.5);
                    margin-bottom: 0.2rem;
                }

                .contact-item .value {
                    font-size: 1.1rem;
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                }
                
                .contact-item a.value:hover {
                    color: var(--color-secondary);
                }

                /* Form */
                .contact-form-wrapper {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 3rem;
                    border-radius: 24px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                }

                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .form-group {
                    position: relative;
                }

                .form-input {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 0.8rem 0;
                    color: white;
                    font-size: 1rem;
                    font-family: inherit;
                    transition: border-color 0.3s;
                    border-radius: 0;
                }

                .form-input:focus {
                    outline: none;
                    border-color: var(--color-secondary);
                }

                .form-input.textarea {
                    resize: none;
                }

                .form-label {
                    position: absolute;
                    top: 0.8rem;
                    left: 0;
                    color: rgba(255, 255, 255, 0.5);
                    pointer-events: none;
                    transition: 0.3s ease all;
                    font-size: 1rem;
                }

                .form-input:focus ~ .form-label,
                .form-input:not(:placeholder-shown) ~ .form-label {
                    top: -1.2rem;
                    font-size: 0.85rem;
                    color: var(--color-secondary);
                }

                .submit-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    background-color: var(--color-secondary);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-top: 1rem;
                    font-family: inherit;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .submit-btn:hover:not(:disabled) {
                    background-color: #ff1f1f;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(213, 15, 15, 0.3);
                }
                
                .submit-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                /* Success State */
                .success-message {
                    text-align: center;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }
                
                .success-message h3 {
                    font-size: 1.5rem;
                    color: white;
                }
                
                .success-message p {
                    color: rgba(255, 255, 255, 0.7);
                    margin-bottom: 1.5rem;
                }
                
                .reset-btn {
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    padding: 0.5rem 1.5rem;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-family: var(--font-main);
                }
                
                .reset-btn:hover {
                    border-color: var(--color-secondary);
                    color: var(--color-secondary);
                }
                
                .error-message {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #ff4d4d;
                    font-size: 0.9rem;
                    margin-top: -1rem;
                }

                @media (max-width: 900px) {
                    .contact-grid {
                        grid-template-columns: 1fr;
                        gap: 4rem;
                    }
                    
                    .contact-bg-pattern {
                        width: 100%;
                        opacity: 0.03;
                    }
                    
                    .contact-form-wrapper {
                        padding: 2rem;
                    }
                    
                    .section-title {
                        font-size: 2.5rem;
                    }
                }
            `}</style>
        </section>
    )
}
