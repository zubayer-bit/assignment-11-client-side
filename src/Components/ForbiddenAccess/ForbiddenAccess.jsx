import React from 'react';
import { motion } from "framer-motion";
import { FaBan } from "react-icons/fa";
import { Link } from 'react-router';

const ForbiddenAccess = () => {
    return (
         <div className="h-screen flex justify-center items-center bg-gray-100">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="text-center p-8 bg-white shadow-xl rounded-2xl border"
      >
        <motion.div
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.7 }}
          className="text-red-600 text-6xl mx-auto mb-4"
        >
          <FaBan />
        </motion.div>

        <h1 className="text-3xl font-bold mb-2 text-red-600">
          Access Forbidden
        </h1>

        <p className="text-gray-600 text-lg">
          You do not have permission to view this page.
        </p>
         {/* Go Back Home Button */}
        
        <Link to="/" className="btn mt-3 bg-blue-600 text-white hover:bg-blue-700">
          Go Back Home
        </Link>
      </motion.div>
    </div>
    );
};

export default ForbiddenAccess;