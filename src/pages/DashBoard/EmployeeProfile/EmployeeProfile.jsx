import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAuthSecure";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";

const EmployeeProfile = () => {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const axios = useAxios();

  //data(user, affiliation) get korbo:
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/profile/employee");
      // console.log('employeedata:', res.data)

      return res.data;
    },
  });

  //data ar moddho theke 2ta data(user,affiliation-->company name) distructure kore nibo:
  const user = data?.user;
  // const companies = data?.companies || [];
  const affiliations = data?.affiliations || [];
  // console.log(companies);

  //new vabe image na dileo update hobe:
  const handleRegistration = async (data) => {
    const employeeName = data.name;
    const employeeDateOfBirth = data.dateOfBirth;

    const userInfo = {
      name: employeeName,
      dateOfBirth: employeeDateOfBirth,
    };

    // 1: new image selected
    if (data.profileImage && data.profileImage.length > 0) {
      const imageFile = data.profileImage[0];

      const formData = new FormData();
      formData.append("image", imageFile);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_KEY
      }`;

      try {
        const imgRes = await axios.post(image_API_URL, formData);
        const imageUrl = imgRes.data.data.url;

        userInfo.profileImage = imageUrl;
      } catch (error) {
        // console.log(error)
        Swal.fire({
          icon: "error",
          title: "Image upload failed",
        });
        return;
      }
    }

    // 2: update profile image na dileo hbe
    const res = await axiosSecure.patch(
      "/update/employeeProfileImage",
      userInfo
    );

    if (res.data.result.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  //jokhn data ar value thakbe na...tokhn "isLoading" active thakbe:
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!data || !user) {
    return (
      <p className="text-center text-secondary mt-10">Failed to load profile</p>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-primary text-center mb-8"
      >
        My Profile
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {/* LEFT: Profile Card */}

        {/* RIGHT: Profile Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 bg-base-100 border-2  border-b-fuchsia-600 border-r-cyan-500 border-t-pink-600 border-l-yellow-500 shadow rounded-xl p-6"
        >
          <img
            src={
              user?.profileImage || "https://i.ibb.co.com/b5MWMbcf/images.jpg"
            }
            className="w-28 h-28 rounded-full mx-auto border-4 border-primary mb-4"
          />
           <p className='text-center text-blue-700 font-semibold'>Profile Image</p>
          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
              {/* name */}
              <div>
                <label className="label">
                  <span className="label-text text-secondary">Name</span>
                </label>
               

                <input
                  type="text"
                  defaultValue={user?.name}
                  {...register("name", {
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters long",
                    },
                  })}
                  className="input w-full"
                  placeholder="name"
                />

                {/* Error message */}
                {errors.name && (
                  <span className="text-red-600">{errors.name.message}</span>
                )}
              </div>

              {/* email */}
              <div>
                <label className="label text-secondary">
                  Email (Read Only)
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-base-200"
                  value={user?.email}
                  readOnly
                />
              </div>

              {/* role */}
              <div>
                <label className="label text-secondary">
                  Position (Read Only)
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-base-200"
                  value={user?.role}
                  readOnly
                />
              </div>

              {/* Image */}
              <div>
                <label className="label">
                  <span className="label-text text-secondary">
                    Profile Image
                  </span>
                </label>
               

                <input
                  type="file"
                  {...register("profileImage")}
                  className="file-input file-input-info w-full"
                  placeholder="Profile Image"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="label text-secondary">Date of Birth</label>
                <input
                  type="date"
                  defaultValue={user?.dateOfBirth}
                  {...register("dateOfBirth")}
                  className="input w-full"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary mt-6 w-full"
            >
              Update Profile
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* COMPANY AFFILIATIONS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        
        className="mt-12"
      >
        <h3 className="text-xl font-semibold text-secondary mb-4">
          Company Affiliations: ({affiliations.length})
        </h3>

        {affiliations.length === 0 ? (
          <p className="text-secondary">No active company affiliations</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
            {affiliations.map((c, i) => (
               <motion.div
                           
                             whileHover={{ y: -6 }}
                             className="rounded-xl  bg-gradient-to-br from-indigo-50 via-white to-pink-50 shadow-md"
                           >
              <div
                key={i}
                className="border-2  border-lime-500 rounded-xl p-4 bg-base-100 shadow-sm"
              >
                <p className=" ">
                  <span className="text-amber-500 font-bold ">
                    Company Name:
                  </span>{" "}
                  <span className=" text-blue-500 font-semibold ">
                    {c.companyName}
                  </span>
                </p>

                <p className="text-sm ">
                  <span className="font-bold text-amber-500">
                    Affiliation Date:
                  </span>{" "}
                  <span className="font-semibold text-blue-500">
                    {c.affiliationDate &&
                      new Date(c.affiliationDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                  </span>
                </p>
              </div>
             </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EmployeeProfile;
