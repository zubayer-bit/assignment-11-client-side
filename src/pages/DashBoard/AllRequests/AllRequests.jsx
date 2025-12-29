import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAuthSecure';
import { motion } from "framer-motion";


const AllRequests = () => {
    const axiosSecure = useAxiosSecure();

    //request asset ar data get kora holo...[hr get only his data][not others hr data]:
    const {data: allRequest=[]} =useQuery({
        queryKey: ["all-requests"],
        queryFn: async()=>{
            const res = await axiosSecure.get("/hr/asset-requests");
            return res.data;
        }
    })

    return (
        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-6"
    >
      <h2 className="text-3xl font-semibold text-primary mb-6">
        All Asset Requests
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Asset</th>
              <th>Request Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allRequest.map((request) => (
              <tr key={request._id}>

                {/* Employee */}
                <td>
                  <div>
                    <p className="font-medium">{request.requesterName}</p>
                    <p className="text-xs text-gray-500">
                      {request.requesterEmail}
                    </p>
                  </div>
                </td>

                {/* Asset */}
                <td>{request.assetName}</td>

                {/* Request Date */}
                <td>
                  {new Date(request.requestDate).toLocaleDateString()}
                </td>

                {/* Status */}
                {/* <td>{getStatusBadge(request.requestStatus)}</td> */}
                <td>{request.requestStatus}</td>


                {/* Actions */}
                <td className="text-center space-x-2 flex flex-col gap-y-1 md:flex-row justify-center items-center">
                  {request.requestStatus === "pending" && (
                    <>
                      <button
                        className="btn btn-success btn-xs"
                        // onClick={() => handleApprove(request)}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-error btn-xs"
                        // onClick={() => handleReject(request)}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {request.requestStatus !== "pending" && (
                    <span className="text-xs text-gray-400">
                      No actions
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {allRequest.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
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