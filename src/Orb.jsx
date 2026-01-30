import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sphere,
  MeshDistortMaterial,
  Stars,
  Ring,
  OrbitControls,
} from "@react-three/drei";
import { useRef } from "react";

function FuelCore() {
  const core = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  // const ring4 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    core.current.rotation.y = t * 0.3;
    core.current.rotation.x = t * 0.15;
    core.current.position.y = Math.sin(t) * 0.15;

    ring1.current.rotation.z = t * 0.6;
    ring2.current.rotation.x = t * 0.5;
    ring3.current.rotation.y = t * 0.4;
  });

  return (
    <>
      {/* 🔁 RINGS (LIKE ATOM / ENERGY) */}
      <Ring ref={ring1} args={[1.6, 1.65, 128]} rotation={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00ff99"
          emissive="#00ff99"
          emissiveIntensity={2}
          transparent
          opacity={0.7}
        />
      </Ring>

      <Ring ref={ring2} args={[1.8, 1.85, 128]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </Ring>

      <Ring ref={ring3} args={[2.0, 2.05, 128]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={2}
          transparent
          opacity={0.5}
        />
      </Ring>
      {/* <Ring ref={ring4} args={[2.0, 2.05, 128]} rotation={[0, 0, 0]}>
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={2}
          transparent
          opacity={0.5}
        />
      </Ring> */}

      {/* 🔥 FUEL CORE */}
      <Sphere args={[1.1, 128, 128]} ref={core}>
        <meshPhysicalMaterial
          transmission={1}
          thickness={1.2}
          roughness={0}
          metalness={0}
          ior={1.5}
          envMapIntensity={2}
          color="#38bdf8"
          emissive="#0ea5e9"
          emissiveIntensity={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </Sphere>
    </>
  );
}

export default function Orb() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      {/* 🌌 STARS INSIDE CANVAS */}
      <Stars radius={100} depth={50} count={4000} factor={4} fade speed={1} />

      {/* 💡 LIGHTS */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2.5} color="#00ff99" />
      <pointLight position={[-5, -5, -5]} intensity={2} color="#00ffff" />

      {/* ☢️ FUEL REACTOR */}
      <FuelCore />

      {/* 🎥 CAMERA */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}
