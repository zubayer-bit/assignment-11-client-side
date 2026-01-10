import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useRole from "../../hooks/useRole";

const DashboardError = () => {
      // role = "employee" | "hr"
  const { role } = useRole();
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Error Code */}
      <motion.h1
        className="text-6xl font-extrabold mb-4 text-error"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      {/* Heading */}
      <motion.h2
        className="text-2xl md:text-3xl font-semibold mb-2 text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Page Not Found
      </motion.h2>

      {/* Description */}
      <motion.p
        className="mb-6 text-center text-secondary max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Oops! The page you are looking for does not exist in your Dashboard.
      </motion.p>

      {/* Go to Dashboard Link */}
      {
        role === "hr" && 
         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-md transition-all"
        >
          Go to Dashboard
        </Link>
      </motion.div>
      }
      {
        role === "employee" && 
         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/dashboard/employeeAssetList"
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-md transition-all"
        >
          Go to Dashboard
        </Link>
      </motion.div>
      }
     
    </motion.div>
  );
};

export default DashboardError;
