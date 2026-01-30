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
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      setAdmin(res.data); // must be single object
    }
    adminDetails();
  }, []);

  useEffect(() => {
    async function fetchStation() {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/payment/${stationId}`,
        { withCredentials: true },
      );

      // console.log(res.data.ownerEmail);
      // console.log(res.data);

      setStation(res.data.station);
      setStationOwnerEmail(res.data.ownerEmail);
    }
    fetchStation();
  }, [stationId]);

  if (!station || !admin) {
    return <div className="p-10 text-xl">Loading receipt...</div>;
  }

  // 🧮 Calculations
  const petrolAmount = station.petrolQty * admin[0].petrolRate;
  const dieselAmount = station.dieselQty * admin[0].dieselRate;
  const total = petrolAmount + dieselAmount;

  // console.log(admin[0].quantity.petrol - station.petrolQty);
  // console.log(admin[0].quantity.disel - station.dieselQty);

  let updatedQuantityOfPetrol = admin[0].quantity.petrol - station.petrolQty;
  let updatedQuantityOfDiesel = admin[0].quantity.disel - station.dieselQty;
  console.log(stationOwnerEmail);
  // console.log(station._id);
  // console.log(admin[0]._id);

  async function updateFuel() {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/admin/updateQuantity/${admin[0]._id}`,
      {
        stationId: station._id,
        updatedQuantityOfPetrol,
        updatedQuantityOfDiesel,
        stationOwnerEmail: stationOwnerEmail,
        petrolQty: station.petrolQty,
        dieselQty: station.dieselQty,
        petrolRate: admin[0].petrolRate,
        dieselRate: admin[0].dieselRate,
        totalAmount: total,
      },
      { withCredentials: true },
    );
    navigate("/admin/profile");
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            🧾 Payment Receipt
          </h1>
          {/* <p>Owner Email: {ownerEmail}</p> */}

          <div className="border-b pb-4 mb-4">
            <p className="text-lg font-semibold">⛽ {station.stationName}</p>
            <p className="text-gray-500">Pincode: {station.pincode}</p>
            <p className="text-gray-500">Open Time: {station.openTime}</p>
          </div>

          {/* Table */}
          <table className="w-full border text-left mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Fuel</th>
                <th className="p-3 border">Qty (L)</th>
                <th className="p-3 border">Rate ₹</th>
                <th className="p-3 border">Amount ₹</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border">Petrol</td>
                <td className="p-3 border">{station.petrolQty}</td>
                <td className="p-3 border">{admin[0].petrolRate}</td>
                <td className="p-3 border font-semibold">₹ {petrolAmount}</td>
              </tr>
              <tr>
                <td className="p-3 border">Diesel</td>
                <td className="p-3 border">{station.dieselQty}</td>
                <td className="p-3 border">{admin[0].dieselRate}</td>
                <td className="p-3 border font-semibold">₹ {dieselAmount}</td>
              </tr>
            </tbody>
          </table>

          {/* Total */}
          <div className="flex justify-between text-xl font-bold border-t pt-4">
            <span>Total Amount</span>
            <span>₹ {total}</span>
          </div>

          <button
            onClick={() => updateFuel()}
            className="mt-6 w-full py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </>
  );
}
