import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";


const RegisterSelect = () => {
  const location = useLocation();

  return (
     <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-4xl w-full p-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          Join <span className="text-primary">Asset</span>
          <span className="text-secondary">Verse</span> As
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* HR Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="card bg-base-100 shadow-xl"
          >
            <div className="card-body text-center">
              <h3 className="text-2xl font-semibold text-primary">
                HR Manager
              </h3>
              <p className="text-sm opacity-80 mt-2">
                Manage company assets, employees, and requests efficiently.
              </p>
              <Link
                to="/hr-register"
                state={location.state}
                className="btn btn-primary mt-6 w-full"
              >
                Join as HR
              </Link>
            </div>
          </motion.div>

          {/* Employee Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="card bg-base-100 shadow-xl"
          >
            <div className="card-body text-center">
              <h3 className="text-2xl font-semibold text-secondary">
                Employee
              </h3>
              <p className="text-sm opacity-80 mt-2">
                Request assets and manage your assigned equipment.
              </p>
              <Link
                to="/employee-register"
                state={location.state}
                className="btn btn-outline btn-secondary mt-6 w-full"
              >
                Join as Employee
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSelect;
