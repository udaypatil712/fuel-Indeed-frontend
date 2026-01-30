import { SlEnergy } from "react-icons/sl";

export default function SpeedDeliveryCount({ station, onClick }) {
  const isActive = station.speedDeliveryCount > 0;

  return (
    <div className="relative group">
      {/* Glow only if active */}
      {isActive && (
        <div className="absolute inset-0 rounded-full bg-orange-400 blur-md opacity-70 animate-pulse pointer-events-none"></div>
      )}

      {/* CLICKABLE BUTTON */}
      <div
        onClick={() => {
          if (!isActive) return; // ❌ block click if 0
          console.log("Speed icon clicked");
          onClick();
        }}
        className={`relative p-3 rounded-full shadow-xl transition-all duration-300
          ${
            isActive
              ? "bg-gradient-to-br from-orange-500 to-red-500 hover:scale-110 cursor-pointer"
              : "bg-gray-200 cursor-not-allowed opacity-60"
          }
        `}
      >
        <SlEnergy
          className={`text-xl ${isActive ? "text-white" : "text-gray-500"}`}
        />

        {/* Count Badge */}
        {isActive && (
          <span
            className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] 
            font-bold w-5 h-5 flex items-center justify-center rounded-full pointer-events-none"
          >
            {station.speedDeliveryCount}
          </span>
        )}
      </div>

      {/* Tooltip */}
      {isActive && (
        <div
          className="absolute right-full top-1/2 -translate-y-1/2 mr-3
          scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100
          transition-all duration-300 origin-right z-50 pointer-events-none"
        >
          <div className="bg-black text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
            ⚡ You have assigned Speed Delivery
          </div>
        </div>
      )}
    </div>
  );
}
