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
import MyEmployees from "../pages/DashBoard/MyEmployees/MyEmployees";
import EmployeeAssetList from "../pages/DashBoard/EmployeeAssetList/EmployeeAssetList";
import MyTeam from "../pages/DashBoard/MyTeam/MyTeam";
import EmployeeProfile from "../pages/DashBoard/EmployeeProfile/EmployeeProfile";
import HRProfile from "../pages/DashBoard/HRProfile/HRProfile";
import HrPackageUpgrade from "../pages/DashBoard/HrPackageUpgrade/HrPackageUpgrade";
import PaymentSuccess from "../pages/DashBoard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/DashBoard/Payment/PaymentCancelled";
import RegisterSelect from "../pages/Auth/RegisterSelect/RegisterSelect";

export const router = createBrowserRouter([
  // Auth Layout:
  {
    path: "/",
    Component: Root,
    children: [
      {
        // path: "/",
        index: true,
        Component: Home,
      },
      //select-register-page:
      {
        path: "/select-register-page",
        Component: RegisterSelect,
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

      //employee list
       {
        path: "employee-list",
        element:
        <HrRoute>
        <MyEmployees></MyEmployees>
        </HrRoute>
      },
      //upgrade-package (hr)
       {
        path: "upgrade-package",
        element:
        <HrRoute>
        <HrPackageUpgrade></HrPackageUpgrade>
        </HrRoute>
      },

      //payment success hole ai page aa auto chole jabe
      {
        path: "payment-success",
        // Component: PaymentSuccess,
         element:
        <HrRoute>
        <PaymentSuccess></PaymentSuccess>
        </HrRoute>

      },
      // payment cencelled hole,ai page aa auto chole jabe:
      {
        path: "payment-cancelled",
        // Component: PaymentCancelled,
         element:
        <HrRoute>
        <PaymentCancelled></PaymentCancelled>
        </HrRoute>
      },

      // hr profile page
       {
        path: "hrProfile",
        element:
        <HrRoute>
        <HRProfile></HRProfile>
        </HrRoute>
      },




      //employee routes:
      {
        path: "request-asset",
        element:
        <EmployeeRoutes>
          <RequestAsset></RequestAsset>
        </EmployeeRoutes>
      },
      {
        path: "employeeAssetList",
        element:
        <EmployeeRoutes>
          <EmployeeAssetList></EmployeeAssetList>
        </EmployeeRoutes>
      },
      {
        path: "my-team",
        element:
        <EmployeeRoutes>
          <MyTeam></MyTeam>
        </EmployeeRoutes>
      },
      {
        path: "profile",
        element:
        <EmployeeRoutes>
          <EmployeeProfile></EmployeeProfile>
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
