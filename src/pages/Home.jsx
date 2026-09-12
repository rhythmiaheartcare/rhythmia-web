import Header from '../components/Header'
import Reassurance from '../components/Reassurance'
import Product from '../components/Product'
import EvidenceStrip from '../components/EvidenceStrip'
import FoundersBand from '../components/FoundersBand'
import EveryHeartbeat from '../components/EveryHeartbeat'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Home() {
    usePageMeta({
        title: null,
        description: 'Daily support for your heart’s electrical rhythm. Created by UK cardiologists, formulated from published research. Now available in Selfridges.',
        path: '/',
    })

    return (
        <>
            <a className="skip-link" href="#main">Skip to content</a>

            <Header />

            {/* Narrative order: reassure, the product itself, the proof, the people
                behind it, then why rhythm matters as the closing argument before the
                contact form. The hero states the positioning in its headline
                ("electrical rhythm"); the fuller plumbing-versus-wiring argument is
                made in "Why rhythm matters". The long "Who we are" and "Our Story"
                sections moved to /about; FoundersBand keeps the cardiologist
                credibility on the page in short form. */}
            <main id="main">
                <Reassurance />
                <Product />
                <EvidenceStrip />
                <FoundersBand />
                <EveryHeartbeat />
                <ContactUs />
            </main>

            <Footer />
        </>
    )
}
