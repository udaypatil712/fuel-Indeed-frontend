import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { IoMdNotifications } from "react-icons/io";
import { useDebounce } from "./useDebounce";
import ShowStationsDeliveryPersons from "./ShowDeliveryPersons";
import SpeedDeliveryCount from "./SpeedDeliveryCount";

export default function FuelProfile() {
  const [user, setUser] = useState(null);
  const [allStations, setAllStations] = useState([]);
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");
  const [newTab, setNewTab] = useState("stations");
  const debounceSearch = useDebounce(search, 300);
  const navigate = useNavigate();

  // 🔹 Load profile
  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
        credentials: "include",
      });
      const result = await res.json();
      setUser(result);
    }
    fetchProfile();
  }, []);

  // 🔹 Load stations & search
  useEffect(() => {
    async function loadStations() {
      setLoader(true);

      if (!debounceSearch) {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/fuelStation/allStations`,
          {
            credentials: "include",
          },
        );
        const data = await res.json();
        setAllStations(data);
        setLoader(false);
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/fuelStation/searchStation`,
        {
          params: { search: debounceSearch },
          withCredentials: true,
        },
      );

      setAllStations(res.data);
      setLoader(false);
    }

    loadStations();
  }, [debounceSearch]);

  // 🔹 Approval
  async function approvalRequest(stationId) {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/station/${stationId}`,
        {},
        { withCredentials: true },
      );
      alert("Request sent successfully");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      alert(message);
    }
  }

  //speed Delivery Order

  async function orderConfirmed(stationId) {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/fuelStation/assignSpeedOrder/${stationId}`,
      { withCredentials: true },
    );
    navigate("/fuelStation/profile/assignSpeedOrder", { state: res.data });

    // console.log(stationId);
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* SIDEBAR */}
      <Sidebar setNewTab={setNewTab} user={user} />

      {/* RIGHT SIDE */}
      <div className="ml-64 flex-1 flex flex-col overflow-y-auto h-screen">
        {/* HEADER */}
        <Header setSearch={setSearch} />

        {/* CONTENT */}
        <main className="p-6">
          {loader ? (
            <div className="flex justify-center py-20">
              <Loader />
            </div>
          ) : newTab === "stations" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allStations.map((station) => (
                <div
                  key={station._id}
                  className="group bg-white rounded-3xl overflow-hidden 
      border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden">
                    <img
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                      src={`${import.meta.env.VITE_API_URL}/fuelStation/image/${station._id}`}
                      alt="station"
                    />

                    {/* TOP RIGHT ICONS */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      {/* Spark */}
                      {/* Speed Delivery Badge */}
                      <SpeedDeliveryCount
                        station={station}
                        onClick={() => orderConfirmed(station._id)}
                      />

                      {/* Notification */}
                      <div className="relative bg-white/90 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition cursor-pointer">
                        <IoMdNotifications className="text-2xl text-gray-700" />
                        {station.notificationsCount > 0 && (
                          <Link
                            to={`/fuelStation/profile/assignDelivery/${station._id}`}
                            className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] 
                font-bold w-5 h-5 flex items-center justify-center rounded-full"
                          >
                            {station.notificationsCount}
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* STATUS BADGE */}
                    <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                      {station.status}
                    </div>

                    {/* HOVER GRADIENT */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold truncate">
                        {station.stationName}
                      </h2>

                      <Link
                        to={`/fuelStation/profile/updateStation/${station._id}`}
                        className="px-4 py-2 text-sm text-white rounded-lg 
            bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg transition"
                      >
                        Update
                      </Link>
                    </div>

                    {/* TIME */}
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>🕒 Opens: {station.openTime} AM</span>
                      <span>🕕 Closes: {station.closeTime} PM</span>
                    </div>

                    {/* PRICE LIST */}
                    <div className="border-t pt-3 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>⛽ Petrol</span>
                        <span className="font-semibold text-green-600">
                          ₹ {station.petrolRate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>🛢️ Diesel</span>
                        <span className="font-semibold text-blue-600">
                          ₹ {station.dieselRate}
                        </span>
                      </div>
                    </div>

                    {/* ACTION BUTTON */}
                    <button
                      onClick={() => approvalRequest(station._id)}
                      className="w-full mt-3 py-3 rounded-xl 
          bg-gradient-to-r from-green-400 to-cyan-400 
          text-black font-semibold tracking-wide
          hover:scale-[1.03] hover:shadow-lg transition-all duration-300"
                    >
                      Send Approval Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ShowStationsDeliveryPersons />
          )}
        </main>
      </div>
    </div>
  );
}
