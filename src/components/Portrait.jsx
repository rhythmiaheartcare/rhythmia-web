/**
 * A person's portrait, falling back to an empty placeholder when no photo has
 * been supplied yet. Pass loading="eager" where the portrait appears on demand
 * (the bio pop-up), so the photo is there the moment it opens.
 */
export default function Portrait({ person, className = '', loading = 'lazy' }) {
    if (person.photo) {
        return (
            <div className={`portrait ${className}`}>
                <img src={person.photo} alt={person.name} loading={loading} decoding="async" />
            </div>
        )
    }

    return <div className={`portrait portrait-empty ${className}`} role="img" aria-label={person.name} />
}
