import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaGasPump, FaMoneyBillWave, FaLock } from "react-icons/fa";

export default function Payment() {
  const { id: stationId } = useParams();
  const navigate = useNavigate();

  const [station, setStation] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [stationOwnerEmail, setStationOwnerEmail] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= LOAD ADMIN ================= */

  useEffect(() => {
    async function adminDetails() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/adminDetails`,
          { withCredentials: true },
        );

        setAdmin(res.data);
      } catch {
        setError("Failed to load admin details");
      }
    }

    adminDetails();
  }, []);

  /* ================= LOAD STATION ================= */

  useEffect(() => {
    async function fetchStation() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/payment/${stationId}`,
          { withCredentials: true },
        );

        setStation(res.data.station);
        setStationOwnerEmail(res.data.ownerEmail);
      } catch {
        setError("Failed to load station details");
      }
    }

    fetchStation();
  }, [stationId]);

  /* ================= LOADING ================= */

  if (!station || !admin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">
        Loading payment details...
      </div>
    );
  }

  /* ================= CALCULATIONS ================= */

  const petrolAmount = station.petrolQty * admin[0].petrolRate;
  const dieselAmount = station.dieselQty * admin[0].dieselRate;

  const total = petrolAmount + dieselAmount;

  /* ================= PAYMENT ================= */

  async function updateFuel() {
    try {
      setLoading(true);
      setError("");

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/updateQuantity/${admin[0]._id}`,
        {
          stationId: station._id,
          stationOwnerEmail,

          petrolQty: station.petrolQty,
          dieselQty: station.dieselQty,

          petrolRate: admin[0].petrolRate,
          dieselRate: admin[0].dieselRate,

          totalAmount: total,
        },
        { withCredentials: true },
      );

      navigate("/admin/profile");
    } catch (err) {
      const message =
        err.response?.data?.message || "Payment failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  /* ================= UI ================= */

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br from-green-50 via-white to-emerald-100
        flex items-center justify-center
        px-4 py-6
      "
    >
      <div
        className="
          w-full max-w-2xl
          bg-white/90 backdrop-blur-xl
          rounded-3xl
          shadow-2xl
          border border-white/40
          p-5 sm:p-7 md:p-8
        "
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1
            className="
              text-2xl sm:text-3xl md:text-4xl
              font-extrabold text-gray-800
              flex items-center justify-center gap-2
            "
          >
            <FaMoneyBillWave className="text-green-500" />
            Payment Receipt
          </h1>

          <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1">
            <FaLock className="text-xs" /> Secure Transaction
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div
            className="
              mb-5
              p-3
              rounded-xl
              bg-red-100 text-red-700
              border border-red-300
              text-sm text-center
            "
          >
            ⚠️ {error}
          </div>
        )}

        {/* STATION INFO */}
        <div
          className="
            bg-gray-50
            rounded-xl
            p-4 mb-5
            text-sm sm:text-base
            border
          "
        >
          <p className="font-semibold flex items-center gap-2">
            <FaGasPump className="text-green-500" />
            {station.stationName}
          </p>

          <p className="text-gray-600">Pincode: {station.pincode}</p>
          <p className="text-gray-600">Open Time: {station.openTime}</p>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border mb-5">
          <table className="w-full text-sm sm:text-base">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Fuel</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-center">Rate</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-3">Petrol</td>
                <td className="p-3 text-center">{station.petrolQty}</td>
                <td className="p-3 text-center">₹{admin[0].petrolRate}</td>
                <td className="p-3 text-right font-medium">₹{petrolAmount}</td>
              </tr>

              <tr className="border-t">
                <td className="p-3">Diesel</td>
                <td className="p-3 text-center">{station.dieselQty}</td>
                <td className="p-3 text-center">₹{admin[0].dieselRate}</td>
                <td className="p-3 text-right font-medium">₹{dieselAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* TOTAL */}
        <div
          className="
            flex justify-between items-center
            bg-green-50
            border border-green-200
            rounded-xl
            px-4 py-3
            text-base sm:text-lg
            font-bold
            mb-6
          "
        >
          <span>Total Amount</span>
          <span className="text-green-700 text-xl">₹ {total}</span>
        </div>

        {/* BUTTON */}
        <button
          onClick={updateFuel}
          disabled={loading}
          className="
            w-full
            py-3.5 sm:py-4

            rounded-xl

            bg-gradient-to-r from-green-500 to-emerald-600
            text-white font-semibold

            hover:opacity-95
            hover:shadow-lg

            transition-all

            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Processing Secure Payment..." : "Confirm & Pay"}
        </button>
      </div>
    </div>
  );
}
