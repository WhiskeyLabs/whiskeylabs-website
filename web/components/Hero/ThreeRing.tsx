"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Float } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Context to pass theme to Three.js components
const ThemeContext = React.createContext<"light" | "dark">("dark");

// Large translucent orbital disc/ellipse
function OrbitalDisc({
    radius,
    rotation,
    color = "#FF4500",
    opacity = 0.08
}: {
    radius: number;
    rotation: [number, number, number];
    color?: string;
    opacity?: number;
}) {
    const currentTheme = React.useContext(ThemeContext);
    const lineColor = currentTheme === "light" ? "#1a0a0a" : "#FFFFFF";

    return (
        <group rotation={rotation}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius * 0.6, radius, 64]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={currentTheme === "light" ? opacity * 1.5 : opacity}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Thin line at edge */}
            <Line
                points={Array.from({ length: 65 }, (_, i) => {
                    const angle = (i / 64) * Math.PI * 2;
                    return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number];
                })}
                color={lineColor}
                opacity={0.1}
                transparent
                lineWidth={0.5}
            />
        </group>
    );
}

// Orbiting sphere with glow
function OrbitingSphere({
    radius,
    speed,
    size,
    color,
    initialAngle,
    orbitRotation,
    glowIntensity = 0.5
}: {
    radius: number;
    speed: number;
    size: number;
    color: string;
    initialAngle: number;
    orbitRotation: [number, number, number];
    glowIntensity?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        const angle = initialAngle + time * speed;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const rotationMatrix = new THREE.Matrix4().makeRotationFromEuler(
            new THREE.Euler(...orbitRotation)
        );
        const pos = new THREE.Vector3(x, 0, z).applyMatrix4(rotationMatrix);

        meshRef.current.position.copy(pos);
        if (glowRef.current) {
            glowRef.current.position.copy(pos);
        }
    });

    return (
        <>
            {/* Glow sphere */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[size * 3, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.15 * glowIntensity}
                />
            </mesh>
            {/* Core sphere */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[size, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={glowIntensity}
                />
            </mesh>
        </>
    );
}

// Central planet with highlight - THEME AWARE
function CentralPlanet() {
    const meshRef = useRef<THREE.Mesh>(null);
    const currentTheme = React.useContext(ThemeContext);

    // Colors based on theme
    const planetColor = currentTheme === "light" ? "#FF4500" : "#1a0808";
    const glowColor = "#FF4500";
    const highlightColor = currentTheme === "light" ? "#FFFFFF" : "#FFFFFF";

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.y = time * 0.05;
    });

    return (
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
            <group>
                {/* Core sphere - orange in light mode, dark in dark mode */}
                <mesh ref={meshRef}>
                    <sphereGeometry args={[1.2, 64, 64]} />
                    <meshStandardMaterial
                        color={planetColor}
                        roughness={currentTheme === "light" ? 0.4 : 0.8}
                        metalness={currentTheme === "light" ? 0.6 : 0.2}
                        emissive={currentTheme === "light" ? "#FF4500" : "#000000"}
                        emissiveIntensity={currentTheme === "light" ? 0.3 : 0}
                    />
                </mesh>
                {/* Highlight spot */}
                <mesh position={[-0.3, 0.4, 0.9]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshBasicMaterial color={highlightColor} />
                </mesh>
                {/* Ambient glow around planet */}
                <mesh>
                    <sphereGeometry args={[1.8, 32, 32]} />
                    <meshBasicMaterial
                        color={glowColor}
                        transparent
                        opacity={currentTheme === "light" ? 0.12 : 0.05}
                    />
                </mesh>
            </group>
        </Float>
    );
}

// Background particles/stars
function BackgroundParticles() {
    const currentTheme = React.useContext(ThemeContext);
    const pointsRef = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(100 * 3);
        for (let i = 0; i < 100; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geometry;
    }, []);

    return (
        <points geometry={pointsRef}>
            <pointsMaterial
                color={currentTheme === "light" ? "#1a0a0a" : "#FFFFFF"}
                size={0.03}
                transparent
                opacity={currentTheme === "light" ? 0.2 : 0.4}
                sizeAttenuation
            />
        </points>
    );
}

// Main orbital system
function OrbitalSystem() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();
        groupRef.current.rotation.y = time * 0.05;
    });

    // Large orbital ellipse configurations
    const discs = [
        { radius: 3.5, rotation: [0.3, 0, 0.1] as [number, number, number], opacity: 0.12 },
        { radius: 4.0, rotation: [0.7, 0.2, -0.3] as [number, number, number], opacity: 0.08 },
        { radius: 4.5, rotation: [-0.4, 0.5, 0.2] as [number, number, number], opacity: 0.06 },
    ];

    // Orbiting spheres
    const spheres = [
        { radius: 3.5, speed: 0.3, size: 0.08, color: "#FF4500", initialAngle: 0.5, orbitRotation: discs[0].rotation, glowIntensity: 0.8 },
        { radius: 4.0, speed: 0.2, size: 0.05, color: "#FFFFFF", initialAngle: Math.PI, orbitRotation: discs[1].rotation, glowIntensity: 0.6 },
        { radius: 4.5, speed: 0.15, size: 0.06, color: "#FF4500", initialAngle: Math.PI / 3, orbitRotation: discs[2].rotation, glowIntensity: 0.7 },
    ];

    return (
        <group ref={groupRef}>
            {/* Central Planet */}
            <CentralPlanet />

            {/* Large Orbital Discs */}
            {discs.map((disc, i) => (
                <OrbitalDisc key={i} radius={disc.radius} rotation={disc.rotation} opacity={disc.opacity} />
            ))}

            {/* Orbiting Spheres */}
            {spheres.map((sphere, i) => (
                <OrbitingSphere key={i} {...sphere} />
            ))}
        </group>
    );
}

// Scene wrapper that provides theme context
function Scene({ theme }: { theme: "light" | "dark" }) {
    const fogColor = theme === "light" ? "#faf8f5" : "#1a0a0a";

    return (
        <ThemeContext.Provider value={theme}>
            {/* Lighting */}
            <ambientLight intensity={theme === "light" ? 0.5 : 0.2} />
            <pointLight position={[0, 0, 0]} color="#FF4500" intensity={theme === "light" ? 2 : 1} distance={15} />
            <pointLight position={[10, 10, 10]} intensity={theme === "light" ? 0.5 : 0.3} />
            <pointLight position={[-5, -5, 5]} color="#FF4500" intensity={theme === "light" ? 0.8 : 0.5} />

            {/* Background particles */}
            <BackgroundParticles />

            {/* Orbital System */}
            <OrbitalSystem />

            {/* Fog for depth */}
            <fog attach="fog" args={[fogColor, 8, 25]} />
        </ThemeContext.Provider>
    );
}

export default function ThreeRing() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = mounted ? (resolvedTheme as "light" | "dark") || "dark" : "dark";
    const glowBg = currentTheme === "light"
        ? 'radial-gradient(ellipse at center, rgba(255,69,0,0.15) 0%, transparent 70%)'
        : 'radial-gradient(ellipse at center, rgba(255,69,0,0.08) 0%, transparent 70%)';

    return (
        <div className="w-full h-full min-h-[400px] md:min-h-[500px] relative">
            {/* CSS blur overlay for fuzzy effect */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: glowBg,
                filter: 'blur(40px)',
            }} />

            <Canvas camera={{ position: [0, 3, 10], fov: 40 }} dpr={[1, 2]}>
                <Scene theme={currentTheme} />
            </Canvas>
        </div>
    );
}
