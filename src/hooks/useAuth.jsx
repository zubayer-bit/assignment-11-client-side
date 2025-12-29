import React, { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAuth = () => {
    //data receive from AuthProvider using useContext:
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuth;
