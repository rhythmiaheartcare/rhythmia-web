import React, { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'


export default function Success() {
    return (
        <div className="success-page">
            <div className="success-card">
                <CheckCircle size={80} className="text-secondary mb-6" />
                <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
                <p className="text-gray-400 mb-8">
                    Thank you for your order. We are processing it and will send a confirmation email shortly.
                </p>
                <Link to="/" className="home-btn">
                    Return to Home
                </Link>
            </div>
            <style>{`
                .success-page {
                    min-height: 100vh;
                    background-color: var(--color-quaternary);
                    color: var(--color-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 2rem;
                }
                .success-card {
                    background: rgba(0,0,0,0.2);
                    padding: 3rem;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.1);
                    max-width: 500px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .text-secondary { color: var(--color-secondary); }
                .home-btn {
                    padding: 0.75rem 2rem;
                    background: transparent;
                    border: 1px solid var(--color-primary);
                    color: var(--color-primary);
                    border-radius: 8px;
                    text-decoration: none;
                    transition: all 0.3s;
                }
                .home-btn:hover {
                    background: var(--color-primary);
                    color: var(--color-quaternary);
                }
            `}</style>
        </div>
    )
}
