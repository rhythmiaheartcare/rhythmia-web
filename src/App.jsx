import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import ApproveReview from './pages/ApproveReview'
import './index.css'
import ScrollToTop from './components/ScrollToTop'
import SmoothScroll from './components/SmoothScroll'

export default function App() {
    return (
        <Router>
            <SmoothScroll>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<ProductPage />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Cancel />} />
                    <Route path="/approve-review" element={<ApproveReview />} />
                </Routes>
            </SmoothScroll>
        </Router>
    )
}
