/**
 * A person's portrait, falling back to the Rhythmia heart mark when no photo
 * has been supplied yet. Pass loading="eager" where the portrait appears on demand
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

    return (
        <div className={`portrait portrait-empty ${className}`} role="img" aria-label={person.name}>
            <img
                className="portrait-mark"
                src="/assets/just_heart_logo/Rhythmia_Care_Logo_Heart_Red_RGB.svg"
                alt=""
                aria-hidden="true"
            />
        </div>
    )
}
