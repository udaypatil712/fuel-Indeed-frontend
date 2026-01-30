import { Text, Float, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function WelcomeSignal() {
  const lineRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lineRef.current) {
      lineRef.current.position.x = Math.sin(t * 1.5) * 0.4;
      lineRef.current.material.opacity = 0.5 + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <Float speed={1.2} floatIntensity={0.25} rotationIntensity={0.15}>
      {/* 🔤 MAIN TITLE */}
      <Text
        fontSize={1.25}
        letterSpacing={-0.05}
        color="#22c55e"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.4, 0]}
      >
        FUEL INDEED
      </Text>

      {/* ✨ FAKE GLOW (BACK TEXT) */}
      <Text
        fontSize={1.28}
        color="#00ff99"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.4, -0.05]}
        fillOpacity={0.25}
      >
        FUEL INDEED
      </Text>

      {/* ⚡ SIGNAL LINE */}
      <Line
        ref={lineRef}
        points={[
          [-2, 0, 0],
          [2, 0, 0],
        ]}
        color="#00ffff"
        lineWidth={2}
        transparent
      />

      {/* 🧠 SUBTITLE */}
      <Text
        fontSize={0.35}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
        position={[0, -0.5, 0]}
      >
        Smart Fuel Booking Platform
      </Text>
    </Float>
  );
}
