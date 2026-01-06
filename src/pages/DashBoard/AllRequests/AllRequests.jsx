import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAuthSecure';
import { motion } from "framer-motion";
import Swal from 'sweetalert2';


const AllRequests = () => {
    const axiosSecure = useAxiosSecure();

    //request asset ar data get kora holo...[hr get only his data][not others hr data]:
    const {data: allRequest=[], refetch,isLoading} =useQuery({
        queryKey: ["all-requests"],
        queryFn: async()=>{
            const res = await axiosSecure.get("/hr/asset-requests");
            return res.data;
        }
    })

    //status badge function:
    const getStatusBadge = (status) =>{
         if (status === "pending")
      return <span className="badge badge-warning badge-sm">Pending</span>;
    if (status === "approved")
      return <span className="badge badge-success badge-sm">Approved</span>;
    if (status === "rejected")
      return <span className="badge badge-error badge-sm">Rejected</span>;
    return null;
    }


    //approve handler::
  const handleApprove = async (request) => {
  const result = await Swal.fire({
    title: "Approve Asset Request?",
    text: "This will assign the asset to the employee.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Approve",
    confirmButtonColor: "#16a34a",
  });

 if (result.isConfirmed) {
  try {
    const res = await axiosSecure.patch(
      `/asset-requests/approve/${request._id}`
    );

    // Success check
    if (res.data.result?.modifiedCount > 0) {
      Swal.fire("Approved!", "Asset request approved successfully", "success");
      refetch(); // refresh table
    } else {
      // যদি server থেকে message আসে
      const msg = res.data.message || "Something went wrong";
      Swal.fire("Error!", msg, "error");
    }
  } catch (err) {
    console.error(err);
    // axios error থেকে server message handle
    const msg = err.response?.data?.message || "Server error. Try again.";
    Swal.fire("Error!", msg, "error");
  }
}

};

 /* =========================
     Reject Request
  ========================== */
const handleReject = async (request) => {
  const result = await Swal.fire({
    title: "Reject Asset Request?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Reject",
    confirmButtonColor: "#dc2626",
  });

  if (result.isConfirmed) {
    try {
      const res = await axiosSecure.patch(
        `/hr/asset-requests/reject/${request._id}`
      );

      if (res.data.result?.modifiedCount > 0) {
        Swal.fire("Rejected!", res.data.message, "success");
        refetch();
      } else {
        Swal.fire("Error!", res.data.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Server error. Try again.", "error");
    }
  }
};



  if (isLoading) {
    return  <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>;
  }


    return (
        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-3 sm:p-5 md:p-6"
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-5">
        Asset Requests
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-base-200 text-secondary">
            <tr>
              <th>Employee</th>
              <th>Asset</th>
              <th className="hidden md:table-cell">Request Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allRequest.map((request) => (
              <tr key={request._id}>
                {/* Employee */}
                <td>
                  <p className="font-medium text-primary">
                    {request.requesterName}
                  </p>
                  <p className="text-xs text-secondary">
                    {request.requesterEmail}
                  </p>
                </td>

                {/* Asset */}
                <td className="font-medium">{request.assetName}</td>

                {/* Date  */}
                <td className="hidden md:table-cell">
                  {new Date(request.requestDate).toLocaleDateString()}
                </td>

                {/* Status */}
                <td>{getStatusBadge(request.requestStatus)}</td>
                {/* <td>{request.requestStatus}</td> */}

                {/* Actions */}
                <td className="text-center">
                  {request.requestStatus === "pending" ? (
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        className="btn btn-success btn-xs"
                        onClick={() => handleApprove(request)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-error btn-xs"
                        onClick={() => handleReject(request)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-secondary">
                      No actions
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {allRequest.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-secondary">
                  No asset requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
    );
};

export default AllRequests;