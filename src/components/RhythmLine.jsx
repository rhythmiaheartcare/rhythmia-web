import { useMemo } from 'react'

/**
 * A decorative ECG trace.
 *
 * The product is about the heart's *electrical* rhythm, so the hero motif is an
 * actual PQRST complex rather than generic abstract shapes. Drawn as a single
 * inline SVG path — no WebGL, no library, a few hundred bytes.
 */
export default function RhythmLine({ beats = 5, className = '' }) {
    const BEAT_W = 240
    const MID = 60

    const path = useMemo(() => {
        const segments = ['M 0 ' + MID]
        for (let i = 0; i < beats; i++) {
            const x = i * BEAT_W
            segments.push(
                // baseline into the P wave
                `H ${x + 30}`,
                `q 10 -12 20 0`,
                // baseline into the QRS complex
                `H ${x + 76}`,
                `L ${x + 84} ${MID + 10}`,
                `L ${x + 92} ${MID - 44}`,
                `L ${x + 102} ${MID + 26}`,
                `L ${x + 110} ${MID}`,
                // baseline into the T wave
                `H ${x + 140}`,
                `q 16 -18 32 0`,
                `H ${x + BEAT_W}`
            )
        }
        return segments.join(' ')
    }, [beats])

    const width = beats * BEAT_W

    return (
        <svg
            className={`rhythm-line ${className}`}
            viewBox={`0 0 ${width} 120`}
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
            focusable="false"
        >
            {/* Static trace */}
            <path d={path} className="rhythm-line-track" />
            {/* Pulse travelling along the same path */}
            <path d={path} className="rhythm-line-pulse" pathLength="1000" />
        </svg>
    )
}
