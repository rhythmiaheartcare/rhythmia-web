import React from 'react'
import Navbar from './Navbar'
import { motion } from 'framer-motion'

import FlowingMesh from './3d/FlowingMesh'

export default function Header() {
    return (
        <header className="header-static-root">
            <Navbar />

            {/* Dynamic Mesh Background */}
            <div className="header-layer-bg">
                <FlowingMesh />
            </div>

            <div className="header-fade-bottom"></div>

            {/* Content Layer */}
            <div className="header-static-content container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                    className="logo-wrapper-static"
                >
                    <img
                        src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_White_Copy_RGB.svg"
                        alt="Rhythmia Heart Care"
                        className="header-logo"
                    />
                </motion.div>
            </div>
        </header>
    )
}
