import { Sphere, Ring } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, memo } from "react";

function FuelCircle() {
  const core = useRef(null);
  const r1 = useRef(null);
  const r2 = useRef(null);
  const r3 = useRef(null);

  const { viewport } = useThree();

  // ✅ Only depend on width
  const scale = useMemo(() => {
    const w = viewport.width;

    if (w < 4) return 0.85;
    if (w < 6) return 1.0;
    if (w < 8) return 1.15;
    return 1.3;
  }, [viewport.width]);

  // ✅ Animation (UNCHANGED)
  useFrame((state) => {
    if (!core.current) return;

    const t = state.clock.getElapsedTime();

    core.current.rotation.y = t * 0.3;
    core.current.position.y = Math.sin(t) * 0.15;

    if (r1.current) r1.current.rotation.z = t * 0.5;
    if (r2.current) r2.current.rotation.x = t * 0.4;
    if (r3.current) r3.current.rotation.y = t * 0.3;
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

export default memo(FuelCircle);
