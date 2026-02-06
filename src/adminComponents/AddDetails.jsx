import { useState, useEffect } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import UpdateDetails from "./UpdateDetails";

export async function AdminAction({ request }) {
  const formData = await request.formData();

  const petrolQuantity = formData.get("petrolQuantity");
  const diselQuantity = formData.get("diselQuantity");
  const petrolRate = formData.get("petrolRate");
  const dieselRate = formData.get("dieselRate");

  if (!petrolQuantity || !diselQuantity || !petrolRate || !dieselRate) {
    return { error: "All fields are required" };
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/complete-details`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          petrolQuantity,
          diselQuantity,
          petrolRate,
          dieselRate,
        }),
      },
    );

    const data = await res.json();
    //console.log(data);
    if (!res.ok) {
      return { error: data.message || "Something went wrong" };
    }

    return redirect("/admin/profile");
  } catch (err) {
    return { error: "Server error. Try again later." };
  }
}

export default function AddDetailsAdmin() {
  const actionData = useActionData();
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
        credentials: "include",
      });
      const result = await res.json();
     // console.log(result);
      setData(result);
    }

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4">
      {!data.isProfileCompleted ? (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            ⛽ Fuel Stock Setup
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Add fuel stock details
          </p>

          {actionData?.error && (
            <p className="text-red-500 text-center mb-4">{actionData.error}</p>
          )}

          <Form method="post" className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Petrol Quantity (L)
              </label>
              <input
                type="number"
                name="petrolQuantity"
                className="input"
                placeholder="Enter petrol quantity"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diesel Quantity (L)
              </label>
              <input
                type="number"
                name="diselQuantity"
                className="input"
                placeholder="Enter diesel quantity"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Petrol Rate
              </label>
              <input
                type="number"
                name="petrolRate"
                className="input"
                placeholder="Enter Petrol Rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diesel Rate
              </label>
              <input
                type="number"
                name="dieselRate"
                className="input"
                placeholder="Enter diesel Rate"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-black
            bg-gradient-to-r from-green-400 to-cyan-400
            hover:scale-[1.02] transition"
            >
              💾 Save Details
            </button>
          </Form>
        </div>
      ) : (
        <UpdateDetails />
      )}
    </div>
  );
}
