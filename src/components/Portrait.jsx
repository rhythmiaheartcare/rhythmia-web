/**
 * A person's portrait, falling back to an empty placeholder when no photo has
 * been supplied yet.
 */
export default function Portrait({ person, className = '' }) {
    if (person.photo) {
        return (
            <div className={`portrait ${className}`}>
                <img src={person.photo} alt={person.name} loading="lazy" decoding="async" />
            </div>
        )
    }

    return <div className={`portrait portrait-empty ${className}`} role="img" aria-label={person.name} />
}
