import { useMemo, useRef, useLayoutEffect, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, PresentationControls } from '@react-three/drei'
import * as THREE from 'three'

/* =============================================================================
   The jar, modelled in code
   -----------------------------------------------------------------------------
   No model file: the glass is a lathe of the jar's profile, the label is the
   print artwork wrapped round it, the capsules are instanced. Everything that
   makes it read as a real object rather than a demo is in the lighting and
   the glass: a studio rig of soft panels for the highlights, and transmission
   with an amber attenuation colour so the glass darkens with depth the way
   real amber glass does.

   Units: the body is radius 1; the label artwork (3193 × 1096) wraps a
   radius-1 cylinder at 2.16 tall, so the body is a touch taller than that.
   ========================================================================== */

const AMBER = '#b04a12'
const AMBER_DEEP = '#682108'
const CAPSULE = '#d9b47e'
const CAP = '#161616'

/* The jar's outline as (radius, height) pairs: up the outside from the
   centre of the base to the neck, then back down the inside. The glass is a
   real solid — thin walls, a thick base — so the floor and whatever is under
   the jar are absorbed by the amber rather than showing through a single
   surface as ghost ellipses. */
const PROFILE = [
    [0, -1.3],
    [0.84, -1.3],
    [0.94, -1.27],
    [0.99, -1.2],
    [1, -1.12],
    [1, 1.1],
    [0.985, 1.18],
    [0.94, 1.26],
    [0.86, 1.32],
    [0.76, 1.36],
    [0.72, 1.42],
    [0.72, 1.56],
    // inside
    [0.64, 1.56],
    [0.64, 1.4],
    [0.72, 1.3],
    [0.86, 1.2],
    [0.92, 1.1],
    [0.92, -0.95],
    [0.86, -1.02],
    [0.6, -1.05],
    [0, -1.06],
]

function Glass() {
    const geometry = useMemo(() => {
        const pts = PROFILE.map(([x, y]) => new THREE.Vector2(x, y))
        return new THREE.LatheGeometry(pts, 96)
    }, [])

    return (
        <mesh geometry={geometry} castShadow>
            <meshPhysicalMaterial
                color={AMBER}
                transmission={1}
                thickness={0.45}
                attenuationColor={AMBER_DEEP}
                attenuationDistance={0.95}
                side={THREE.DoubleSide}
                roughness={0.05}
                ior={1.5}
                clearcoat={0.35}
                clearcoatRoughness={0.1}
                envMapIntensity={0.55}
            />
        </mesh>
    )
}

/* The print, wrapped round the body a hair outside the glass. */
function Label() {
    const texture = useLoader(THREE.TextureLoader, '/assets/jar_label.png')
    useLayoutEffect(() => {
        texture.colorSpace = THREE.SRGBColorSpace
        texture.anisotropy = 8
        texture.wrapS = THREE.RepeatWrapping
        // Start with the logo panel facing the camera, as the original did.
        texture.offset.x = 0.17
    }, [texture])

    return (
        <mesh position={[0, -0.01, 0]}>
            <cylinderGeometry args={[1.006, 1.006, 2.16, 96, 1, true]} />
            <meshStandardMaterial map={texture} roughness={0.62} metalness={0} envMapIntensity={0.35} />
        </mesh>
    )
}

/* A few hundred capsules, packed loosely inside the body. */
function Capsules({ count = 260 }) {
    const ref = useRef()
    const transforms = useMemo(() => {
        const dummy = new THREE.Object3D()
        const out = []
        let seed = 7
        const rand = () => {
            // Deterministic so the jar looks the same on every visit.
            seed = (seed * 16807) % 2147483647
            return seed / 2147483647
        }
        // A capsule reaches ~0.19 from its centre, so centres stay that far
        // inside the cavity (inner wall 0.92, inner floor -1.06): nothing
        // ever crosses into the glass and shows through it.
        for (let i = 0; i < count; i++) {
            const r = 0.7 * Math.sqrt(rand())
            const a = rand() * Math.PI * 2
            dummy.position.set(Math.cos(a) * r, -0.84 + rand() * 1.85, Math.sin(a) * r)
            dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI)
            dummy.updateMatrix()
            out.push(dummy.matrix.clone())
        }
        return out
    }, [count])

    useLayoutEffect(() => {
        transforms.forEach((m, i) => ref.current.setMatrixAt(i, m))
        ref.current.instanceMatrix.needsUpdate = true
    }, [transforms])

    return (
        <instancedMesh ref={ref} args={[null, null, count]}>
            <capsuleGeometry args={[0.085, 0.2, 3, 10]} />
            <meshStandardMaterial color={CAPSULE} roughness={0.55} metalness={0} />
        </instancedMesh>
    )
}

/* Matte black cap: a faceted band for the grip ridges, a smooth top. */
function Cap() {
    return (
        <group position={[0, 1.72, 0]}>
            <mesh>
                <cylinderGeometry args={[0.78, 0.78, 0.3, 72]} />
                <meshStandardMaterial color={CAP} roughness={0.55} metalness={0.05} flatShading />
            </mesh>
            <mesh position={[0, 0.16, 0]}>
                <cylinderGeometry args={[0.74, 0.78, 0.04, 72]} />
                <meshStandardMaterial color={CAP} roughness={0.35} metalness={0.05} />
            </mesh>
            <mesh position={[0, -0.16, 0]}>
                <cylinderGeometry args={[0.76, 0.76, 0.03, 72]} />
                <meshStandardMaterial color={CAP} roughness={0.35} metalness={0.05} />
            </mesh>
        </group>
    )
}

