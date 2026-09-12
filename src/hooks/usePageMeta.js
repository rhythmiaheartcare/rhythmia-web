import { useEffect } from 'react'

const SITE = 'Rhythmia Heart Care'
const ORIGIN = 'https://www.rhythmiaheartcare.com'

function setMeta(selector, attr, value) {
    let el = document.head.querySelector(selector)
    if (!el) {
        el = document.createElement('meta')
        const [key, val] = selector.replace(/^meta\[|\]$/g, '').split('=')
        el.setAttribute(key, val.replace(/"/g, ''))
        document.head.appendChild(el)
    }
    el.setAttribute(attr, value)
}

/**
 * Per-page <title>, description and Open Graph tags.
 *
 * Every route previously shared the homepage's title and description, so
 * the product page was indexed and shared as "the official website of
 * Rhythmia Heart Care" rather than as the product.
 */
export function usePageMeta({ title, description, path = '/', image }) {
    useEffect(() => {
        // Suffix the site name unless the title already leads with it.
        const fullTitle = !title
            ? `${SITE} | The only heart supplement created by cardiologists`
            : title.startsWith(SITE) ? title : `${title} | ${SITE}`
        const url = ORIGIN + path
        const img = image || `${ORIGIN}/assets/photos/jar_image.png`

        document.title = fullTitle
        setMeta('meta[name="description"]', 'content', description)
        setMeta('meta[property="og:title"]', 'content', fullTitle)
        setMeta('meta[property="og:description"]', 'content', description)
        setMeta('meta[property="og:url"]', 'content', url)
        setMeta('meta[property="og:image"]', 'content', img)
        setMeta('meta[property="twitter:title"]', 'content', fullTitle)
        setMeta('meta[property="twitter:description"]', 'content', description)
        setMeta('meta[property="twitter:url"]', 'content', url)
        setMeta('meta[property="twitter:image"]', 'content', img)

        let canonical = document.head.querySelector('link[rel="canonical"]')
        if (!canonical) {
            canonical = document.createElement('link')
            canonical.setAttribute('rel', 'canonical')
            document.head.appendChild(canonical)
        }
        canonical.setAttribute('href', url)
    }, [title, description, path, image])
}

/** Inject a JSON-LD block for the current page; removed on unmount. */
export function useJsonLd(data) {
    useEffect(() => {
        if (!data) return
        const el = document.createElement('script')
        el.type = 'application/ld+json'
        el.setAttribute('data-page-schema', '')
        el.textContent = JSON.stringify(data)
        document.head.appendChild(el)
        return () => el.remove()
    }, [data])
}
