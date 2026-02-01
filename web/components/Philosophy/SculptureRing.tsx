"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Ring() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.1;
        meshRef.current.rotation.y = time * 0.15;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <torusGeometry args={[3, 0.4, 32, 100]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#FF4500"
                    emissiveIntensity={2}
                    roughness={0}
                    metalness={1}
                />
                {/* Inner glow or secondary smaller ring */}
                <mesh scale={[0.95, 0.95, 0.95]}>
                    <torusGeometry args={[3, 0.1, 32, 100]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
                </mesh>
            </mesh>

            {/* Decorative architectural segments */}
            {Array.from({ length: 12 }).map((_, i) => (
                <group key={i} rotation={[0, 0, (i / 12) * Math.PI * 2]}>
                    <mesh position={[3, 0, 0]}>
                        <boxGeometry args={[0.1, 0.8, 0.5]} />
                        <meshStandardMaterial color="#666" roughness={0.2} metalness={0.8} />
                    </mesh>
                </group>
            ))}
        </Float>
    );
}

function Connections() {
    const lineRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!lineRef.current) return;
        const time = state.clock.getElapsedTime();
        lineRef.current.rotation.z = time * 0.05;
    });

    return (
        <group ref={lineRef}>
            {Array.from({ length: 12 }).map((_, i) => (
                <mesh key={i} rotation={[0, 0, (i / 12) * Math.PI * 2]} position={[4, 0, 0]}>
                    <boxGeometry args={[0.01, 0.01, 15]} />
                    <meshBasicMaterial color="#FF4500" transparent opacity={0.1} />
                </mesh>
            ))}
        </group>
    );
}

export function SculptureRing() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF4500" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
                <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={2} castShadow />

                <Ring />
                <Connections />

                {/* Environment particles */}
                <points>
                    <BufferGeometry />
                    <pointsMaterial size={0.02} color="#FF4500" transparent opacity={0.3} />
                </points>

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}

// Helper to provide particles
function BufferGeometry() {
    const points = useMemo(() => {
        const p = new Float32Array(500 * 3);
        for (let i = 0; i < 500; i++) {
            p[i * 3] = (Math.random() - 0.5) * 20;
            p[i * 3 + 1] = (Math.random() - 0.5) * 20;
            p[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return p;
    }, []);

    return (
        <bufferGeometry>
            <bufferAttribute
                attach="attributes-position"
                count={points.length / 3}
                array={points}
                itemSize={3}
                args={[points, 3]}
            />
        </bufferGeometry>
    );
}
