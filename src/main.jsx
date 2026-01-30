import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register, { RegisterAction } from "./authComponents/Register.jsx";
import Login, { LoginAction } from "./authComponents/Login.jsx";

import Profile from "./userComponents/Profile.jsx";
import AddDetails, {
  CompleteProfileAction,
} from "./userComponents/AddDetails.jsx";
import UserLayout from "./userComponents/UserLayout.jsx";

import FuelLayout from "./fuelStationComponents/FuelLayout.jsx";
import FuelProfile from "./fuelStationComponents/FuelProfile.jsx";
import StationAddDetails, {
  CompleteFuelStationAction,
} from "./fuelStationComponents/StationAddDetails.jsx";

import AddDetailsAdmin, { AdminAction } from "./adminComponents/AddDetails.jsx";
import ShowProfile from "./adminComponents/ShowProfile.jsx";
import AdminLayout from "./adminComponents/AdminLayout.jsx";

import ErrorPage from "./ErrorPage.jsx"; // ✅ ADD THIS
import Payment from "./adminComponents/Payment.jsx";
import UpdateStation, {
  UpdateActionStation,
} from "./fuelStationComponents/UpdateStation.jsx";
import BookingFuel from "./userComponents/BookingFuel.jsx";
import OrderConfirmed from "./userComponents/OrderConfirmed.jsx";
import AssignDelivery from "./fuelStationComponents/AssignDelivery.jsx";
import DeliveryLayout from "./deliveryPersonComponents/DeliveryLayout.jsx";
import DeliveryDashboard from "./deliveryPersonComponents/DeliveryPersonProfile.jsx";
import CompleteProfile, {
  DeliveryRegisterAction,
} from "./deliveryPersonComponents/CompleteProfile.jsx";
import AssignedDeliveries from "./deliveryPersonComponents/AssignedDeliveries.jsx";
import UpdateProfile, {
  DeliveryUpdateAction,
} from "./deliveryPersonComponents/UpdateProfile.jsx";
import ShowStationsDeliveryPersons from "./fuelStationComponents/ShowDeliveryPersons.jsx";
import SpeedDelivery from "./userComponents/SpeedDelivery.jsx";
import AssignToDeliveryPerson from "./fuelStationComponents/AssignToDeliveryPerson.jsx";
import AssignSpeedDelivery from "./fuelStationComponents/AssignSpeedDelivery.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },

  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />, // ✅ also protect admin routes
    children: [
      {
        path: "profile",
        element: <ShowProfile />,
      },
      {
        path: "profile/complete-profile",
        element: <AddDetailsAdmin />,
        action: AdminAction,
      },
      {
        path: "profile/payment/:id",
        element: <Payment />,
      },
    ],
  },

  {
    path: "/register",
    element: <Register />,
    action: RegisterAction,
    errorElement: <ErrorPage />,
  },

  {
    path: "/login",
    element: <Login />,
    action: LoginAction,
    errorElement: <ErrorPage />,
  },

  {
    path: "user",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/complete-profile",
        element: <AddDetails />,
        action: CompleteProfileAction,
      },
      {
        path: "profile/bookingFuel/:id",
        element: <BookingFuel />,
      },
      {
        path: "profile/bookingFuel/order-confirmed",
        element: <OrderConfirmed />,
      },
      {
        path: "profile/speedDelivery",
        element: <SpeedDelivery />,
      },
    ],
  },

  {
    path: "fuelStation",
    element: <FuelLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "profile",
        element: <FuelProfile />,
      },
      {
        path: "profile/complete-profile",
        element: <StationAddDetails />,
        action: CompleteFuelStationAction,
      },
      {
        path: "profile/updateStation/:id",
        element: <UpdateStation />,
        action: UpdateActionStation,
      },
      {
        path: "profile/assignDelivery/:id",
        element: <AssignDelivery />,
      },
      {
        path: "profile/assignToDeliveryPerson/:id",
        element: <AssignToDeliveryPerson />,
      },
      {
        path: "profile/assignSpeedOrder",
        element: <AssignSpeedDelivery />,
      },
    ],
  },
  {
    path: "deliveryPerson",
    element: <DeliveryLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "profile",
        element: <DeliveryDashboard />,
      },
      {
        path: "completeProfile",
        element: <CompleteProfile />,
        action: DeliveryRegisterAction,
      },
      {
        path: "updateProfile",
        element: <UpdateProfile />,
        action: DeliveryUpdateAction,
      },
      {
        path: "assigned",
        element: <AssignedDeliveries />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
