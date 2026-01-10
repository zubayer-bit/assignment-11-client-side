import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Register = () => {
  //handleSubmit: form submit korar jonno ei method use kora hoy...atar moddhe amra "function ta set kore rakhbo" ja form submit korar por call hobe...and value gulu dibe...
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //data receive from AuthProvider(useAuth)
  const { registerUser, updateUserProfile, emailVarification, logOut, user } =
    useAuth();

  const [error, setError] = useState("");
  // const [success, setSuccess] = useState(false);

  const axios = useAxios(); //---->aita dea register ar ar data "post" korbo

  //    //location:
  const location = useLocation();
  //  //navigate:
  const navigate = useNavigate();

  //function declare:
  const handleRegistration = (data) => {
    // const profileImage = data.profileImage;
    // delete data.company;
    // delete data.photo;
    // console.log("after register:", data);
    // console.log("after register:", profileImage);

    //1:company logo image process:
    const companyLogos = data.companyLogo[0];
    // new
    // const profileImage = data.profileImage[0];

    //Registration function:
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        const registeredUser = result.user;

        //new---start
        //           const formData1 = new FormData();
        // formData1.append("image", profileImage);

        // // /send the photo to store and get the url
        // const profileImage_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
        //   import.meta.env.VITE_image_host_KEY
        // }`;

        //  //image to photo Url link---------4: ()
        // const resProfile=  axios.post(profileImage_API_URL, formData1).then(res =>{
        //    console.log("after profileImage upload", res.data.data.url);

        //   // const profileImage = res.data.data.url;
        //   return resProfile;
        // })

        //new---end

        //2:company logo image process: store the image in "form" data
        const formData = new FormData();
        formData.append("image", companyLogos);

        //image to photo Url link---------3: akhn "axios" use kore "imgBB" to amr img ta store korbo...then "res" ar moddhe oi img ar live-link(url) pabo
        //send the photo to store and get the url
        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_image_host_KEY
        }`;

        //image to photo Url link---------4: ()
        axios.post(image_API_URL, formData).then((res) => {
          // ai "res" ar moddhe img ar "url-link" chole asbe
          console.log("after image upload", res.data.data.url);

          const companyLogo = res.data.data.url;

          //   "hr" ar data "userCollection" aa "post" kora holo.."useAxios" dea..jwt token server aa make korbo----(start)
          const userInfo = {
            email: data.email,
            name: data.name,
            companyName: data.companyName,
            companyLogo: companyLogo,
            profileImage: user?.photoURL || null,
            dateOfBirth: data.dateOfBirth,
          };
          //then ai khan jokhon photo peye jacci,ai khan theke "user" ar data "userCollection" ar moddhe post korbo:
          axios.post("/users", userInfo).then((res) => {
            //data jodi post hoa tahole "insertedId" paoa jai
            if (res.data.insertedId) {
              console.log("user created in data base");
            }
          });

          //ai khane img peye geci,tai "updateUserProfile ar code ai khane set korlam":
          const userProfile = {
            displayName: data.name,
            photoURL: companyLogo,
          };

          //name,photo url ar --->object ke send kore dilam:
          //image to photo Url link---------6(5 no AuthProvider ar moddhe):
          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile update done");
            })
            .catch((error) => console.log(error));
        });

        //sob kicu complete hole then home-page aa chole jabe:
        navigate(location.state || "/");

        emailVarification(registeredUser)
          .then(() => {
            logOut();
            Swal.fire(
              "Verification email sent! Please verify your email before login."
            );
            reset();
            navigate("/");
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Failed to send verification email");
          });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  return (
    // <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-15 p-3">

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-15 p-3"
    >
      <h3 className="text-center text-2xl font-bold">
        Welcome to{" "}
        <span className="text-2xl font-bold">
          Asset<span className="text-secondary">Verse</span>
        </span>
      </h3>
      <p className="text-center text-2xl font-bold">Please Register</p>
      <form onSubmit={handleSubmit(handleRegistration)} className="card-body">
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
            className="input"
            placeholder="name"
          />

          {/* Error message */}
          {errors.name && (
            <span className="text-red-600">{errors.name.message}</span>
          )}
          {/*Company name */}
          <label className="label">Company name</label>
          <input
            type="text"
            {...register("companyName", {
              required: "Company name is required",
              minLength: {
                value: 3,
                message: "Company name must be at least 3 characters long",
              },
            })}
            className="input"
            placeholder="Company name"
          />

          {/* Error message */}
          {errors.companyName && (
            <span className="text-red-600">{errors.companyName.message}</span>
          )}

          {/* company Logo */}
          <label className="label">Company logo</label>
          <input
            type="file"
            {...register("companyLogo", { required: true })}
            className="file-input file-input-info "
            placeholder="Company logo"
          />

          {/* error set korlam */}
          {errors.companyLogo?.type === "required" && (
            <span className="text-red-600">Company logo is required</span>
          )}

          {/*profileImage */}

          {/* <label className="label">Profile Image</label>
          <input
            type="text"
            {...register("profileImage", { required: true })}
            className="input"
            placeholder="Profile Image URL"
          />

          {errors.profileImage && (
            <span className="text-red-600">Profile image is required</span>
          )} */}

          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {/* required,minLength,maxLength ai gulu hooce "type" ai type use kore amra condition set korte parbo*/}
          {/* error set korlam */}
          {errors.email?.type === "required" && (
            <span className="text-red-600">Email is required</span>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            })}
            className="input"
            placeholder="Password"
          />

          {/* error set korlam */}
          {errors.password?.type === "required" && (
            <span className="text-red-600">Password is required</span>
          )}

          {errors.password?.type === "minLength" && (
            <span className="text-red-600">
              Password must be atleast 6 character
            </span>
          )}

          {errors.password?.type === "pattern" && (
            <span className="text-red-600">
              Password must be at least 6 characters long and include one
              uppercase letter, one lowercase letter, one number, and one
              special symbol (@$!%*?&).
            </span>
          )}

          {/* Date of Birth */}
          <label className="label">Date of Birth</label>
          <input
            type="date"
            {...register("dateOfBirth", {
              required: "Date of Birth is required",
            })}
            className="input"
            max={new Date().toISOString().split("T")[0]}
          />

          {/* Error message */}
          {errors.dateOfBirth && (
            <span className="text-red-600">{errors.dateOfBirth.message}</span>
          )}

          {/* forgot password */}
          {/* <div>
            <a className="link link-hover">Forgot password?</a>
          </div> */}

          {/* button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary mt-4 w-full"
          >
            Register
          </motion.button>
        </fieldset>

        <p className="text-center">
          Already have an account?{" "}
          <span className="text-primary font-medium underline">
            <Link state={location.state} to={"/login"}>
              Login
            </Link>
          </span>
        </p>

        {/* Error */}
        {error && <p className="text-error mt-2 text-center">{error}</p>}
      </form>
    </motion.div>
  );
};

export default Register;
