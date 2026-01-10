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
import Error from "../Components/Error/Error";
import PageLoad from "../PageLoad/PageLoad";
import DashboardError from "../Components/DashboardError/DashboardError";

export const router = createBrowserRouter([
  // Auth Layout:
  {
    path: "/",
    Component: Root,
    hydrateFallbackElement: <PageLoad></PageLoad>,
    children: [
      {
        // path: "/",
        index: true,
        Component: Home,
        handle: { title: "Home | AssetVerse" },
      },
      //select-register-page:
      {
        path: "/select-register-page",
        Component: RegisterSelect,
        handle: { title: "Select Register | AssetVerse" },
      },
      //hr register:
      {
        path: "/hr-register",
        Component: Register,
        handle: { title: "HR Register | AssetVerse" },
      },

      //employe register:
      {
        path: "/employee-register",
        Component: RegisterEmploye,
        handle: { title: "Employee Register | AssetVerse" },
      },
      // login
      {
        path: "/login",
        Component: Login,
        handle: { title: "Login | AssetVerse" },
      },
      // Catch-all 404 for Root/Layout
      {
        path: "*",
        element: <Error></Error>,
        handle: { title: "404 - Page Not Found | AssetVerse" },
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
    hydrateFallbackElement: <PageLoad></PageLoad>,
    children: [
      {
        index: true,
        element: (
          <HrRoute>
            <AssetList></AssetList>
          </HrRoute>
        ),
        handle: { title: "Asset List | Dashboard | AssetVerse" },
      },
      {
        path: "add-asset",
        element: (
          <HrRoute>
            <AddAsset></AddAsset>
          </HrRoute>
        ),
        handle: { title: "Add Asset | Dashboard | AssetVerse" },
      },
      // asset edit route:
      {
        path: "assets/edit/:id",
        element: (
          <HrRoute>
            <EditAsset></EditAsset>
          </HrRoute>
        ),
        handle: { title: "Edit Asset | Dashboard | AssetVerse" },
      },

      //all request route:
      {
        path: "all-requests",
        element: (
          <HrRoute>
            <AllRequests></AllRequests>
          </HrRoute>
        ),
        handle: { title: "All Requests | Dashboard | AssetVerse" } 
      },

      //employee list
      {
        path: "employee-list",
        element: (
          <HrRoute>
            <MyEmployees></MyEmployees>
          </HrRoute>
        ),
        handle: { title: "Employee List | Dashboard | AssetVerse" }
      },
      //upgrade-package (hr)
      {
        path: "upgrade-package",
        element: (
          <HrRoute>
            <HrPackageUpgrade></HrPackageUpgrade>
          </HrRoute>
        ),
        handle: { title: "Upgrade Package | Dashboard | AssetVerse" }
      },

      //payment success hole ai page aa auto chole jabe
      {
        path: "payment-success",
        // Component: PaymentSuccess,
        element: (
          <HrRoute>
            <PaymentSuccess></PaymentSuccess>
          </HrRoute>
        ),
         handle: { title: "Payment Success | Dashboard | AssetVerse" }
      },
      // payment cencelled hole,ai page aa auto chole jabe:
      {
        path: "payment-cancelled",
        // Component: PaymentCancelled,
        element: (
          <HrRoute>
            <PaymentCancelled></PaymentCancelled>
          </HrRoute>
        ),
        handle: { title: "Payment Cancelled | Dashboard | AssetVerse" }
      },

      // hr profile page
      {
        path: "hrProfile",
        element: (
          <HrRoute>
            <HRProfile></HRProfile>
          </HrRoute>
        ),
         handle: { title: "HR Profile | Dashboard | AssetVerse" } 
      },

      //employee routes:
      {
        path: "request-asset",
        element: (
          <EmployeeRoutes>
            <RequestAsset></RequestAsset>
          </EmployeeRoutes>
        ),
        handle: { title: "Request Asset | Dashboard | AssetVerse" }
      },
      {
        path: "employeeAssetList",
        element: (
          <EmployeeRoutes>
            <EmployeeAssetList></EmployeeAssetList>
          </EmployeeRoutes>
        ),
        handle: { title: "My Assets | Dashboard | AssetVerse" }
      },
      {
        path: "my-team",
        element: (
          <EmployeeRoutes>
            <MyTeam></MyTeam>
          </EmployeeRoutes>
        ),
        handle: { title: "My Team | Dashboard | AssetVerse" } ,
      },
      {
        path: "profile",
        element: (
          <EmployeeRoutes>
            <EmployeeProfile></EmployeeProfile>
          </EmployeeRoutes>
        ),
         handle: { title: "Profile | Dashboard | AssetVerse" } 
      },
      // Catch-all 404 for Dashboard
      {
        path: "*",
        element: <DashboardError></DashboardError>,
        handle: { title: "404 - Dashboard Page Not Found | AssetVerse" }
      },
    ],
  },
]);
