import { Stars } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";

export default function StarBackground() {
  const { size } = useThree();

  const count = useMemo(() => {
    if (size.width < 480) return 1000;
    if (size.width < 768) return 2400;
    return 2500;
  }, [size]);

  return (
    <Stars radius={40} depth={40} count={count} factor={3} fade speed={0.8} />
  );
}
