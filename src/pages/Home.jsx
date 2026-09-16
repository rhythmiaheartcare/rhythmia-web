import Header from '../components/Header'
import Reassurance from '../components/Reassurance'
import Product from '../components/Product'
import EvidenceStrip from '../components/EvidenceStrip'
import MadeStrip from '../components/MadeStrip'
import WhoWeAre from '../components/WhoWeAre'
import EveryHeartbeat from '../components/EveryHeartbeat'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Home() {
    usePageMeta({
        title: null,
        description: 'Welcome to the official website of Rhythmia Heart Care, the ultimate formulation to support heart rhythm health and tackle arrhythmias naturally.',
        path: '/',
    })

    return (
        <>
            <a className="skip-link" href="#main">Skip to content</a>

            <Header />

            {/* Every page has a section here that leads to it: the product, the
                evidence, how it's made, who we are; then why rhythm matters and
                the contact form. */}
            <main id="main">
                <Reassurance />
                <Product />
                <EvidenceStrip />
                <MadeStrip />
                <WhoWeAre />
                <EveryHeartbeat />
                <ContactUs />
            </main>

            <Footer />
        </>
    )
}
