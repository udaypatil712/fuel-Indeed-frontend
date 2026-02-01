import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";

import StarBackground from "./Star";
import FuelCircle from "./Circle";

function ResponsiveCamera() {
  const { camera, viewport } = useThree();

  useEffect(() => {
    const w = viewport.width;

    if (w < 4) {
      camera.position.set(0, 0, 6);
      camera.fov = 55;
    } else if (w < 6) {
      camera.position.set(0, 0, 5);
      camera.fov = 48;
    } else {
      camera.position.set(0, 0, 4);
      camera.fov = 40;
    }

    camera.updateProjectionMatrix();
  }, [camera, viewport]);

  return null;
}

export default function Orb() {
  return (
    <Canvas
      className="w-full h-full"
      dpr={[1, 1.75]}
      performance={{ min: 0.5 }}
      gl={{ antialias: false }}
    >
      <ResponsiveCamera />

      <StarBackground />

      <ambientLight intensity={0.7} />

      <pointLight position={[5, 5, 5]} intensity={1.8} />
      <pointLight position={[-5, -5, -5]} intensity={1.2} />

      <FuelCircle />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
      />
    </Canvas>
  );
}
