import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Earth } from "./Earth";

function Scene() {
    const { mouse } = useThree();
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.1, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.1, 0.05);
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
                <Earth />
            </Float>
            <ContactShadows opacity={0.25} scale={10} blur={2.5} far={10} color="#334155" />
        </group>
    );
}

export function CosmicBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-white">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 45 }}>
                <color attach="background" args={["#f8fafc"]} />
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} color="#fff" />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#e0f2fe" />

                <Scene />
            </Canvas>

            {/* Soft Ethereal Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-ethereal-blue/30 via-transparent to-white/50" />
        </div>
    );
}
