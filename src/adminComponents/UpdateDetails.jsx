import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdateDetails() {
  const navigate = useNavigate();
  const [petrolQty, setPetrolQty] = useState("");
  const [dieselQty, setDieselQty] = useState("");
  const [petrolRate, setPetrolRate] = useState("");
  const [dieselRate, setDieselRate] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!petrolQty || !dieselQty || !petrolRate || !dieselRate) {
      setMessage(" All fields are required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/update-stock`, // 🔁 change to your API
        {
          petrolQty,
          dieselQty,
          petrolRate,
          dieselRate,
        },
        {
          withCredentials: true,
        },
      );

      navigate("/admin/profile");

      // console.log(res.data);

      //   setMessage("Fuel stock updated successfully");

      //   // Reset form
      //   setPetrolQty("");
      //   setDieselQty("");
      //   setPetrolRate("");
      //   setDieselRate("");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
        ⛽ Fuel Stock Setup
      </h1>
      <p className="text-gray-500 text-center mb-6">
        Update fuel stock details
      </p>

      {message && (
        <p
          className={`text-center mb-4 font-medium ${
            message.includes("❌") ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Petrol Quantity (L)
          </label>
          <input
            type="number"
            className="input"
            placeholder="Enter petrol quantity"
            value={petrolQty}
            onChange={(e) => setPetrolQty(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Diesel Quantity (L)
          </label>
          <input
            type="number"
            className="input"
            placeholder="Enter diesel quantity"
            value={dieselQty}
            onChange={(e) => setDieselQty(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Petrol Rate
          </label>
          <input
            type="number"
            className="input"
            placeholder="Enter petrol rate"
            value={petrolRate}
            onChange={(e) => setPetrolRate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Diesel Rate
          </label>
          <input
            type="number"
            className="input"
            placeholder="Enter diesel rate"
            value={dieselRate}
            onChange={(e) => setDieselRate(e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-black
          bg-gradient-to-r from-green-400 to-cyan-400
          hover:scale-[1.02] transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "💾 Save Details"}
        </button>
      </form>
    </div>
  );
}
