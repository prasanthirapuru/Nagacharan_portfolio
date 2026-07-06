"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function MinimalAbstractMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    // Ultra slow, calm rotation
    meshRef.current.rotation.y = time * 0.05;
    meshRef.current.rotation.x = time * 0.03;

    // Very subtle mouse parallax
    const targetX = (state.pointer.x * Math.PI) / 12;
    const targetY = -(state.pointer.y * Math.PI) / 16;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX * 1.5, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY * 1.5, 0.05);
  });

  return (
    <mesh ref={meshRef} scale={[1.8, 1.8, 1.8]}>
      {/* Abstract ring torus */}
      <torusGeometry args={[1, 0.25, 32, 100]} />
      {/* Luxury frosted glass material */}
      <meshPhysicalMaterial
        color="#111111"
        roughness={0.15}
        metalness={0.1}
        transmission={0.8} // realistic glass transmission
        thickness={1.2} // glass thickness refraction
        ior={1.45} // index of refraction
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        flatShading={false}
      />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-40">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        {/* Soft, low-intensity spot and directional lighting to avoid high contrast glares */}
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#475569" />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#0e7490" />
        <directionalLight position={[0, 4, 3]} intensity={0.6} color="#ffffff" />
        
        <MinimalAbstractMesh />
      </Canvas>
    </div>
  );
}
