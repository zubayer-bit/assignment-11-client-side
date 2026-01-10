import React from "react";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const PackagesSection = () => {
  const axios = useAxios();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axios.get("/packages/homePage");
      return res.data;
    },
  });


  if (isLoading) {
    return (
      <div className="flex justify-center text-secondary py-10">
       <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
         
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Pricing Plans
          </h2>
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto">
            Choose a plan that fits your company size and asset management
            needs.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        
        >
          {packages.map((pkg,index) => (
            <motion.div
              key={pkg._id}
               initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="card-body flex flex-col flex-1">
                {/* Package Name */}
                <h3 className="text-2xl font-bold text-center mb-2 text-blue-800">
                  {pkg.name}
                </h3>

                {/* Price */}
                <p className="text-center text-blue-700 text-4xl font-extrabold my-4">
                  ${pkg.price}
                  <span className="text-base font-medium text-blue-700">
                    /month
                  </span>
                </p>

                {/* Employee Limit */}
                <div className="flex justify-center items-center gap-2 mb-6 text-gray-600">
                  <FaUsers className="text-primary" />
                  <span className="text-blue-600">
                    Up to <strong>{pkg.employeeLimit}</strong> employees
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 flex-1  ">
                  {pkg.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center  gap-2 text-secondary"
                    >
                      <FaCheckCircle className="text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Optional Text */}
                <p className="text-center text-sm text-cyan-600 mt-6">
                  Upgrade from HR dashboard
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesSection;
