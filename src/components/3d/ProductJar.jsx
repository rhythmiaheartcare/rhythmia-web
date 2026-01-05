import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber'
import { TextureLoader, Vector2, Raycaster, Vector2 as Vec2 } from 'three'
import { Float, ContactShadows, PresentationControls } from '@react-three/drei'

function JarModel({ autoRotate }) {
    const meshRef = useRef()
    const groupRef = useRef()
    // Load texture
    const texture = useLoader(TextureLoader, '/assets/jar_label.png')

    // Very slow auto-rotation animation
    useFrame((state, delta) => {
        if (autoRotate && groupRef.current) {
            groupRef.current.rotation.y += delta * 0.02
        }
    })

    const shoulderPoints = useMemo(() => {
        return [
            new Vector2(1, 0),
            new Vector2(1, 0.05),
            new Vector2(0.95, 0.15),
            new Vector2(0.85, 0.25),
            new Vector2(0.7, 0.35)
        ]
    }, [])

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2} floatingRange={[0, 0.2]}>
                {/* Unified Jar Glass Body */}
                <mesh ref={meshRef} position={[0, -0.4, 0]} rotation={[0, 5.3, 0]}>
                    <cylinderGeometry args={[1, 1, 2.2, 64]} />
                    <meshPhysicalMaterial
                        color="#7a3a10"
                        roughness={0}
                        metalness={0}
                        transmission={0.97}
                        thickness={1.2}
                        ior={1.5}
                        transparent
                    />
                </mesh>

                {/* Label Overlay - Positioned slightly outside the glass */}
                <mesh position={[0, -0.35, 0]} rotation={[0, 5.3, 0]}>
                    <cylinderGeometry args={[1.005, 1.005, 1.9, 64, 1, true]} />
                    <meshStandardMaterial
                        map={texture}
                        roughness={0.2}
                        metalness={0.1}
                        color="#ffffff"
                        transparent
                        side={2}
                    />
                </mesh>

                {/* Jar Shoulder - Smooth Curve */}
                <mesh position={[0, 0.7, 0]} rotation={[0, 0, 0]}>
                    <latheGeometry args={[shoulderPoints, 64]} />
                    <meshPhysicalMaterial
                        color="#7a3a10"
                        roughness={0}
                        metalness={0}
                        transmission={0.97}
                        thickness={1.2}
                        ior={1.5}
                        transparent
                    />
                </mesh>

                {/* Jar Neck */}
                <mesh position={[0, 1.125, 0]} rotation={[0, 0, 0]}>
                    <cylinderGeometry args={[0.7, 0.7, 0.15, 64]} />
                    <meshPhysicalMaterial
                        color="#7a3a10"
                        roughness={0}
                        metalness={0}
                        transmission={0.97}
                        thickness={1.2}
                        ior={1.5}
                        transparent
                    />
                </mesh>

                {/* Jar Lid */}
                <mesh position={[0, 1.3, 0]}>
                    <cylinderGeometry args={[0.75, 0.75, 0.3, 64]} />
                    <meshStandardMaterial color="#494949" roughness={0.2} metalness={0.3} />
                </mesh>
            </Float>
            <ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" />
        </group>
    )
}

// Component to handle touch detection via raycasting
function TouchHandler({ onJarTouch }) {
    const { camera, gl, scene } = useThree()
    const raycaster = useMemo(() => new Raycaster(), [])
    const touchingJarRef = useRef(false)

    useEffect(() => {
        const canvas = gl.domElement

        const handleTouchStart = (event) => {
            if (event.touches.length === 0) return

            const touch = event.touches[0]
            const rect = canvas.getBoundingClientRect()
            const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1
            const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1

            raycaster.setFromCamera(new Vec2(x, y), camera)

            // Check if we hit any mesh in the scene
            const intersects = raycaster.intersectObjects(scene.children, true)
            const hitJar = intersects.some(hit => hit.object.type === 'Mesh')

            touchingJarRef.current = hitJar

            if (hitJar) {
                onJarTouch()
            }
        }

        const handleTouchMove = (event) => {
            // Only prevent scrolling if we're touching the jar
            if (touchingJarRef.current) {
                event.preventDefault()
            }
        }

        const handleTouchEnd = () => {
            touchingJarRef.current = false
        }

        // Must use passive: false to be able to call preventDefault
        canvas.addEventListener('touchstart', handleTouchStart, { passive: true })
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
        canvas.addEventListener('touchend', handleTouchEnd, { passive: true })

        return () => {
            canvas.removeEventListener('touchstart', handleTouchStart)
            canvas.removeEventListener('touchmove', handleTouchMove)
            canvas.removeEventListener('touchend', handleTouchEnd)
        }
    }, [camera, gl, scene, raycaster, onJarTouch])

    return null
}

