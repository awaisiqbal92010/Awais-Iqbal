import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Floating Geometric Shape with Orange / White Accents ──────── */
function FloatingGeometry({ position, geometry, color, speed = 1, rotationSpeed = 0.3 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003 * rotationSpeed;
      meshRef.current.rotation.y += 0.005 * rotationSpeed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {geometry === 'octahedron' && <octahedronGeometry args={[0.6, 0]} />}
        {geometry === 'torus' && <torusGeometry args={[0.5, 0.15, 16, 32]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[0.5, 0]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[0.4, 0]} />}
        {geometry === 'torusKnot' && <torusKnotGeometry args={[0.35, 0.1, 64, 16]} />}
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.2}
          wireframe
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

/* ── Glowing Particle Field in Orange / Amber ────────────────── */
function ParticleField({ count = 800 }) {
  const pointsRef = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ff6b00"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Glowing Orange Grid ─────────────────────────────────────── */
function GlowingGrid() {
  const gridRef = useRef();

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.PI / 2;
      gridRef.current.position.y = -3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <mesh ref={gridRef} position={[0, -3, 0]}>
      <planeGeometry args={[40, 40, 30, 30]} />
      <meshStandardMaterial
        color="#ff6b00"
        wireframe
        transparent
        opacity={0.04}
      />
    </mesh>
  );
}

/* ── Main 3D Background ──────────────────────────────────────── */
export default function Background3D() {
  return (
    <div className="hero-canvas">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#ff6b00" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ff8c38" />

        <Stars
          radius={50}
          depth={80}
          count={1200}
          factor={3}
          saturation={0.1}
          fade
          speed={0.5}
        />

        <ParticleField count={650} />
        <GlowingGrid />

        <FloatingGeometry position={[-4, 2, -3]} geometry="octahedron" color="#ff6b00" speed={0.8} />
        <FloatingGeometry position={[4, -1, -4]} geometry="torus" color="#ff8c38" speed={1.2} />
        <FloatingGeometry position={[-3, -2, -5]} geometry="icosahedron" color="#ffffff" speed={0.6} />
        <FloatingGeometry position={[3, 3, -6]} geometry="dodecahedron" color="#ffab5e" speed={1} />
        <FloatingGeometry position={[0, -3, -2]} geometry="torusKnot" color="#ff6b00" speed={0.9} rotationSpeed={0.5} />
      </Canvas>
    </div>
  );
}
