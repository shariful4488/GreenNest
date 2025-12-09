import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Authlayout from "../layouts/Authlayout";
import Plants from "../pages/Plants";
import MyProfile from "../pages/MyProfile";
import PlantDetails from "../pages/PlantDetails";
import PrivateRoute from "../provider/PrivateRoute";
import ForgetPassword from "../pages/ForgetPassword";
import Loading from "../components/Loading";
import AddService from "../pages/AddService";
import MyServices from "../pages/MyServices";
import UpdateService from "../pages/UpdateService";
import MyOrder from "../pages/MyOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "plants", element: <Plants />, hydrateFallbackElement: <Loading /> },
      {
        path: "plantDetails/:plantId",
        element: (
          <PrivateRoute>
            <PlantDetails />
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading />,
      },
      { path: "profile", element: <MyProfile /> },

      // ⭐ Move these inside HomeLayout
      {
        path: "add-services",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "my-services",
        element: (
          <PrivateRoute>
            <MyServices />
          </PrivateRoute>
        ),
      },
      {
        path: "update-service/:id",
        element: (
          <PrivateRoute>
            <UpdateService />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrder />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Auth Routes
  {
    path: "/auth",
    element: <Authlayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword /> },
    ],
  },

  // 404
  {
    path: "*",
    element: <h1 className="text-center text-4xl mt-20">404 | Page Not Found</h1>,
  },
]);

export default router;
