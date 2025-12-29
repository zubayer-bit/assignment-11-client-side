import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

//1:create context api form react:
export const AuthContext = createContext();

//google dea login korar provider:
export const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  console.log("Auth provider user:", user); //out:Auth provider user: _UserImpl{providerId: 'firebase', proactiveRefresh: ProactiveRefresh, reloadUserInfo: {…}, reloadListener: null, uid: 'IK8x2lmaK4bjZCmQ35TnSB6JEFU2',…}



  //-----------------(start)-----------set loading jokhon user ar value thake na (reload dile)
  const [loading, setLoading] = useState(true);
  // console.log('loading state:',loading);
  //-----------------(end)-----------set loading jokhon user ar value thake na (reload dile)

  //---------------------(start)-----------------------function for registration command,value:
  const registerUser = (email, password) => {
    // setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //---------------------(end)-----------------------function for registration command,value:

  //-----------------(start)--------------------ovserber set korlam,jeno data gulu save thake authProvider er moddhe:
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
   

      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  //-----------------(end)--------------------ovserber set korlam,jeno data gulu save thake authProvider er moddhe:

  //-------------------(start)--------------login korar command, value:
  const loginUser = (email, password) => {
    // setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //-------------------(end)--------------login korar command, value:

  //---------------(start)---------------google login ar command,value:
  const googleLogin = () => {
    // setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //-----------------(start)------------------signOut ar command, value:
  const logOut = () => {
    setLoading(true);
    // JWT remove
  localStorage.removeItem("access-token");
    
    return signOut(auth);
  };

  //-----------------(end)------------------signOut ar command, value:

  //--------------(start)--------------sendEmailVarification ar command, value:
  const emailVarification = (currentUser) => {
    return sendEmailVerification(currentUser);
  };
  //--------------(end)--------------sendEmailVarification ar command, value:

  //-------------------------(start)----------forgate password ar command, value:
  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  //-------------------------(end)----------forgate password ar command, value:

  //--------------(start)-----------update profile(name,photo) ar command, value:
  const updateUserProfile = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };
  //--------------(end)-----------update profile(name,photo) ar command, value:

  const authData = {
    user,
    setUser,
    registerUser,
    loginUser,
    googleLogin,
    emailVarification,
    forgetPassword,
    updateUserProfile,
    loading,
    setLoading,
    logOut,
  };
  return (
    <div>
      {/* step:2 */}

      <AuthContext value={authData}>{children}</AuthContext>
    </div>
  );
};

export default AuthProvider;
