import { Stars } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useMemo, useRef, memo } from "react";

function StarBackground() {
  const { size } = useThree();
  const starRef = useRef();

  const count = useMemo(() => {
    const w = size.width;

    if (w < 480) return 800;
    if (w < 768) return 1500;
    return 2000;
  }, [size.width]);

  // 🔥 THIS makes it rotate infinitely
  useFrame((state, delta) => {
    if (starRef.current) {
      starRef.current.rotation.y += delta * 0.05; // smooth slow rotation
    }
  });

  return (
    <group ref={starRef}>
      <Stars radius={100} depth={50} count={count} factor={4} fade />
    </group>
  );
}

export default memo(StarBackground);
