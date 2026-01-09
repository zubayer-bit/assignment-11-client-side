import React from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../../../hooks/useAxios';
import useAxiosSecure from '../../../hooks/useAuthSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { motion } from "framer-motion";


const HRProfile = () => {
     const { register, handleSubmit, formState: {errors} } = useForm();
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();

  const { data,
     isLoading,
      refetch } = useQuery({
    queryKey: ["hrProfile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/hr/profile");
      return res.data;
    },
  });

  const user = data?.user;


  const handleUpdate = async (data) => {
    const userInfo = {
      name: data.name,
      dateOfBirth: data.dateOfBirth,
    };

    // image optional
    if (data.profileImage?.length > 0) {
      const formData = new FormData();
      formData.append("image", data.profileImage[0]);

      try {
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_KEY}`,
          formData
        );
        userInfo.profileImage = imgRes.data.data.url;
      } catch {
        Swal.fire("Error", "Image upload failed", "error");
        return;
      }
    }

    const res = await axiosSecure.patch("/update/hrProfile", userInfo);

    if (res.data.result.modifiedCount > 0) {
      refetch();
      Swal.fire("Success", "Profile updated", "success");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center h-[70vh] items-center">
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
       <div className="max-w-3xl mx-auto p-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-primary text-center mb-8"
      >
        HR Profile
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-base-100 shadow rounded-xl p-6 border-2  border-b-fuchsia-600 border-r-cyan-500 border-t-pink-600 border-l-yellow-500"
      >
        <img
          src={user?.profileImage || "/avatar.png"}
          className="w-28 h-28 rounded-full mx-auto border-4 border-primary mb-4"
        />
        <p className='text-center text-blue-700 font-semibold'>Profile Image</p>

        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          {/* name */}
              <div>
                <label className="label">
                  <span className="label-text text-secondary">Name(Hr)</span>
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

           {/* Company Name */}
              <div>
                <label className="label text-secondary">
                  Company Name (Read Only)
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full bg-base-200"
                  value={user?.companyName}
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

          {/* currentEmployees */}
              <div>
                <label className="label text-secondary">
                  Current Employees (Read Only)
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-base-200"
                  value={user?.currentEmployees}
                  readOnly
                />
              </div>

          {/* packageLimit */}
              <div>
                <label className="label text-secondary">
                  Package Limit (Read Only)
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-base-200"
                  value={user?.packageLimit}
                  readOnly
                />
              </div>

          {/* subscription */}
              <div>
                <label className="label text-secondary">
                  Subscription (Read Only)
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-base-200"
                  value={user?.subscription}
                  readOnly
                />
              </div>

          {/* createdAt */}
              <div>
                <label className="label text-secondary">
                  CreatedAt (Read Only)
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-base-200"
                  value={new Date(user?.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  })}
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

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary w-full"
          >
            Update Profile
          </motion.button>
        </form>
      </motion.div>

     
    </div>

    );
};

export default HRProfile;