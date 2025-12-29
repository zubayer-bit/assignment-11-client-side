import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const RegisterEmploye = () => {
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
  const [success, setSuccess] = useState(false);

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
    console.log("after employee register:", data);

    //1:profileImage process:
    
    // const profileImage = data.profileImage[0];
    

    //Registration function:
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        //  const registeredUser = result.user;


        //2:profileImage process: store the image in "form" data
        // const formData = new FormData();
        // formData.append("image", profileImage);

        //image to photo Url link---------3: akhn "axios" use kore "imgBB" to amr img ta store korbo...then "res" ar moddhe oi img ar live-link(url) pabo
        //send the photo to store and get the url
        // const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
        //   import.meta.env.VITE_image_host_KEY
        // }`;

        //image to photo Url link---------4: ()
        // axios.post(image_API_URL, formData).then((res) => {..
        //  // ai "res" ar moddhe img ar "url-link" chole asbe
          // console.log("after employee image upload", res.data.data.url);

          // const profileImage = res.data.data.url;
        //  });
         

          //   "employee" ar data "userCollection" aa "post" kora holo.."useAxios" dea..jwt token server aa make korbo----(start)
          const userInfo = {
            email: data.email,
            name: data.name,
            
            profileImage: user?.photoURL || null,
          
            dateOfBirth: data.dateOfBirth,
          };
          //then ai khan jokhon photo peye jacci,ai khan theke "user" ar data "userCollection" ar moddhe post korbo:
          axios.post("/users/employee", userInfo).then((res) => {
            //data jodi post hoa tahole "insertedId" paoa jai
            if (res.data.insertedId) {
              console.log("user created in data base");
            }
          });

          //ai khane img peye geci,tai "updateUserProfile ar code ai khane set korlam":
          const userProfile = {
            displayName: data.name,
            photoURL: user?.photoURL || null,
          };

          //name,photo url ar --->object ke send kore dilam:
          //image to photo Url link---------6(5 no AuthProvider ar moddhe):
          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile update done");
            })
            .catch((error) => console.log(error));
        

        //sob kicu complete hole then home-page aa chole jabe:
        // navigate(location.state || "/");

          //       emailVarification(registeredUser)
          // .then(() => {
          //   logOut();
          //   Swal.fire(
          //     "Verification email sent! Please verify your email before login."
          //   );
          //   reset();
          //   navigate("/");
          // })
          // .catch((error) => {
          //   console.error(error);
          //   Swal.fire("Failed to send verification email");
          // });
      })
      .catch((error) => {
        console.log(error);
      });
  };
    return (
         <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-15 p-3">
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
       

          {/* Profile Image */}
          {/* <label className="label">Profile Image</label>
          <input
            type="file"
            {...register("profileImage",{ required: true })}
            className="file-input file-input-info "
            placeholder="Profile Image"
          />

         
          {errors.profileImage?.type === "required" && (
            <span className="text-red-600">Profile Image is required</span>
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
          <button className="btn btn-primary mt-4">Register</button>
        </fieldset>

        <p>
          Already have an account?{" "}
          <span className="text-blue-600 font-medium underline">
            <Link state={location.state} to={"/login"}>
              Login
            </Link>
          </span>
        </p>
      </form>

      {/* google button */}
      {/* <SocialLogin></SocialLogin> */}
    </div>
    );
};

export default RegisterEmploye;