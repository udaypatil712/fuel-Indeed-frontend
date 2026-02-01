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

  /* ================= LOAD STATION ================= */

  useEffect(() => {
    async function loadStation() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/bookingFuel/${id}`,
          { withCredentials: true },
        );

        setStation(res.data);
      } catch {
        setError("Failed to load station");
      }
    }

    loadStation();
  }, [id]);

  /* ================= LOADING ================= */

  if (!station) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading booking details...
      </div>
    );
  }

  const rate = fuelType === "petrol" ? station.petrolRate : station.dieselRate;

  const previewTotal = litres * rate;

  /* ================= PLACE ORDER ================= */

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

          navigate("/user/profile/bookingFuel/order-confirmed", {
            state: res.data,
          });
        } catch (err) {
          setError(err.response?.data?.message || "Booking failed");
        } finally {
          setLoading(false);
        }
      },
      () => alert("Location permission denied"),
    );
  }

  /* ================= UI ================= */

  return (
    <div
      className="relative min-h-screen flex items-center justify-center
      bg-gradient-to-br from-sky-50 via-indigo-50 to-cyan-100 px-4"
    >
      {/* ================= ERROR ================= */}

      {error && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-4 z-50 w-full max-w-sm"
        >
          <div
            className="flex gap-3 items-center rounded-xl
            border border-red-300 bg-red-100
            px-4 py-3 shadow-lg"
          >
            <span className="text-xl">⚠️</span>

            <p className="text-sm font-semibold text-red-900">{error}</p>
          </div>
        </motion.div>
      )}

      {/* ================= CARD ================= */}

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md sm:max-w-lg
        bg-white/80 backdrop-blur-xl
        rounded-3xl shadow-2xl p-5 sm:p-7"
      >
        {/* IMAGE */}
        <img
          src={`${import.meta.env.VITE_API_URL}/${station.image}`}
          alt="station"
          className="w-full h-44 sm:h-52 object-cover
          rounded-2xl shadow"
        />

        {/* TITLE */}
        <h1 className="text-xl sm:text-2xl font-bold mt-4 text-gray-900">
          {station.stationName}
        </h1>

        {/* RATES */}
        <div
          className="flex flex-col sm:flex-row
          justify-between gap-2 mt-3 text-sm text-gray-600"
        >
          <span>⛽ Petrol: ₹{station.petrolRate}/L</span>
          <span>🛢 Diesel: ₹{station.dieselRate}/L</span>
        </div>

        {/* ================= FUEL TYPE ================= */}

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={() => setFuelType("petrol")}
            className={`py-3 rounded-xl font-semibold transition
            ${
              fuelType === "petrol"
                ? "bg-sky-500 text-white shadow-lg"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            <FaGasPump className="inline mr-1" />
            Petrol
          </button>

          <button
            onClick={() => setFuelType("diesel")}
            className={`py-3 rounded-xl font-semibold transition
            ${
              fuelType === "diesel"
                ? "bg-indigo-500 text-white shadow-lg"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            <FaOilCan className="inline mr-1" />
            Diesel
          </button>
        </div>

        {/* ================= LITRES ================= */}

        <div className="mt-6">
          <label className="block font-semibold text-gray-700 mb-1">
            Enter Litres
          </label>

          <input
            type="number"
            min="1"
            max="10"
            value={litres}
            onChange={(e) => setLitres(Number(e.target.value))}
            className="w-full p-3 rounded-xl border
            focus:ring-2 focus:ring-sky-400 outline-none"
          />
        </div>

        {/* ================= TOTAL ================= */}

        <div
          className="mt-6 flex justify-between items-center
          text-lg font-bold"
        >
          <span className="text-gray-700">Estimated Total</span>

          <span className="text-sky-600">₹ {previewTotal}</span>
        </div>

        {/* ================= BUTTON ================= */}

        <button
          disabled={loading}
          onClick={placeOrder}
          className="w-full mt-7 py-3.5 rounded-xl
          text-lg font-bold text-white
          bg-gradient-to-r from-sky-500 to-indigo-500
          shadow-xl hover:scale-[1.02] transition
          disabled:opacity-50"
        >
          {loading ? "Processing..." : "🛒 Place Order"}
        </button>
      </motion.div>
    </div>
  );
}
