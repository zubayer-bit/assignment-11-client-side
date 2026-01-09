import React, { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAuthSecure";
import { motion } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";


const PaymentCancelled = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  // duplicate call prevent
  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (!sessionId) return;
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    //  payment failed inform server
    axiosSecure.patch(`/payment-failed?session_id=${sessionId}`)
      .then(res => {
        console.log("Payment marked as failed:", res.data);
      })
      .catch(err => {
        console.error("Failed update error:", err);
      });

  }, [sessionId, axiosSecure]);

  return (
     <div className="min-h-[60vh] flex items-center justify-center px-3">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card max-w-md w-full bg-base-100 shadow-xl border border-base-200 rounded-2xl"
      >
        <div className="card-body items-center text-center space-y-3">

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex items-center justify-center"
          >
            <FaTimesCircle className="text-5xl text-error" />
          </motion.div>

          <h1 className="text-2xl font-bold text-error">
            Payment Cancelled
          </h1>

          <p className="text-secondary font-semibold">
            Your payment was not completed.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm opacity-80"
          >
            Please try again to continue your upgrade.
          </motion.div>

          <div className="divider my-1"></div>

          <Link to="/dashboard/upgrade-package">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary rounded-2xl"
            >
              Try Again
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancelled;
