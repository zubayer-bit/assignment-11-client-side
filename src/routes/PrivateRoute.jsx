import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  ////data receive from authProvider(using useAuth hook)---
  const { user, loading} = useAuth();
  
  //location nilam:
  const location = useLocation();
  // console.log("private route",location); //out:{pathname: '/rider', search: '', hash: '', state: null, key: 'hu2qhbp6'}

  //jokhon user ar value thakbe na,tokhon "loading" kaj korbe
  if(loading){
    //mane jodi loading thake tahole akti loading return hobe...
    return <div className="text-center">
        {/* <span className="loading loading-spinner text-success"></span> */}
        <span className="loading loading-spinner text-blue-700 mr-2"></span>
    </div>
  }


  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    // return <Navigate to="/login" state={{ from: location }} replace />;
    //or
    return <Navigate to="/login" state={location.pathname} replace />;
  }
  return children;
};

export default PrivateRoute;
