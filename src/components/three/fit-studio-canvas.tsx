'use client';

import dynamic from 'next/dynamic';
import { Suspense, useMemo } from 'react';
import type { Product } from '@/types/product';

const Canvas = dynamic(() => import('@react-three/fiber').then((module) => module.Canvas), { ssr: false });
const Float = dynamic(() => import('@react-three/drei').then((module) => module.Float), { ssr: false });
const Environment = dynamic(() => import('@react-three/drei').then((module) => module.Environment), { ssr: false });
const OrbitControls = dynamic(() => import('@react-three/drei').then((module) => module.OrbitControls), { ssr: false });
const ContactShadows = dynamic(() => import('@react-three/drei').then((module) => module.ContactShadows), { ssr: false });

function TeeObject({ color = '#FF4E5B', position = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position} rotation={[0.05, -0.35, 0.03]}>
      <mesh position={[0, 0, 0]} scale={[1.35, 1.65, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} roughness={0.72} metalness={0.02} />
      </mesh>
      <mesh position={[-0.9, 0.36, 0]} rotation={[0, 0, -0.18]} scale={[0.62, 0.78, 0.07]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} roughness={0.74} />
      </mesh>
      <mesh position={[0.9, 0.36, 0]} rotation={[0, 0, 0.18]} scale={[0.62, 0.78, 0.07]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} roughness={0.74} />
      </mesh>
      <mesh position={[0, 0.55, 0.065]} scale={[0.36, 0.12, 0.03]}>
        <torusGeometry args={[1, 0.18, 16, 48, Math.PI]} />
        <meshStandardMaterial color="#FFF7E8" roughness={0.52} />
      </mesh>
      <mesh position={[0, -0.04, 0.08]} scale={[0.55, 0.55, 0.02]}>
        <circleGeometry args={[1, 48]} />
        <meshStandardMaterial color="#12100E" roughness={0.45} />
      </mesh>
    </group>
  );
}

function SneakerObject({ color = '#275DFF', position = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position} rotation={[0.15, 0.45, 0]}>
      <mesh position={[0, -0.22, 0]} scale={[1.95, 0.28, 0.62]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FFF7E8" roughness={0.43} metalness={0.04} />
      </mesh>
      <mesh position={[0.12, 0.12, -0.04]} scale={[1.25, 0.46, 0.5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.38} />
      </mesh>
      <mesh position={[0.82, 0.04, 0]} scale={[0.54, 0.28, 0.5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#C9FF3C" roughness={0.48} />
      </mesh>
      <mesh position={[-0.62, 0.22, 0.02]} scale={[0.42, 0.36, 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#12100E" roughness={0.5} />
      </mesh>
    </group>
  );
}

function StudioScene({ products }: { products: Product[] }) {
  const palette = useMemo(() => {
    const source = products.slice(0, 4).map((product) => product.category === 'sneakers' ? '#275DFF' : product.category === 'hoodies' ? '#4A2E22' : '#FF4E5B');
    return source.length ? source : ['#FF4E5B', '#275DFF', '#C9FF3C'];
  }, [products]);

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 6]} intensity={2.25} />
      <pointLight position={[-4, 2, 3]} intensity={0.9} color="#ff4e5b" />
      <Suspense fallback={null}>
        <Float speed={1.5} rotationIntensity={0.38} floatIntensity={0.72}>
          <TeeObject color={palette[0]} position={[-1.95, 0.25, 0]} />
        </Float>
        <Float speed={1.85} rotationIntensity={0.55} floatIntensity={0.95}>
          <SneakerObject color={palette[1]} position={[1.28, -0.42, 0.1]} />
        </Float>
        <Float speed={1.25} rotationIntensity={0.28} floatIntensity={0.52}>
          <TeeObject color="#C9FF3C" position={[0.2, 0.75, -0.55]} />
        </Float>
        <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[4.8, 4.8, 1]}>
          <circleGeometry args={[1, 96]} />
          <meshStandardMaterial color="#FBF0D4" roughness={0.82} />
        </mesh>
        <ContactShadows position={[0, -1.02, 0]} opacity={0.45} scale={8} blur={2.4} far={4} />
        <Environment preset="studio" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.75} />
      </Suspense>
    </>
  );
}

export function FitStudioCanvas({ products }: { products: Product[] }) {
  return (
    <div className="relative min-h-[620px] overflow-hidden rounded-[3.5rem] border border-ink/10 bg-ink shadow-soft">
      <Canvas camera={{ position: [0, 1.2, 6.2], fov: 42 }} dpr={[1, 1.5]}>
        <StudioScene products={products} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-7 text-cream md:p-10">
        <p className="text-xs font-black uppercase tracking-[.24em] text-lime">Interactive fit studio</p>
        <h2 className="mt-2 max-w-2xl font-display text-6xl font-black leading-[.84] tracking-[-.09em]">Tee forms, sneaker motion, real boutique context.</h2>
      </div>
    </div>
  );
}
