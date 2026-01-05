import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WaveMesh() {
    const mesh = useRef()

    // Create a larger plane with enough segments for smooth waves
    const geometry = useMemo(() => new THREE.PlaneGeometry(50, 20, 200, 100), [])

    // Store original positions to avoid drifting
    const originalPositions = useMemo(() => {
        return geometry.attributes.position.array.slice()
    }, [geometry])

    useFrame((state) => {
        const time = state.clock.getElapsedTime() * 0.4
        const position = mesh.current.geometry.attributes.position

        // Manually update vertices for a flowing effect
        for (let i = 0; i < position.count; i++) {
            const x = originalPositions[i * 3]
            const y = originalPositions[i * 3 + 1]

            // Multiple sine waves for complexity
            // Large slow waves + smaller faster ripples
            const z =
                Math.sin(x * 0.3 + time) * 1.5 +
                Math.sin(y * 0.2 + time * 1.2) * 1.0 +
                Math.sin((x + y) * 0.5 + time * 0.5) * 0.5

            position.setZ(i, z)
        }

        position.needsUpdate = true
        mesh.current.geometry.computeVertexNormals()
    })

    return (
        <mesh
            ref={mesh}
            position={[0, 0, -5]}
            rotation={[-Math.PI / 3, 0, 0]}
            geometry={geometry}
        >
            {/* Wireframe aesthetic for a modern "tech/bio" feel */}
            <meshStandardMaterial
                color="#860000"
                emissive="#D50F0F"
                emissiveIntensity={0.2}
                wireframe={true}
                transparent={true}
                opacity={0.3}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

export default function FlowingMesh() {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]} // Handle high DPI screens
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} intensity={1} color="#ff5555" />
                <WaveMesh />
            </Canvas>
        </div>
    )
}
