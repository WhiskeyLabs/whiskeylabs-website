"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Trail, Line } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function HoneycombCore() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002; // Slower rotation
            meshRef.current.rotation.z += 0.001;
            const s = 1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.03; // Slower pulse
            meshRef.current.scale.set(s, s, s);
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1, 15]} />
                <meshStandardMaterial
                    color="#FF4500"
                    wireframe
                    transparent
                    opacity={0.3}
                    emissive="#FF4500"
                    emissiveIntensity={2}
                />
            </mesh>
            <Sphere args={[0.8, 32, 32]}>
                <MeshDistortMaterial
                    color="#FF4500"
                    speed={1.5} // Slower distortion
                    distort={0.3}
                    radius={1}
                    emissive="#FF4500"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.2}
                />
            </Sphere>
        </Float>
    );
}

function FiberStrand({ index, total }: { index: number, total: number }) {
    const lineRef = useRef<THREE.Group>(null);

    // Create a random path for each strand
    const curve = useMemo(() => {
        const points = [];
        const angle = (index / total) * Math.PI * 2;
        const radius = 1.2;

        for (let i = 0; i < 5; i++) {
            points.push(new THREE.Vector3(
                Math.cos(angle + i * 0.5) * (radius + i * 0.5),
                (i - 2) * 1.5,
                Math.sin(angle + i * 0.5) * (radius + i * 0.5)
            ));
        }
        return new THREE.CatmullRomCurve3(points);
    }, [index, total]);

    const points = useMemo(() => curve.getPoints(50), [curve]);

    useFrame((state) => {
        if (lineRef.current) {
            lineRef.current.rotation.y += 0.003; // Slower strand rotation
            const pulse = (Math.sin(state.clock.elapsedTime * 1 + index) + 1) / 2; // Slower pulse
            lineRef.current.scale.setScalar(0.9 + pulse * 0.2);
        }
    });

    return (
        <group ref={lineRef}>
            <Line
                points={points}
                color="#FF4500"
                lineWidth={1}
                transparent
                opacity={0.4}
            />
            {/* Pulsing light point (the "bee" / data packet) */}
            <MovingPulse curve={curve} delay={index * 0.2} />
        </group>
    );
}

function MovingPulse({ curve, delay }: { curve: THREE.CatmullRomCurve3, delay: number }) {
    const pulseRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (pulseRef.current) {
            const t = ((state.clock.elapsedTime + delay) % 8) / 8; // Slower loop (8s instead of 4s)
            const pos = curve.getPoint(t);
            pulseRef.current.position.copy(pos);

            // Slower brightness pulse
            const b = Math.sin(state.clock.elapsedTime * 4) * 0.5 + 1.5;
            (pulseRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = b;
        }
    });

    return (
        <mesh ref={pulseRef}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#FF4500" emissive="#FF4500" emissiveIntensity={2} />
            <pointLight distance={2} intensity={2} color="#FF4500" />
        </mesh>
    );
}

export default function PollinationPulse() {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#FF4500" />
                <HoneycombCore />

                {Array.from({ length: 8 }).map((_, i) => (
                    <FiberStrand key={i} index={i} total={8} />
                ))}

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
            </Canvas>
        </div>
    );
}
