import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAuthSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const MyEmployees = () => {
  const axiosSecure = useAxiosSecure();

  // employeeAffiliations collection theke employees
  const {
    data: employees = [],
    isLoading: employeesLoading,
    refetch: employeRefetch,
  } = useQuery({
    queryKey: ["myEmployees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/hr/my-employees");
      return res.data;
    },
  });

  // HR package info
  const {
    data: pkg = {},
    isLoading: pkgLoading,
    refetch: pkgRefetch,
  } = useQuery({
    queryKey: ["hrPackage"],
    queryFn: async () => {
      const res = await axiosSecure.get("/hr/package-info");
      return res.data;
    },
  });

  // Remove employee (beginner friendly)
  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Employee will be removed from your team",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Removing...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const res = await axiosSecure.patch(`/hr/remove-employee/${id}`);

        pkgRefetch();
        employeRefetch();

        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message || "Something went wrong",
        });
      }
    }
  };

  // Page loading state
  if (employeesLoading || pkgLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-4">
        My Employees ({pkg?.currentEmployees}/{pkg?.packageLimit} employees used)
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-secondary">
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Assets</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <motion.tr
                  key={emp._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td>
                    <img
                      src={emp.employeePhoto || "/avatar.png"}
                      className="w-10 h-10 rounded-full"
                      alt="employee"
                    />
                  </td>
                  <td className="text-primary">{emp.employeeName}</td>
                  <td className="text-secondary">{emp.employeeEmail}</td>
                  <td className="text-primary">
                    {new Date(emp.affiliationDate).toLocaleDateString()}
                  </td>
                  <td className="text-secondary">{emp.assetCount}</td>
                  <td>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemove(emp._id)}
                      className="btn btn-xs btn-error "
                    >
                      Remove
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-secondary">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MyEmployees;
