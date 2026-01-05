import React, { useEffect } from 'react'

import Header from '../components/Header'
import WhoWeAre from '../components/WhoWeAre'
import OurStory from '../components/OurStory'
import EveryHeartbeat from '../components/EveryHeartbeat'
import Product from '../components/Product'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'

export default function Home() {
    // Scroll to top or specific section if navigated back
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    return (
        <main>
            <Header />
            <Product />
            <WhoWeAre />
            <EveryHeartbeat />
            <OurStory />

            <Footer />
        </main>
    )
}
