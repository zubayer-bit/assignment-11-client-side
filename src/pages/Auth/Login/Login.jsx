import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import { motion } from "framer-motion";


const Login = () => {
  //react-hook:
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //data receive from authProvider(using useAuth hook)---
  const { loginUser } = useAuth();

  //axios:
  const axios = useAxios();

  //location:
  const location = useLocation();
  // console.log('after login',location); //out:after login {pathname: '/login', search: '', hash: '', state: '/rider', key: 'ji5kg0ss'}

  const navigate = useNavigate();

  //function declare:
  const handleLogin = (data) => {
    console.log("data after login", data); //out:data after login {email: 'sazzwcad987a@gmail.com', password: 'aS4%fgfgerre'}

    //"form" ar email,password ke use kore user "login" korbo:----(firebase)-----(start)
    loginUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        // console.log("data after firebase login", loggedUser); //out:data after firebase login _UserImpl{providerId: 'firebase', proactiveRefresh: ProactiveRefresh, reloadUserInfo: {…}, reloadListener: null, uid: 'scp0ZfxV43XEEggF9muk68bqpY83',…}

        //--------jwt:1 (client-side)----(start)
        if (loggedUser.email) {
          axios.post("/jwt", { email: loggedUser.email }).then((res) => {
            // console.log("after login jwt token", res.data.token); //out: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhbmdsYWRlc2hpYmQ3ODlAZ21haWwuY29tIiwiaWF0IjoxNzY2NjgxMDQ5LCJleHAiOjE3NjY3Njc0NDl9.x_U2gxvaFKV8kVV4uP-SZ_wQgT1_Dg-EpGT1HdDb6x8

            localStorage.setItem("access-token", res.data.token);
          });
        }
        //  else {
        //   localStorage.removeItem("access-token");   //--------ai kaj ta logOut ar moddhe kora hoa ce
        // }
        //--------jwt:1 (client-side)----(end)

        //jokhon login hoa jabe,tokhon navigate hoa jabe:
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log("error in login", error.massage);
      });
    //"form" ar email,password ke use kore user "login" korbo:----(firebase)-----(end)
  };
  return (
   


    <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl p-3 mt-15"
>



      <h3 className="text-center text-3xl font-bold">
    Welcome <span className="text-primary">Back</span>
  </h3>

  <p className="text-center text-secondary">
    Please Login
  </p>
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />

          {/* error email */}
          {errors.email?.type === "required" && (
            <span className="text-red-600">Email is required</span>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />

          {/* error password */}
          {errors.password?.type === "required" && (
            <span className="text-red-600">Password must be required</span>
          )}

          {errors.password?.type === "minLength" && (
            <span className="text-red-600">
              Password must be 6 character or longer
            </span>
          )}

          {/* <div>
            <a className="link link-hover">Forgot password?</a>
          </div> */}
          
           <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary mt-4 w-full"
      >
        Login
      </motion.button>
        </fieldset>


         <p className="text-center mt-4">
      New to{" "}
      <span className="font-semibold text-primary">
        Asset
      </span>
      <span className="font-semibold text-secondary">
        Verse
      </span>
      ?{" "}
      <Link
        to="/select-register-page"
        state={location.state}
        className="text-primary font-medium underline"
      >
        Register
      </Link>
    </p>
      </form>

   







</motion.div>
  
  );
};

export default Login;
