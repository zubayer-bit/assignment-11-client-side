import { createBrowserRouter } from "react-router";
import Root from "../LayOut/Root";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import RegisterEmploye from "../pages/Auth/RegisterEmploye.jsx/RegisterEmploye";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../LayOut/DashboardLayout";
import AddAsset from "../pages/DashBoard/AddAsset/AddAsset";
import HrRoute from "./HrRoute";
import AssetList from "../pages/DashBoard/AssetList/AssetList";
import EditAsset from "../pages/DashBoard/EditAsset/EditAsset";
import RequestAsset from "../pages/DashBoard/RequestAsset/RequestAsset";
import EmployeeRoutes from "./EmployeeRoutes";
import AllRequests from "../pages/DashBoard/AllRequests/AllRequests";

export const router = createBrowserRouter([
  // Auth Layout:
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        Component: Home,
      },
      //hr register:
      {
        path: "/hr-register",
        Component: Register,
      },

      //employe register:
      {
        path: "/employee-register",
        Component: RegisterEmploye,
      },
      // login
      {
        path: "/login",
        Component: Login,
      },
    ],
  },

  //hr dashboard layOut
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <HrRoute>
            <AssetList></AssetList>
          </HrRoute>
        ),
      },
      {
        path: "add-asset",
        element: (
          <HrRoute>
            <AddAsset></AddAsset>
          </HrRoute>
        ),
      },
      // asset edit route:
      {
        path: "assets/edit/:id",
        element: (
          <HrRoute>
            <EditAsset></EditAsset>
          </HrRoute>
        ),
      },

      //all request route:
      {
        path: "all-requests",
        element:
        <HrRoute>
        <AllRequests></AllRequests>
        </HrRoute>
      },




      //employee routes:
      {
        path: "request-asset",
        element:
        <EmployeeRoutes>
          <RequestAsset></RequestAsset>
        </EmployeeRoutes>
      }
    ],
  },

  //employee dashboard layOut:
  // {
  //   path: "/employeeDashboard",
  //   element: (
  //     <PrivateRoute>
  //       <DashboardLayout></DashboardLayout>
  //     </PrivateRoute>
  //   ),
  //   children: [
  //     {
  //       index: true,
  //       // element: ,
  //     },
  //     {
  //       path: "request-asset",
  //       element: <RequestAsset></RequestAsset>,
  //     },
  //     {
  //       path: "my-team",
  //       // element: <MyTeam />,
  //     },
  //     {
  //       path: "profile",
  //       // element: <Profile />,
  //     },
  //   ],
  // },
]);
