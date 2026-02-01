import { Sphere, Ring } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";

export default function FuelCircle() {
  const core = useRef();
  const r1 = useRef();
  const r2 = useRef();
  const r3 = useRef();

  const { viewport } = useThree();

  // ✅ Use world units (real 3D size)
  const scale = useMemo(() => {
    const w = viewport.width;

    if (w < 4) return 0.85; // Small phone
    if (w < 6) return 1.0; // Medium phone
    if (w < 8) return 1.15; // Tablet
    return 1.3; // Desktop
  }, [viewport]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (!core.current) return;

    core.current.rotation.y = t * 0.3;
    core.current.position.y = Math.sin(t) * 0.15;

    r1.current.rotation.z = t * 0.5;
    r2.current.rotation.x = t * 0.4;
    r3.current.rotation.y = t * 0.3;
  });

  return (
    <group scale={scale} position={[0, 0, 0]}>
      <Ring ref={r1} args={[1.6, 1.65, 96]}>
        <meshStandardMaterial color="#00ff99" emissive="#00ff99" />
      </Ring>

      <Ring ref={r2} args={[1.8, 1.85, 96]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" />
      </Ring>

      <Ring ref={r3} args={[2, 2.05, 96]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" />
      </Ring>

      <Sphere args={[1.1, 64, 64]} ref={core}>
        <meshPhysicalMaterial
          transmission={1}
          ior={1.5}
          color="#38bdf8"
          emissive="#0ea5e9"
        />
      </Sphere>
    </group>
  );
}
