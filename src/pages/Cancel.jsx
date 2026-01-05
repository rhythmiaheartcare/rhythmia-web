import React from 'react'
import { XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Cancel() {
    return (
        <div className="cancel-page">
            <div className="cancel-card">
                <XCircle size={80} className="text-red-500 mb-6" />
                <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
                <p className="text-gray-400 mb-8">
                    Your payment was not processed. You can try again whenever you're ready.
                </p>
                <Link to="/product" className="retry-btn">
                    Try Again
                </Link>
            </div>
            <style>{`
                .cancel-page {
                    min-height: 100vh;
                    background-color: var(--color-quaternary);
                    color: var(--color-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 2rem;
                }
                .cancel-card {
                    background: rgba(0,0,0,0.2);
                    padding: 3rem;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.1);
                    max-width: 500px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .text-red-500 { color: #ff4444; }
                .retry-btn {
                    padding: 0.75rem 2rem;
                    background: var(--color-secondary);
                    color: white;
                    border-radius: 8px;
                    text-decoration: none;
                    transition: all 0.3s;
                }
                .retry-btn:hover {
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    )
}
