import { Canvas } from "@react-three/fiber";
import { memo } from "react";
import StarBackground from "./Star";

function Orb() {
  return (
    <Canvas
      className="w-full h-full"
      gl={{ alpha: true }}
      style={{ background: "transparent" }}
      camera={{ position: [0, 0, 1] }}
    >
      {/* VERY IMPORTANT */}
      <ambientLight intensity={1} />

      <StarBackground />
    </Canvas>
  );
}

export default memo(Orb);

// import { Canvas, useThree } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { useEffect, memo, useMemo } from "react";

// import StarBackground from "./Star";
// import FuelCircle from "./Circle";

// /* ================= CAMERA ================= */

// function ResponsiveCamera() {
//   const { camera, viewport } = useThree();

//   useEffect(() => {
//     const w = viewport.width;

//     if (w < 4) {
//       camera.position.set(0, 0, 6);
//       camera.fov = 55;
//     } else if (w < 6) {
//       camera.position.set(0, 0, 5);
//       camera.fov = 48;
//     } else {
//       camera.position.set(0, 0, 4);
//       camera.fov = 40;
//     }

//     camera.updateProjectionMatrix();
//   }, [camera, viewport.width]); // ✅ stable dependency

//   return null;
// }

// /* ================= MAIN ================= */

// function Orb() {
//   // ✅ Memoize heavy props
//   const dpr = useMemo(() => [1, 1.75], []);
//   const performance = useMemo(() => ({ min: 0.5 }), []);
//   const gl = useMemo(() => ({ antialias: false }), []);

//   return (
//     <Canvas
//       className="w-full h-full"
//       // dpr={dpr}
//       // performance={performance}
//       // gl={gl}
//       frameloop="always"
//     >
//       <ResponsiveCamera />/

//       <StarBackground />

//       {/* <ambientLight intensity={0.7} /> */}

//       {/* <pointLight position={[5, 5, 5]} intensity={1.8} />
//       <pointLight position={[-5, -5, -5]} intensity={1.2} /> */}

//       {/* <FuelCircle /> */}

//       <OrbitControls
//         enableZoom={false}
//         enablePan={false}
//         autoRotate
//         autoRotateSpeed={0.35}
//       />
//     </Canvas>
//   );
// }

// export default memo(Orb);
