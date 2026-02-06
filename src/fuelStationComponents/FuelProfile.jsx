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

  // 👉 NEW: Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const debounceSearch = useDebounce(search, 300);
  const navigate = useNavigate();

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

  async function orderConfirmed(stationId) {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/fuelStation/assignSpeedOrder/${stationId}`,
      { withCredentials: true },
    );

    navigate("/fuelStation/profile/assignSpeedOrder", {
      state: res.data,
    });
  }

  return (
    <div className="flex min-h-screen bg-slate-100 overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar
        user={user}
        setNewTab={setNewTab}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        {/* HEADER */}
        <Header setSearch={setSearch} setSidebarOpen={setSidebarOpen} />

        {/* CONTENT */}
        <main className="p-4 sm:p-6 mt-20">
          {loader ? (
            <div className="flex justify-center py-20">
              <Loader />
            </div>
          ) : newTab === "stations" ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 
              lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {allStations.map((station) => (
                <div
                  key={station._id}
                  className="group bg-white rounded-2xl overflow-hidden 
                  border shadow-md hover:shadow-xl transition-all"
                >
                  {/* Card unchanged */}

                  {/* IMAGE */}
                  <div className="relative overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${station.image}`}
                      loading="lazy"
                      className="w-full h-40 sm:h-48 md:h-52 object-cover 
                      transition-transform duration-500 group-hover:scale-105"
                      alt="station"
                    />

                    {/* TOP ICONS */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <SpeedDeliveryCount
                        station={station}
                        onClick={() => orderConfirmed(station._id)}
                      />

                      <div
                        className="relative bg-white/90 backdrop-blur 
                        p-1.5 rounded-full shadow pt-3"
                      >
                        <IoMdNotifications className="text-xl text-gray-700" />

                        {station.notificationsCount > 0 && (
                          <Link
                            to={`/fuelStation/profile/assignDelivery/${station._id}`}
                            className="absolute -top-1 -right-1 bg-red-500 
                            text-white text-[10px] font-bold 
                            w-4 h-4 flex items-center justify-center rounded-full"
                          >
                            {station.notificationsCount}
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* STATUS */}
                    <div
                      className="absolute top-2 left-2 bg-black/70 
                      text-white text-xs px-2 py-0.5 rounded-full"
                    >
                      {station.status}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 space-y-3 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm sm:text-base font-semibold truncate">
                        {station.stationName}
                      </h2>

                      <Link
                        to={`/fuelStation/profile/updateStation/${station._id}`}
                        className="px-3 py-1 text-xs text-white rounded-lg 
                        bg-gradient-to-r from-orange-500 to-red-500"
                      >
                        Update
                      </Link>
                    </div>

                    {/* TIME */}
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>🕒 {station.openTime}</span>
                      <span>🕕 {station.closeTime}</span>
                    </div>

                    {/* PRICE */}
                    <div className="border-t pt-2 text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>⛽ Petrol</span>
                        <span className="font-semibold text-green-600">
                          ₹{station.petrolRate}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>🛢️ Diesel</span>
                        <span className="font-semibold text-blue-600">
                          ₹{station.dieselRate}
                        </span>
                      </div>
                    </div>

                    {/* ACTION */}
                    <button
                      onClick={() => approvalRequest(station._id)}
                      className="w-full py-2 rounded-xl text-sm
                      bg-gradient-to-r from-green-400 to-cyan-400 
                      text-black font-semibold hover:opacity-90"
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
