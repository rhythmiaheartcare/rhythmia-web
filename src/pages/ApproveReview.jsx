import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { reviewService } from '../services/reviewService';
import { Check, X, Loader } from 'lucide-react';

export default function ApproveReview() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying approval token...');

    useEffect(() => {
        const approve = async () => {
            const id = searchParams.get('id');
            const token = searchParams.get('token');

            if (!id || !token) {
                setStatus('error');
                setMessage('Invalid approval link. Missing parameters.');
                return;
            }

            try {
                await reviewService.approveReview(id, token);
                setStatus('success');
                setMessage('Review approved successfully! It is now live on the site.');
            } catch (error) {
                console.error(error);
                setStatus('error');
                setMessage(error.message || 'Failed to approve review.');
            }
        };

        approve();
    }, [searchParams]);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0a',
            color: 'white',
            fontFamily: 'var(--font-main)',
            padding: '1rem'
        }}>
            <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '3rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%'
            }}>
                {status === 'verifying' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <Loader className="animate-spin" size={48} color="rgba(255,255,255,0.5)" />
                        <h3>Approving...</h3>
                    </div>
                )}

                {status === 'success' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '64px', height: '64px', borderRadius: '50%',
                            background: 'rgba(74, 222, 128, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#4ade80'
                        }}>
                            <Check size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Approved!</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>{message}</p>
                        <button
                            onClick={() => navigate('/product')}
                            style={{
                                marginTop: '1rem',
                                padding: '0.75rem 1.5rem',
                                background: 'white',
                                color: 'black',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            View Product Page
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '64px', height: '64px', borderRadius: '50%',
                            background: 'rgba(220, 38, 38, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#ef4444'
                        }}>
                            <X size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Error</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
