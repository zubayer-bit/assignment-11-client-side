import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAuthSecure";
import { motion } from "framer-motion";

// search highlight
const highlightText = (text, searchText) => {
  if (!searchText) return text;
  const regex = new RegExp(`(${searchText})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="bg-yellow-200 text-black px-1 rounded">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const EmployeeAssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");

  const { data: assets = [], isFetching } = useQuery({
    queryKey: ["myAssets", user?.email, searchText, type],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employee/my-assets?searchText=${searchText}&type=${type}`
      );
      setLoading(false);
      return res.data;
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 sm:p-6 bg-base-100 rounded-lg shadow-md"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 lg:items-center lg:justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          My Assets ({assets.length})
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

            <input
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search asset"
              className="w-full"
            />
          </label>

          {/* Filter */}
          <select
            className="select select-bordered"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra text-sm md:text-base">
          <thead className="bg-base-200 text-secondary">
            <tr>
              <th>Asset Image</th>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th className="hidden md:table-cell">Company Name</th>
              <th className="hidden md:table-cell">Request Date</th>
              <th>Approval Date</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset) => (
              <motion.tr
                key={asset._id}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <td>
                  <img
                    src={asset.assetImage}
                    className="w-10 h-10 rounded object-contain"
                  />
                </td>

                <td className="font-medium">
                  {highlightText(asset.assetName, searchText)}
                </td>

                <td>
                  <span className="badge badge-outline whitespace-nowrap">
  {asset.assetType}
</span>

                </td>

                <td className="hidden md:table-cell">
                  {asset.companyName}
                </td>

                <td className="hidden md:table-cell">
                  {new Date(asset.requestDate).toLocaleDateString()}
                </td>

                <td>
                  {asset.assignmentDate
                    ? new Date(asset.assignmentDate).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  <span className="badge badge-success badge-sm">
                    {asset.status}
                  </span>
                </td>

                <td className="text-center">
                  {asset.requestStatus === "approved" &&
                    asset.assetType === "Returnable" && (
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-xs btn-warning tooltip tooltip-left tooltip-error  whitespace-nowrap cursor-not-allowed"
                         data-tip="Currently Unavailable"
                      >
                        Return
                      </motion.button>
                    )}
                </td>
              </motion.tr>
            ))}

            {isFetching && (
              <tr>
                <td colSpan="8" className="text-center py-6">
                  <span className="loading loading-dots loading-sm text-primary"></span>
                </td>
              </tr>
            )}

            {!isFetching && assets.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6 text-secondary">
                  No assets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Print */}
      <div className="mt-6 text-right">
        <button
          onClick={() => window.print()}
          className="btn btn-outline btn-primary btn-sm"
        >
          Print
        </button>
      </div>
    </motion.div>
  );
};

export default EmployeeAssetList;
