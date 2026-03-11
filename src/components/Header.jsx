
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
                    <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>
                        Rhythmia Heart Care
                    </h1>
                    <img
                        src="/assets/logo/Rhythmia_Care_Logo_Workmark_Red_Heart_White_Copy_RGB.svg"
                        alt="Rhythmia Heart Care Logo"
                        className="header-logo"
                    />
                </motion.div>
            </div>
        </header>
    )
}
