import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import ScrollManager from './components/ScrollManager'
import './index.css'

/* Home loads eagerly — it is the landing page. Everything else is split out, so
   a first visit no longer pays for Firebase (only the product and review-approval
   pages touch it) or for the internal print-collateral editors. */
const ProductPage = lazy(() => import('./pages/ProductPage'))
const ManufacturingPage = lazy(() => import('./pages/ManufacturingPage'))
const EvidencePage = lazy(() => import('./pages/EvidencePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const Success = lazy(() => import('./pages/Success'))
const Cancel = lazy(() => import('./pages/Cancel'))
const ApproveReview = lazy(() => import('./pages/ApproveReview'))
const BookletEditor = lazy(() => import('./pages/BookletEditor'))
const BusinessCardEditor = lazy(() => import('./pages/BusinessCardEditor'))
const LeafletEditor = lazy(() => import('./pages/LeafletEditor'))
const CduEditor = lazy(() => import('./pages/CduEditor'))

/** Holds the page ground while a route chunk loads, so there is no white flash. */
function RouteFallback() {
    return <div className="route-fallback" aria-busy="true" aria-label="Loading" />
}

export default function App() {
    return (
        <Router>
            <ScrollManager />
            <Suspense fallback={<RouteFallback />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<ProductPage />} />
                    <Route path="/how-its-made" element={<ManufacturingPage />} />
                    <Route path="/evidence" element={<EvidencePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    {/* The Team page became About. Printed leaflets, business cards and
                        the CDU stand carry QR codes pointing at the old path, so it has
                        to keep resolving. */}
                    <Route path="/team" element={<Navigate to="/about" replace />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Cancel />} />
                    <Route path="/approve-review" element={<ApproveReview />} />
                    <Route path="/booklet-editor" element={<BookletEditor />} />
                    <Route path="/business-card-editor" element={<BusinessCardEditor />} />
                    <Route path="/leaflet-editor" element={<LeafletEditor />} />
                    <Route path="/stand-editor" element={<CduEditor />} />
                </Routes>
            </Suspense>
        </Router>
    )
}
