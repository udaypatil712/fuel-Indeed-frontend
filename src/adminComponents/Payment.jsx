import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Payment() {
  const { id: stationId } = useParams();
  const navigate = useNavigate();

  const [station, setStation] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [stationOwnerEmail, setStationOwnerEmail] = useState(null);

  useEffect(() => {
    async function adminDetails() {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/adminDetails`,
        { withCredentials: true },
      );
      setAdmin(res.data);
    }
    adminDetails();
  }, []);

  useEffect(() => {
    async function fetchStation() {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/payment/${stationId}`,
        { withCredentials: true },
      );

      setStation(res.data.station);
      setStationOwnerEmail(res.data.ownerEmail);
    }
    fetchStation();
  }, [stationId]);

  if (!station || !admin) {
    return <div className="p-10 text-xl">Loading...</div>;
  }

  const petrolAmount = station.petrolQty * admin[0].petrolRate;
  const dieselAmount = station.dieselQty * admin[0].dieselRate;
  const total = petrolAmount + dieselAmount;

  async function updateFuel() {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/admin/updateQuantity/${admin[0]._id}`,
      {
        stationId: station._id,
        stationOwnerEmail,
        petrolQty: station.petrolQty,
        dieselQty: station.dieselQty,
        totalAmount: total,
      },
      { withCredentials: true },
    );

    navigate("/admin/profile");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
          🧾 Payment Receipt
        </h1>

        <div className="border-b pb-4 mb-4 text-sm sm:text-base">
          <p className="font-semibold">⛽ {station.stationName}</p>
          <p>Pincode: {station.pincode}</p>
          <p>Open Time: {station.openTime}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border text-left mb-6 text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Fuel</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Rate</th>
                <th className="p-2 border">Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-2 border">Petrol</td>
                <td className="p-2 border">{station.petrolQty}</td>
                <td className="p-2 border">₹{admin[0].petrolRate}</td>
                <td className="p-2 border">₹{petrolAmount}</td>
              </tr>

              <tr>
                <td className="p-2 border">Diesel</td>
                <td className="p-2 border">{station.dieselQty}</td>
                <td className="p-2 border">₹{admin[0].dieselRate}</td>
                <td className="p-2 border">₹{dieselAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between text-lg font-bold border-t pt-4">
          <span>Total</span>
          <span>₹ {total}</span>
        </div>

        <button
          onClick={updateFuel}
          className="mt-6 w-full py-3 sm:py-4 rounded-xl bg-green-500 text-white font-semibold"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}
  