import { initials } from '../data/people'

/**
 * A person's portrait, falling back to an initials monogram when no photo has
 * been supplied yet. Keeps the page presentable while headshots are outstanding
 * rather than leaving broken images or empty boxes.
 */
export default function Portrait({ person, className = '' }) {
    if (person.photo) {
        return (
            <div className={`portrait ${className}`}>
                <img src={person.photo} alt={person.name} loading="lazy" decoding="async" />
            </div>
        )
    }

    return (
        <div className={`portrait portrait-empty ${className}`} role="img" aria-label={person.name}>
            <span aria-hidden="true">{initials(person.name)}</span>
        </div>
    )
}
