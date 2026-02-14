import { memo } from "react";

const RotatingFrame = memo(function RotatingFrame() {
  return (
    <div className="pointer-events-none">
      <svg
        viewBox="0 0 200 200"
        className="w-[160px] sm:w-[220px] lg:w-[280px] rotate-frame"
      >
        <path d="M20 20 L180 20 L180 180 L20 180 Z" className="frame-line" />
        <path d="M20 20 L180 180" className="frame-line" />
        <path d="M180 20 L20 180" className="frame-line" />

        <circle cx="20" cy="20" r="5" className="frame-dot" />
        <circle cx="180" cy="20" r="5" className="frame-dot" />
        <circle cx="180" cy="180" r="5" className="frame-dot" />
        <circle cx="20" cy="180" r="5" className="frame-dot" />
      </svg>
    </div>
  );
});

export default RotatingFrame;
