import React, { useEffect } from "react";
import { Outlet, useMatches, useNavigation } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const Root = () => {
  const matches = useMatches();
  const navigation = useNavigation();

  const showLoading = navigation.state === "loading";

  // Tab title
  useEffect(() => {
    const lastMatch = matches.at(-1);
    const routeTitle = lastMatch?.handle?.title;
    document.title = routeTitle || "";
  }, [matches]);

  return (
    <div className="relative">
      <Navbar></Navbar>

      {/* Page-to-page loading spinner */}
      {showLoading && (
        <div className="fixed  w-full flex justify-center items-center bg-white/80 backdrop-blur-sm py-3 z-50 transition-opacity duration-300">
          <span className="loading loading-spinner text-green-500 mr-2"></span>
          <span className="text-green-800 font-medium">Loading...</span>
        </div>
      )}

      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Root;