export default function ProductJar() {
    const [showHint, setShowHint] = useState(false)
    const [autoRotate, setAutoRotate] = useState(true)
    const containerRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowHint(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.3 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!showHint) return

        // Hide hint after 4 seconds
        const timer = setTimeout(() => {
            setShowHint(false)
        }, 4000)

        return () => clearTimeout(timer)
    }, [showHint])

    const handleInteraction = () => {
        setShowHint(false)
        setAutoRotate(false)
    }

    const handleJarTouch = useCallback(() => {
        setShowHint(false)
        setAutoRotate(false)
    }, [])

    return (
        <div
            ref={containerRef}
            className="jar-canvas-container jar-container-mobile"
            style={{
                height: '100%',
                width: '100%',
                touchAction: 'pan-y',
                position: 'relative'
            }}
            onPointerDown={handleInteraction}
        >
            {/* Rotation Hint Overlay */}
            {showHint && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fadeOut 4s forwards'
                }}>
                    {/* Left Arrow */}
                    <div style={{
                        position: 'absolute',
                        left: '10%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '2rem',
                        opacity: 0.6,
                        animation: 'slideLeft 2s infinite ease-in-out',
                        color: '#D50F0F'
                    }}>
                        ◀
                    </div>

                    {/* Right Arrow */}
                    <div style={{
                        position: 'absolute',
                        right: '10%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '2rem',
                        opacity: 0.6,
                        animation: 'slideRight 2s infinite ease-in-out',
                        color: '#D50F0F'
                    }}>
                        ▶
                    </div>

                    {/* Center hint text */}
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        animation: 'pulse 2s infinite'
                    }}>
                        Drag to Rotate
                    </div>
                </div>
            )}

            <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 2]}>
                <ambientLight intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={50} castShadow />
                <pointLight position={[-10, 5, -10]} intensity={20} color="#D50F0F" />

                <PresentationControls
                    global={false}
                    cursor={true}
                    snap={false}
                    speed={1.5}
                    zoom={0.8}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 6, Math.PI / 6]}
                    azimuth={[-Infinity, Infinity]}
                    config={{ mass: 1, tension: 170, friction: 26 }}
                >
                    <JarModel autoRotate={autoRotate} />
                </PresentationControls>
                <TouchHandler onJarTouch={handleJarTouch} />
            </Canvas>

            {/* Inline styles for animations */}
            <style>{`
                @keyframes fadeOut {
                    0%, 80% { opacity: 1; }
                    100% { opacity: 0; }
                }

                @keyframes slideLeft {
                    0%, 100% { transform: translateY(-50%) translateX(0); }
                    50% { transform: translateY(-50%) translateX(-10px); }
                }

                @keyframes slideRight {
                    0%, 100% { transform: translateY(-50%) translateX(0); }
                    50% { transform: translateY(-50%) translateX(10px); }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 1; }
                }

                @media (max-width: 768px) {
                    /* Adjust arrow size and positioning for mobile */
                    @keyframes slideLeft {
                        0%, 100% { transform: translateY(-50%) translateX(0); }
                        50% { transform: translateY(-50%) translateX(-5px); }
                    }
                    
                    @keyframes slideRight {
                        0%, 100% { transform: translateY(-50%) translateX(0); }
                        50% { transform: translateY(-50%) translateX(5px); }
                    }
                }
            `}</style>
        </div>
    )
}

// Preload texture to avoid lag on mount
useLoader.preload(TextureLoader, '/assets/jar_label.png')
