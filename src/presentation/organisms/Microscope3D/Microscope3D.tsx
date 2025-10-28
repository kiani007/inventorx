'use client';

import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Center, Html, useTexture } from '@react-three/drei';
// @ts-expect-error Three.js types
import * as THREE from 'three';
import { FBXLoader } from 'three-stdlib';

// Microscope 3D Model Component
function MicroscopeModel() {
  const groupRef = useRef<THREE.Group>(null);
  // Load FBX from public folder
  const fbx = useLoader(FBXLoader, '/models/microscope/model.fbx');
  
  // Load all textures
  const textures = useTexture({
    map: '/models/microscope/textures/DefaultMaterial_C.png',
    aoMap: '/models/microscope/textures/DefaultMaterial_AO.png',
    metalnessMap: '/models/microscope/textures/DefaultMaterial_M.png',
    normalMap: '/models/microscope/textures/DefaultMaterial_N.png',
    roughnessMap: '/models/microscope/textures/DefaultMaterial_R.png',
  });

  // Apply textures to the model
  useEffect(() => {
    if (!fbx) return;
    
    // Configure texture settings
    Object.values(textures).forEach((texture) => {
      if (texture) {
        texture.flipY = false; // FBX models often need this
        texture.colorSpace = THREE.SRGBColorSpace;
      }
    });
    
    fbx.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Create a new material with all textures
        if (mesh.material) {
          const newMaterial = new THREE.MeshStandardMaterial({
            map: textures.map,
            aoMap: textures.aoMap,
            aoMapIntensity: 1,
            metalnessMap: textures.metalnessMap,
            metalness: 0.5,
            normalMap: textures.normalMap,
            normalScale: new THREE.Vector2(1, 1),
            roughnessMap: textures.roughnessMap,
            roughness: 0.5,
            side: THREE.DoubleSide,
            envMapIntensity: 0.8,
          });
          
          // Apply the new material
          mesh.material = newMaterial;
          
          // Enable second UV channel for AO map if available
          if (mesh.geometry.attributes.uv2) {
            mesh.material.aoMap = textures.aoMap;
          }
        }
      }
    });
  }, [fbx, textures]);

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
        <Canvas shadows dpr={1} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }} onCreated={({ gl }) => {
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
          {/* Enhanced Lighting Setup for textured model */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.2} 
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#ffffff" />
          <spotLight 
            position={[0, 15, 0]} 
            angle={0.3} 
            penumbra={1} 
            intensity={0.8} 
            color="#D4AF37"
            castShadow
          />
          <pointLight position={[0, -5, 0]} intensity={0.4} color="#D4AF37" />
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