/* Barely-there idle turn, the speed of the original; pauses while dragging. */
function Turntable({ children, active }) {
    const ref = useRef()
    useFrame((_, delta) => {
        if (active && ref.current) ref.current.rotation.y += delta * 0.02
    })
    return <group ref={ref}>{children}</group>
}

/* A studio: one large soft panel above, a key from the left, a cool rim on
   the right, a warm bounce from below. Static, rendered once. */
function Studio() {
    return (
        <Environment resolution={256} frames={1}>
            <color attach="background" args={['#f4efe9']} />
            <Lightformer form="rect" intensity={2.2} position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 8, 1]} color="#fff3e6" />
            <Lightformer form="rect" intensity={4} position={[-5, 2, 3]} rotation={[0, Math.PI / 3, 0]} scale={[4, 6, 1]} color="#ffe9d2" />
            <Lightformer form="rect" intensity={1.4} position={[5, 1, -2]} rotation={[0, -Math.PI / 2.4, 0]} scale={[2, 6, 1]} color="#e9eef7" />
            <Lightformer form="rect" intensity={0.6} position={[0, -3, 3]} rotation={[-Math.PI / 2.5, 0, 0]} scale={[6, 4, 1]} color="#f2dcc8" />
        </Environment>
    )
}

/**
 * Touch: the approach the original jar used. When a touch begins on the jar
 * itself, the touch moves are cancelled so the browser never reclassifies
 * the gesture as a page scroll — which would fire pointercancel and end the
 * drag, leaving the jar dead to the finger. A touch that begins on empty
 * canvas is left alone and scrolls the page as normal.
 */
function TouchGuard({ target }) {
    const { gl, camera, raycaster } = useThree()
    useEffect(() => {
        const el = gl.domElement
        const pointer = new THREE.Vector2()
        let onJar = false

        const onTouchStart = (e) => {
            if (e.touches.length !== 1 || !target.current) { onJar = false; return }
            const rect = el.getBoundingClientRect()
            const t = e.touches[0]
            pointer.set(((t.clientX - rect.left) / rect.width) * 2 - 1, -((t.clientY - rect.top) / rect.height) * 2 + 1)
            raycaster.setFromCamera(pointer, camera)
            onJar = raycaster.intersectObject(target.current, true).length > 0
        }
        const onTouchMove = (e) => { if (onJar) e.preventDefault() }
        const onTouchEnd = () => { onJar = false }

        el.addEventListener('touchstart', onTouchStart, { passive: true })
        el.addEventListener('touchmove', onTouchMove, { passive: false })
        el.addEventListener('touchend', onTouchEnd, { passive: true })
        el.addEventListener('touchcancel', onTouchEnd, { passive: true })
        return () => {
            el.removeEventListener('touchstart', onTouchStart)
            el.removeEventListener('touchmove', onTouchMove)
            el.removeEventListener('touchend', onTouchEnd)
            el.removeEventListener('touchcancel', onTouchEnd)
        }
    }, [gl, camera, raycaster, target])
    return null
}

function Jar({ active }) {
    const [dragging, setDragging] = useState(false)
    const jarRef = useRef()
    // Release on the window: the pointer often comes up outside the jar.
    useEffect(() => {
        if (!dragging) return
        const up = () => setDragging(false)
        window.addEventListener('pointerup', up)
        window.addEventListener('pointercancel', up)
        return () => {
            window.removeEventListener('pointerup', up)
            window.removeEventListener('pointercancel', up)
        }
    }, [dragging])

    return (
        <>
        <TouchGuard target={jarRef} />
        <PresentationControls
            global={false}
            cursor
            snap={false}
            speed={1.5}
            polar={[-Infinity, Infinity]}
            azimuth={[-Infinity, Infinity]}
            config={{ mass: 1, tension: 170, friction: 26 }}
        >
            <Turntable active={active && !dragging}>
                <group ref={jarRef} position={[0, -0.15, 0]} onPointerDown={() => setDragging(true)}>
                    <Capsules />
                    <Glass />
                    <Label />
                    <Cap />
                </group>
            </Turntable>
        </PresentationControls>
        </>
    )
}

/**
 * The canvas. `active` drives the render loop so an off-screen jar costs
 * nothing; `onReady` fires after the first frame so the poster can fade.
 */
export default function JarScene({ active = true, onReady }) {
    return (
        <Canvas
            frameloop={active ? 'always' : 'never'}
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.9, 9.2], fov: 24 }}
            gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
            onCreated={({ gl, camera }) => {
                gl.setClearColor(0x000000, 0)
                gl.toneMappingExposure = 1.15
                camera.lookAt(0, 0.05, 0)
                if (onReady) requestAnimationFrame(() => requestAnimationFrame(onReady))
            }}
        >
            <Studio />
            <Jar active={active} />
            <ContactShadows position={[0, -1.46, 0]} opacity={0.42} scale={7} blur={2.2} far={2.5} resolution={512} color="#2a1208" />
        </Canvas>
    )
}
