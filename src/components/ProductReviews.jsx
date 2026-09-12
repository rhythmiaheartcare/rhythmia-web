import { useState } from 'react'
import { Star, Check, User, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { reviewService } from '../services/reviewService'

function Stars({ value, size = 16 }) {
    return (
        <span className="stars" aria-label={`${value} out of 5`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    strokeWidth={1.5}
                    className={value >= star ? 'star is-filled' : 'star'}
                    aria-hidden="true"
                />
            ))}
        </span>
    )
}

export default function ProductReviews({ reviews = [], loading = false }) {
    const [isWriting, setIsWriting] = useState(false)
    const [rating, setRating] = useState(5)
    const [hoverRating, setHoverRating] = useState(0)
    const [form, setForm] = useState({ name: '', email: '', review: '' })
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        try {
            await reviewService.addReview({
                name: form.name,
                email: form.email,
                rating,
                comment: form.review,
            })
            setSubmitted(true)
        } catch (err) {
            console.error('Review submission failed', err)
            setError(true)
        }
    }

    // Only average what actually exists. This previously fell back to "5.0"
    // when there were no reviews, showing five filled stars above the words
    // "Based on 0 reviews".
    const hasReviews = reviews.length > 0
    const averageRating = hasReviews
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : null

    const openForm = () => {
        if (submitted) {
            setSubmitted(false)
            setForm({ name: '', email: '', review: '' })
            setRating(5)
        }
        setIsWriting(true)
    }

    return (
        <div className="reviews">
            <div className="reviews-head">
                <div>
                    {loading ? (
                        <p className="reviews-count">Loading reviews…</p>
                    ) : hasReviews ? (
                        <>
                            <div className="reviews-score">
                                <span className="reviews-score-num">{averageRating}</span>
                                <Stars value={parseFloat(averageRating)} size={20} />
                            </div>
                            <p className="reviews-count">
                                Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                            </p>
                        </>
                    ) : (
                        <p className="reviews-count">
                            No reviews yet — be the first to share your experience.
                        </p>
                    )}
                </div>

                <button
                    className="btn btn-secondary"
                    onClick={() => (isWriting && !submitted ? setIsWriting(false) : openForm())}
                >
                    {isWriting && !submitted ? 'Cancel' : 'Write a review'}
                </button>
            </div>

            <AnimatePresence initial={false}>
                {isWriting && (
                    <motion.div
                        key="form"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        {submitted ? (
                            <div className="review-form review-success" role="status">
                                <span className="review-success-icon">
                                    <Check size={24} strokeWidth={2.5} />
                                </span>
                                <h4>Review submitted</h4>
                                <p>
                                    Thank you. Your review has been sent for approval and will appear
                                    shortly.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="review-form">
                                <h4>Share your experience</h4>

                                <div className="field">
                                    <span className="field-label">Your rating</span>
                                    <div className="star-input" onMouseLeave={() => setHoverRating(0)}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                aria-label={`${star} star${star > 1 ? 's' : ''}`}
                                                aria-pressed={rating === star}
                                            >
                                                <Star
                                                    size={26}
                                                    strokeWidth={1.5}
                                                    className={(hoverRating || rating) >= star ? 'star is-filled' : 'star'}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="review-form-row">
                                    <div className="field">
                                        <label htmlFor="review-name">Your name</label>
                                        <input
                                            id="review-name"
                                            type="text"
                                            required
                                            autoComplete="name"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="review-email">Email address</label>
                                        <input
                                            id="review-email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label htmlFor="review-body">Your review</label>
                                    <textarea
                                        id="review-body"
                                        rows="4"
                                        required
                                        value={form.review}
                                        onChange={(e) => setForm({ ...form, review: e.target.value })}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Submit review
                                    <Send size={16} strokeWidth={2} />
                                </button>

                                {error && (
                                    <p className="form-status form-status-error" role="alert">
                                        Something went wrong. Please try again.
                                    </p>
                                )}
                            </form>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {hasReviews && (
                <ul className="review-grid">
                    {reviews.map((review) => (
                        <li key={review.id} className="review">
                            <div className="review-head">
                                <span className="review-avatar">
                                    <User size={16} strokeWidth={2} />
                                </span>
                                <div>
                                    <span className="review-name">{review.name}</span>
                                    {review.verified && (
                                        <span className="review-verified">
                                            <Check size={11} strokeWidth={3} /> Verified buyer
                                        </span>
                                    )}
                                </div>
                                <span className="review-date">{review.date}</span>
                            </div>
                            <Stars value={review.rating} size={14} />
                            <p className="review-text">{review.comment}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
