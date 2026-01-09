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

  // Motion variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
  };

  if (isLoading) {
    return <div className="flex justify-center text-secondary py-10">
      <span className="loading loading-dots loading-sm "></span>
    </div>;
  }

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 text-primary">Pricing Plans</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-secondary">
            Choose a plan that fits your company size and asset management
            needs.
          </p>
        </div>

        {/* Packages Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg._id}
              variants={card}
              whileHover="hover"
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
                <ul className="space-y-3 flex-1">
                  {pkg.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-blue-500"
                    >
                      <FaCheckCircle className="text-success" />
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
