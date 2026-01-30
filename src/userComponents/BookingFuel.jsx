import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGasPump, FaOilCan } from "react-icons/fa";

export default function BookingFuel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [station, setStation] = useState(null);
  const [fuelType, setFuelType] = useState("petrol");
  const [litres, setLitres] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load station
  useEffect(() => {
    async function loadStation() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/bookingFuel/${id}`,
          { withCredentials: true },
        );
        console.log(res.data);
        setStation(res.data);
      } catch (err) {
        setError("Failed to load station");
      }
    }
    loadStation();
  }, [id]);

  if (!station) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading booking details...
      </div>
    );
  }

  const rate = fuelType === "petrol" ? station.petrolRate : station.dieselRate;

  const previewTotal = litres * rate; // UI only

  // Place Order
  function placeOrder() {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        try {
          setLoading(true);
          setError("");

          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/bookingFuel/${id}`,
            {
              lat,
              lng,
              litres,
              fuelType,
            },
            { withCredentials: true },
          );
          console.log(res.data);
          navigate("/user/profile/bookingFuel/order-confirmed", {
            state: res.data,
          });
        } catch (err) {
          setError(err.response?.data?.message || "Booking failed");
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("Location permission denied");
      },
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#e0f2fe]">
      {/* Error Toast */}
      {error && (
        <div className="absolute top-4 z-50">
          <div className="flex items-center gap-3 rounded-xl border border-red-300 bg-red-100 px-4 py-3 shadow-lg">
            <span className="text-xl">⚠️</span>
            <p className="text-sm font-semibold text-red-900">{error}</p>
          </div>
        </div>
      )}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="backdrop-blur-xl bg-white/70  rounded-3xl shadow-2xl p-6 w-full max-w-md"
      >
        {/* Image */}
        <img
          src={`${import.meta.env.VITE_API_URL}/fuelStation/image/${station._id}`}
          alt="station"
          className="w-full h-48 object-cover rounded-2xl shadow-lg"
        />

        <h1 className="text-2xl font-bold mt-4">{station.stationName}</h1>

        {/* Rates */}
        <div className="flex justify-between mt-4 text-sm text-slate-600">
          <span>⛽ Petrol: ₹{station.petrolRate}/L</span>
          <span>🛢 Diesel: ₹{station.dieselRate}/L</span>
        </div>

        {/* Fuel Type */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setFuelType("petrol")}
            className={`flex-1 p-3 rounded-xl font-semibold ${
              fuelType === "petrol" ? "bg-sky-500 text-white" : "bg-slate-100"
            }`}
          >
            <FaGasPump className="inline" /> Petrol
          </button>

          <button
            onClick={() => setFuelType("diesel")}
            className={`flex-1 p-3 rounded-xl font-semibold ${
              fuelType === "diesel"
                ? "bg-indigo-500 text-white"
                : "bg-slate-100"
            }`}
          >
            <FaOilCan className="inline" /> Diesel
          </button>
        </div>

        {/* Litres */}
        <div className="mt-6">
          <label className="font-semibold">Enter Litres</label>
          <input
            type="number"
            min="1"
            max="10"
            value={litres}
            onChange={(e) => setLitres(Number(e.target.value))}
            className="w-full mt-2 p-3 rounded-xl border"
          />
        </div>

        {/* Total Preview */}
        <div className="mt-6 text-lg font-bold flex justify-between">
          <span>Estimated Total</span>
          <span className="text-sky-600">₹ {previewTotal}</span>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          onClick={placeOrder}
          className="w-full mt-6 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-xl disabled:opacity-50"
        >
          {loading ? "Processing..." : "🛒 Place Order"}
        </button>
      </motion.div>
    </div>
  );
}
