import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/** Distance from the top of the viewport to leave above an anchored section. */
function headerOffset() {
    const head = document.querySelector('.site-head')
    return (head ? head.getBoundingClientRect().height : 0) + 16
}

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Animate the window to `top`, returning a cancel function.
 *
 * Driven in JS rather than by `behavior: 'smooth'`, which is silently ignored in
 * some environments and by `overflow` on the scrolling ancestor — that left
 * in-page links doing nothing at all.
 *
 * requestAnimationFrame does not tick while a tab is hidden, so a timer backstop
 * lands the page at the target even if the animation never runs a single frame.
 */
function animateScrollTo(target, { duration = 600 } = {}) {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const end = Math.max(0, Math.min(target, max))
    const start = window.scrollY
    const distance = end - start

    const jump = () => window.scrollTo({ top: end, left: 0, behavior: 'instant' })

    if (prefersReducedMotion() || Math.abs(distance) < 2) {
        jump()
        return () => { }
    }

    let cancelled = false
    let frame = 0
    let settled = false
    const startedAt = performance.now()
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    const step = (now) => {
        if (cancelled) return
        const t = Math.min(1, (now - startedAt) / duration)
        window.scrollTo({ top: start + distance * ease(t), left: 0, behavior: 'instant' })
        if (t < 1) frame = requestAnimationFrame(step)
        else settled = true
    }
    frame = requestAnimationFrame(step)

    // Backstop: if the animation never completed (hidden tab, throttled frames),
    // put the page where it was asked to go.
    const backstop = setTimeout(() => {
        if (!cancelled && !settled) jump()
    }, duration + 80)

    return () => {
        cancelled = true
        cancelAnimationFrame(frame)
        clearTimeout(backstop)
    }
}

/**
 * Single owner of scroll position on navigation.
 *
 * Previously this was split between ScrollToTop (which fired window.scrollTo(0,0)
 * on every route change) and a hash effect inside Home, so navigating to
 * "/#contact" from another page did both: jump to the top, then scroll down
 * again. Handling it in one place removes that double movement.
 *
 * Rules:
 *  - Hash: scroll to that element, offset for the fixed header. This applies on
 *    back/forward too — a hash always means "put me at this section".
 *  - No hash, forward navigation: top of the page, instantly.
 *  - No hash, back/forward: leave it alone; the browser restores the position.
 */
export default function ScrollManager() {
    const { pathname, hash, key } = useLocation()
    const navType = useNavigationType()

    useEffect(() => {
        if (!hash) {
            if (navType !== 'POP') {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
            }
            return
        }

        let cancelScroll = () => { }
        let timer = 0
        let attempts = 0

        // The target may belong to a route that has only just mounted. Polled on
        // a timer rather than rAF so it still resolves in a background tab.
        const findAndScroll = () => {
            const el = document.querySelector(hash)
            if (!el) {
                if (attempts++ < 20) timer = setTimeout(findAndScroll, 50)
                return
            }
            // A target can ask for more room than the header alone (a sticky
            // sub-nav, say) through its scroll-margin-top.
            const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
            const offset = Math.max(headerOffset(), margin)
            const top = el.getBoundingClientRect().top + window.scrollY - offset
            cancelScroll = animateScrollTo(top)
        }
        timer = setTimeout(findAndScroll, 0)

        return () => {
            clearTimeout(timer)
            cancelScroll()
        }
        // `key` is included so clicking the same in-page link twice scrolls again.
    }, [pathname, hash, key, navType])

    return null
}
