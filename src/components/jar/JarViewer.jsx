import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/* The 3D stack is ~200 KB gzipped, so it is a separate chunk that is only
   fetched once the jar is about to scroll into view. */
const JarScene = lazy(() => import('./JarScene'))

const POSTER = '/assets/photos/jar_cutout.png'

function canRender3D() {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    try {
        const canvas = document.createElement('canvas')
        return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch {
        return false
    }
}

/**
 * The jar, in 3D where it can be and as the photograph where it can't.
 *
 * While the scene loads there is only a quiet spinner; the photograph is
 * used solely on devices without WebGL or for people who prefer reduced
 * motion. The scene only renders while it is on screen.
 */
export default function JarViewer({ className = '' }) {
    const stageRef = useRef(null)
    const [enabled] = useState(canRender3D)
    const [near, setNear] = useState(false)
    const [visible, setVisible] = useState(false)
    const [ready, setReady] = useState(false)
    // The original's hint: shown once the jar is on screen, fading over four
    // seconds, and gone the moment it is touched.
    const [hint, setHint] = useState(false)
    useEffect(() => {
        if (!ready || !visible) return
        setHint(true)
        const t = setTimeout(() => setHint(false), 4000)
        return () => clearTimeout(t)
    }, [ready, visible])

    useEffect(() => {
        if (!enabled || !stageRef.current) return
        const el = stageRef.current
        // Start loading a screen early; render only while actually visible.
        const loader = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                setNear(true)
                loader.disconnect()
            }
        }, { rootMargin: '100% 0px' })
        const watcher = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 })
        loader.observe(el)
        watcher.observe(el)
        return () => {
            loader.disconnect()
            watcher.disconnect()
        }
    }, [enabled])

    return (
        <div
            ref={stageRef}
            className={`jar-stage ${ready ? 'is-ready' : ''} ${className}`}
            onPointerDown={() => setHint(false)}
        >
            {!enabled && (
                <img
                    className="jar-poster"
                    src={POSTER}
                    alt="Rhythmia Heart Care jar, 60 capsules"
                    width={760}
                    height={1209}
                    loading="lazy"
                    decoding="async"
                />
            )}
            {enabled && !ready && <span className="jar-loading" aria-hidden="true" />}
            {enabled && near && (
                <div className="jar-canvas" aria-hidden="true">
                    <Suspense fallback={null}>
                        <JarScene active={visible} onReady={() => setReady(true)} />
                    </Suspense>
                </div>
            )}
            {hint && (
                <div className="jar-hint" aria-hidden="true">
                    <span className="jar-hint-arrow jar-hint-arrow-left"><ChevronLeft size={28} strokeWidth={1.75} /></span>
                    <span className="jar-hint-pill">Drag to Rotate</span>
                    <span className="jar-hint-arrow jar-hint-arrow-right"><ChevronRight size={28} strokeWidth={1.75} /></span>
                </div>
            )}
        </div>
    )
}
