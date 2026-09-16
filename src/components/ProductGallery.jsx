import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Box, Images } from 'lucide-react'
import JarViewer from './jar/JarViewer'

/**
 * The product hero photographs: a swipeable, mouse-draggable carousel.
 * Embla handles the touch physics — momentum, snapping, the rubber-band at
 * either end — which is what makes it feel native rather than like a fade
 * between images. Navigation is deliberately quiet: centred dots, and
 * arrows that only show on hover for pointer devices; on touch you swipe.
 * "View in 3D" swaps the photographs for the interactive jar in the same
 * frame; the 3D code only loads when someone asks for it.
 */
export default function ProductGallery({ images }) {
    const [viewportRef, embla] = useEmblaCarousel({
        loop: true,
        duration: 22,
        align: 'start',
    })
    const [index, setIndex] = useState(0)
    const [threeD, setThreeD] = useState(false)

    useEffect(() => {
        if (!embla) return
        const onSelect = () => setIndex(embla.selectedScrollSnap())
        onSelect()
        embla.on('select', onSelect)
        return () => embla.off('select', onSelect)
    }, [embla])

    const goTo = useCallback((i) => embla && embla.scrollTo(i), [embla])
    const prev = useCallback(() => embla && embla.scrollPrev(), [embla])
    const next = useCallback(() => embla && embla.scrollNext(), [embla])

    return (
        <div className="pdp-hero-media">
            <div
                className="gallery-viewport"
                ref={viewportRef}
                aria-roledescription="carousel"
                aria-label="Product photographs"
            >
                <div className="gallery-track">
                    {images.map((img, i) => (
                        <div
                            className="gallery-slide"
                            key={img.src}
                            aria-roledescription="slide"
                            aria-label={`${i + 1} of ${images.length}: ${img.label}`}
                            aria-hidden={i !== index}
                        >
                            {/* Eager for all four: they are already sized for the frame
                                and a lazy image would flash in on the first swipe. */}
                            <img src={img.src} alt={img.alt} draggable="false" decoding="async" />
                        </div>
                    ))}
                </div>
            </div>

            {threeD && (
                <div className="gallery-3d">
                    <JarViewer />
                </div>
            )}

            <button
                type="button"
                className="gallery-mode"
                onClick={() => setThreeD((v) => !v)}
                aria-pressed={threeD}
            >
                {threeD ? <Images size={16} strokeWidth={1.75} /> : <Box size={16} strokeWidth={1.75} />}
                {threeD ? 'Photos' : 'View in 3D'}
            </button>

            {!threeD && (
                <>
                    <button type="button" className="gallery-arrow is-prev" onClick={prev} aria-label="Previous photograph">
                        <ChevronLeft size={20} strokeWidth={1.75} />
                    </button>
                    <button type="button" className="gallery-arrow is-next" onClick={next} aria-label="Next photograph">
                        <ChevronRight size={20} strokeWidth={1.75} />
                    </button>
                </>
            )}

            {!threeD && <div className="gallery-dots" role="tablist" aria-label="Choose a photograph">
                {images.map((img, i) => (
                    <button
                        type="button"
                        role="tab"
                        key={img.src}
                        className={i === index ? 'is-active' : ''}
                        onClick={() => goTo(i)}
                        aria-label={img.label}
                        aria-selected={i === index}
                    />
                ))}
            </div>}
        </div>
    )
}
