import React, { useState } from 'react';
import { Star, StarHalf, Check, ChevronDown, User, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { reviewService } from '../services/reviewService';

export default function ProductReviews() {
    const [isWriting, setIsWriting] = useState(false);
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '', review: '' });
    const [submitted, setSubmitted] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load reviews
    React.useEffect(() => {
        const loadReviews = async () => {
            const data = await reviewService.getApprovedReviews();
            if (data && data.length > 0) {
                setReviews(data);
            } else {
                // Keep some mock data for display if DB is empty or fails? 
                // Better to show empty state or fallback mocks if we want to impress.
                // For now, let's just use the server data or empty array.
                // UNCOMMENT below to use mocks when DB is empty:
                // setReviews(MOCK_REVIEWS);
            }
            setLoading(false);
        };
        loadReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await reviewService.addReview({
                name: formData.name,
                email: formData.email,
                rating: rating,
                comment: formData.review
            });

            setSubmitted(true);

            // Form will stay in success state
            // setTimeout(() => {
            //     setIsWriting(false);
            //     setSubmitted(false);
            //     setFormData({ name: '', email: '', review: '' });
            // }, 3500);
        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to submit review. Please try again.");
        }
    };

    // Calculate rating
    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "5.0";

    return (
        <div className="reviews-wrapper">
            <div className="reviews-header">
                <div className="rating-summary-group">
                    <div className="overall-score">
                        <span className="score-number">{averageRating}</span>
                        <div className="stars-row">
                            {[1, 2, 3, 4, 5].map(star => {
                                const score = parseFloat(averageRating);
                                if (score >= star) {
                                    return <Star key={star} size={20} fill="#D50F0F" color="#D50F0F" />;
                                } else if (score >= star - 0.5) {
                                    return (
                                        <div key={star} style={{ position: 'relative', display: 'flex' }}>
                                            <Star size={20} color="#666" fill="transparent" />
                                            <div style={{ position: 'absolute', left: 0, top: 0 }}>
                                                <StarHalf size={20} fill="#D50F0F" color="#D50F0F" />
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return <Star key={star} size={20} fill="transparent" color="#666" />;
                                }
                            })}
                        </div>
                    </div>
                    <p className="review-count">Based on {reviews.length} reviews</p>
                </div>

                <button
                    className={`write-review-btn ${isWriting ? 'active' : ''}`}
                    onClick={() => {
                        if (submitted) {
                            setSubmitted(false);
                            setFormData({ name: '', email: '', review: '' });
                            setIsWriting(true);
                        } else {
                            setIsWriting(!isWriting);
                        }
                    }}
                >
                    {isWriting && !submitted ? 'Cancel Review' : 'Write a Review'}
                </button>
            </div>

            <AnimatePresence>
                {isWriting && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="review-form"
                    >
                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleSubmit}
                                    className="form-content"
                                >
                                    <h4>Share your experience</h4>

                                    <div className="star-input">
                                        <label>Your Rating</label>
                                        <div className="stars-interactive" onMouseLeave={() => setHoverRating(0)}>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star
                                                    key={star}
                                                    size={28}
                                                    className="star-icon"
                                                    fill={(hoverRating || rating) >= star ? "#D50F0F" : "transparent"}
                                                    color={(hoverRating || rating) >= star ? "#D50F0F" : "#666"}
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onClick={() => setRating(star)}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <textarea
                                        placeholder="Write your review here..."
                                        required
                                        value={formData.review}
                                        onChange={e => setFormData({ ...formData, review: e.target.value })}
                                    />

                                    <div className="form-actions">
                                        <button type="submit" className="submit-btn" disabled={loading}>
                                            Submit Review <Send size={16} />
                                        </button>
                                    </div>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, type: "spring" }}
                                    className="success-view"
                                >
                                    <div className="success-icon-bg">
                                        <Check size={32} />
                                    </div>
                                    <h3>Review Submitted</h3>
                                    <p>Thank you! Your review has been sent for approval and will appear shortly.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="reviews-grid">
                {reviews.length === 0 && !loading && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', opacity: 0.5, padding: '2rem 0' }}>
                        No reviews yet. Be the first to share your experience!
                    </div>
                )}

                {reviews.map(review => (
                    <div key={review.id} className="review-card">
                        <div className="card-header">
                            <div className="reviewer-info">
                                <div className="avatar-placeholder">
                                    <User size={16} />
                                </div>
                                <div>
                                    <span className="reviewer-name">{review.name}</span>
                                    {review.verified && <span className="verified-badge"><Check size={10} /> Verified Buyer</span>}
                                </div>
                            </div>
                            <span className="review-date">{review.date}</span>
                        </div>
                        <div className="card-rating">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    fill={i < review.rating ? "#D50F0F" : "transparent"}
                                    color={i < review.rating ? "#D50F0F" : "#444"}
                                />
                            ))}
                        </div>
                        <p className="review-text">{review.comment}</p>
                    </div>
                ))}
            </div>

            <style>{`
                .reviews-wrapper {
                    width: 100%;
                    max-width: 100%;
                    margin: 0;
                    padding: 0;
                    background: transparent;
                    border: none;
                }
                .reviews-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    padding-bottom: 1.5rem;
                }
                .rating-summary-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                .section-label {
                    color: rgba(255,255,255,0.5);
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin: 0;
                }
                .overall-score {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .score-number {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: white;
                }
                .stars-row {
                    display: flex;
                    gap: 4px;
                }
                .review-count {
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.5);
                }
                .write-review-btn {
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.2);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-family: var(--font-main);
                    cursor: pointer;
                    transition: all 0.3s;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-size: 0.85rem;
                }
                .write-review-btn:hover, .write-review-btn.active {
                    background: rgba(255,255,255,0.1);
                    border-color: white;
                }

                /* Form */
                .review-form {
                    overflow: hidden;
                    margin-bottom: 3rem;
                    background: rgba(0,0,0,0.2);
                    border-radius: 12px;
                }
                .form-content {
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .form-content h4 {
                    font-size: 1.1rem;
                    color: white;
                    font-weight: 500;
                }
                .star-input label {
                    display: block;
                    font-size: 0.9rem;
                    margin-bottom: 0.5rem;
                    color: rgba(255,255,255,0.7);
                }
                .stars-interactive {
                    display: flex;
                    gap: 0.5rem;
                    cursor: pointer;
                    -webkit-tap-highlight-color: transparent;
                }
                .input-group {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }
                input, textarea {
                    width: 100%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 1rem;
                    border-radius: 8px;
                    color: white;
                    font-family: inherit;
                    font-size: 0.95rem;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: var(--color-secondary);
                    background: rgba(255,255,255,0.08);
                }
                input::placeholder, textarea::placeholder {
                    color: rgba(255, 255, 255, 0.5);
                }
                textarea {
                    min-height: 120px;
                    resize: none;
                }
                .submit-btn {
                    align-self: flex-start;
                    background: var(--color-secondary);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s;
                    font-family: var(--font-main);
                }
                .submit-btn:hover {
                    box-shadow: 0 4px 15px rgba(213, 15, 15, 0.4);
                    transform: translateY(-1px);
                }
                .submit-btn:disabled {
                    background: #444;
                    cursor: not-allowed;
                }

                /* Grid */
                .reviews-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                }
                .review-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    padding: 1.5rem;
                    border-radius: 12px;
                    transition: all 0.3s;
                }
                .review-card:hover {
                    background: rgba(255,255,255,0.05);
                    transform: translateY(-2px);
                }
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }
                .reviewer-info {
                    display: flex;
                    gap: 0.75rem;
                    align-items: center;
                }
                .avatar-placeholder {
                    width: 32px;
                    height: 32px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255,255,255,0.5);
                }
                .reviewer-name {
                    display: block;
                    font-weight: 600;
                    color: white;
                    font-size: 0.95rem;
                }
                .verified-badge {
                    display: flex;
                    align-items: center;
                    gap: 3px;
                    font-size: 0.7rem;
                    color: #4ade80; /* Green for verified */
                    margin-top: 2px;
                }
                .review-date {
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.4);
                }
                .card-rating {
                    margin-bottom: 0.75rem;
                    display: flex;
                    gap: 2px;
                }
                .review-text {
                    color: rgba(255,255,255,0.8);
                    font-size: 0.95rem;
                    line-height: 1.6;
                }

                @media (max-width: 768px) {
                    .reviews-wrapper {
                        padding: 0;
                    }
                    .reviews-grid {
                        grid-template-columns: 1fr;
                    }
                    .input-group {
                        grid-template-columns: 1fr;
                    }
                }

                /* Success View Styles */
                .success-view {
                    padding: 4rem 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 1rem;
                }
                .success-icon-bg {
                    width: 60px;
                    height: 60px;
                    background: rgba(74, 222, 128, 0.1); /* Green tint */
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #4ade80;
                    margin-bottom: 0.5rem;
                }
                .success-view h3 {
                    font-size: 1.5rem;
                    color: white;
                    margin: 0;
                }
                .success-view p {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.95rem;
                }

                /* Form Footer */
                .form-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                .approval-note {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.4);
                }
                .note-icon {
                    color: var(--color-secondary);
                }
            `}</style>
        </div>
    );
}
