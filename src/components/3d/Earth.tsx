import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Earth() {
    const earthRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (earthRef.current) earthRef.current.rotation.y = t * 0.03;
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = t * 0.04;
        }
    });

    return (
        <group>
            {/* Ethereal Glow */}
            <mesh ref={atmosphereRef}>
                <sphereGeometry args={[1.65, 64, 64]} />
                <meshBasicMaterial
                    color="#e0f2fe"
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Luminous Earth Body */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[1.5, 64, 64]} />
                <meshStandardMaterial
                    color="#f1f5f9"
                    roughness={0.9}
                    metalness={0.1}
                    emissive="#e0f2fe"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Soft Clouds */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[1.54, 64, 64]} />
                <meshStandardMaterial
                    color="#ffffff"
                    opacity={0.2}
                    transparent
                    roughness={1}
                />
            </mesh>

            {/* Luminous Particles */}
            {[...Array(30)].map((_, i) => (
                <group key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                    <mesh position={[1.7 + Math.random() * 0.3, 0, 0]}>
                        <sphereGeometry args={[0.008, 8, 8]} />
                        <meshBasicMaterial color="#334155" transparent opacity={0.1} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}
