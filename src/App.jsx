
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import ManufacturingPage from './pages/ManufacturingPage'
import EvidencePage from './pages/EvidencePage'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import ApproveReview from './pages/ApproveReview'
import BookletEditor from './pages/BookletEditor'
import BusinessCardEditor from './pages/BusinessCardEditor'
import LeafletEditor from './pages/LeafletEditor'
import './index.css'
import ScrollToTop from './components/ScrollToTop'
import SmoothScroll from './components/SmoothScroll'

import CduEditor from './pages/CduEditor'

export default function App() {
    return (
        <Router>
            <SmoothScroll>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<ProductPage />} />
                    <Route path="/how-its-made" element={<ManufacturingPage />} />
                    <Route path="/evidence" element={<EvidencePage />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Cancel />} />
                    <Route path="/approve-review" element={<ApproveReview />} />
                    <Route path="/booklet-editor" element={<BookletEditor />} />
                    <Route path="/business-card-editor" element={<BusinessCardEditor />} />
                    <Route path="/leaflet-editor" element={<LeafletEditor />} />
                    <Route path="/stand-editor" element={<CduEditor />} />
                </Routes>
            </SmoothScroll>
        </Router>
    )
}
