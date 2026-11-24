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
            // A typical lead II complex. One beat is 240 units = 800 ms (75 bpm),
            // so 3 units = 10 ms; 1 mV is about 34 units of height.
            segments.push(
                // P wave: small, rounded, upright (~100 ms, ~0.15 mV)
                `H ${x + 20}`,
                `C ${x + 28} ${MID - 7}, ${x + 42} ${MID - 7}, ${x + 50} ${MID}`,
                // PR segment: QRS starts 160 ms after the P wave begins
                `H ${x + 68}`,
                // Narrow QRS (~80 ms): tiny q, tall sharp R, small s
                `L ${x + 71} ${MID + 3}`,
                `L ${x + 77} ${MID - 44}`,
                `L ${x + 85} ${MID + 7}`,
                `L ${x + 92} ${MID}`,
                // ST segment, isoelectric (~100 ms)
                `H ${x + 122}`,
                // T wave: upright and asymmetric, slower up than down (~170 ms, ~0.3 mV)
                `C ${x + 136} ${MID}, ${x + 144} ${MID - 11}, ${x + 153} ${MID - 11}`,
                `C ${x + 161} ${MID - 11}, ${x + 166} ${MID}, ${x + 174} ${MID}`,
                // TP segment back to baseline
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
