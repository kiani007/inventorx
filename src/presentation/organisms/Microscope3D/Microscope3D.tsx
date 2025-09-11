'use client';

import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Center, Html } from '@react-three/drei';
// @ts-expect-error Three.js types
import * as THREE from 'three';
import { FBXLoader } from 'three-stdlib';

// Microscope 3D Model Component
function MicroscopeModel() {
  const groupRef = useRef<THREE.Group>(null);
  // Load FBX from public folder
  const fbx = useLoader(FBXLoader, '/models/microscope/model.fbx');

  // Traverse and normalize meshes to reduce GPU cost and avoid shadows issues
  useEffect(() => {
    if (!fbx) return;
    fbx.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        // ensure material is a basic compatible side
        if (mesh.material) {
          try {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m: THREE.Material) => { 
                (m as THREE.MeshStandardMaterial).side = THREE.FrontSide; 
              });
            } else {
              (mesh.material as THREE.MeshStandardMaterial).side = THREE.FrontSide;
            }
          } catch {
            // ignore material normalization errors
          }
        }
      }
    });
  }, [fbx]);

  // Auto-rotate the microscope (no floating for stability)
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Center>
      <group ref={groupRef} scale={0.05}>
        <primitive object={fbx} />
      </group>
    </Center>
  );
}


// Main Component
export const Microscope3D: React.FC<{ className?: string }> = ({ className }) => {
  const [contextLost, setContextLost] = React.useState(false);
  return (
    <div className={`w-full h-[400px] ${className || ''}`}>
      {contextLost ? (
        <div className="w-full h-full flex items-center justify-center bg-[#000000] text-white">WebGL context lost — reload the page or close other GPU-heavy tabs.</div>
      ) : (
        <Canvas shadows={false} dpr={1} gl={{ antialias: true, alpha: true }} onCreated={({ gl }) => {
          const canvas = gl.domElement;
          const onLost = (e: Event) => {
            e.preventDefault();
            console.error('WebGL context lost');
            setContextLost(true);
          };
          const onRestore = () => {
            console.log('WebGL context restored');
            setContextLost(false);
            // Force a reload to reinitialize heavy assets
            // location.reload(); // optional
          };
          canvas.addEventListener('webglcontextlost', onLost, false);
          canvas.addEventListener('webglcontextrestored', onRestore, false);
        }}>
          <PerspectiveCamera makeDefault position={[3, 2, 3]} fov={50} />
          {/* Lighting Setup (shadows disabled) */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#ffffff" />
          <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={0.6} color="#D4AF37" />
          <pointLight position={[0, -5, 0]} intensity={0.3} color="#D4AF37" />
          {/* 3D Model (FBX) */}
          <Suspense fallback={<Html center><div className="text-[#D4AF37]">Loading model...</div></Html>}>
            <MicroscopeModel />
          </Suspense>
          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={5}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      )}
    </div>
  );
};