import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
// import useAuthSecure from "../../../hooks/useAuthSecure";
import { motion } from "framer-motion";

import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaUserCheck } from "react-icons/fa";
import { NavLink } from "react-router";
// import { a } from "framer-motion/client";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAuthSecure";

//--------------------search code:1
/* ========= HIGHLIGHT FUNCTION (ADD THIS) ========= */
const highlightText = (text, searchText) => {
  if (!searchText) return text;

  const regex = new RegExp(`(${searchText})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-yellow-200 text-black px-1 rounded">
        {part}
      </span>
    ) : (
      part
    )
  );
};
/* =============================================== */

const AssetList = () => {
  const { user } = useAuth();
  // const axiosSecure = useAuthSecure();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  //----**direct assign code***------:1
  //1:(asset ar value ai selectedAsset ar moddhe pabo)
  const [selectedAsset, setSelectedAsset] = useState(null);

  //react ar moddhe modal ar jonno amra "ref" use kori:
  const employeeModalRef = useRef();

  //direct asset assign------ **direct assign code***--------:2
  //4:(affiliated employee get korar code)
  const {
    data: affiliationsEmployee = [],
    //  refetch
  } = useQuery({
    queryKey: ["employeeAffiliations", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/affiliations-employee`);
      // console.log("affiliation employee:", res.data);
      return res.data;
    },
  });

  //-------------------------------asset get korar code:
  const {
    data: assets = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["assets", user?.email, searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets?email=${user.email}&searchText=${searchText}`
      );
      setLoading(false);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  //delete handler function:
  const handlerDelete = (id) => {
    //confirm alert:

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //ame jokhon "Yes, delete it!" dibo,tokhon ai khane ase: then amk delete ar code write korte hobe:
        axiosSecure.delete(`/asset/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            //'refetch() use korle data abr auto refetch() hoa jai, jar karone "delete" korle auto web-page theke remove hoa jai..reload dite hoa na
            //ata :tanStack query theke naoa:
            refetch();

            //ai khane alert set korbo...delete ar:
            Swal.fire({
              title: "Deleted!",
              text: "Asset has been deleted.",
              icon: "success",
            });
          }

          console.log(res.data); //out:{acknowledged: true, deletedCount: 1}
        });
      }
    });
  };


  //************direct assign code*********************** */


  //----direct assign to emplyee function (direct assign asset click korle ai khane asbe)--(start)
  const directAssignModal = (asset) => {
    //ame je asset ar jonno employee assign korbo,sei asset ar data ke state aa add korbo:
    setSelectedAsset(asset);
    //mane ai function ta jokhon active hobe,tokhon modal ar sathe jate connect korci->"riderModal"..tar moddhe modal ar value ta "current" ar moddhe thake...then ai value ke show korar jonno "showModal" dibo
    employeeModalRef.current.showModal();
  };
//----direct assign to emplyee function (direct assign asset click korle ai khane asbe)--(start)

  //modal ar "Assign" button click korle ai khane asbe----------(start)
  //(rider ke assign korar code)
//abr "Assign" btn click korle ja hobe...tar code:

//amr kace 2ta data ace--->asset data(selectedAsset), affiliated employee ar data(employee)
const handleDirectAssign =async (employee)=>{
const employeeAssignInfo = {
  
    employeeEmail: employee.employeeEmail,
    employeeName: employee.employeeName,
   
}

//modal close:
employeeModalRef.current.close();

//update korbo:
const result = await Swal.fire({
    title: "Assign Asset Directly?",
    text: "This will assign the asset to the employee.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Approve",
    confirmButtonColor: "#16a34a",
  });

 if (result.isConfirmed) {
  try {
    const res = await axiosSecure.patch(`/directAssign/${selectedAsset._id}`,employeeAssignInfo);

    // Success check
    if (res.data.result?.insertedId) {
      Swal.fire("Done!", "Asset Assign successfully", "success");
      
      setSelectedAsset(null);
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
}

  return (
    <motion.div
      className="p-4 md:p-6 bg-base-100 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-primary">
          Total Asset:{assets.length}
        </h2>
        <h2 className="text-2xl font-bold text-primary">
          Affiliated Employee Available:{affiliationsEmployee.length}
        </h2>

        {/* search box */}
        <label className="input">
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
            placeholder="Search"
          />
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm md:text-base">
          <thead>
            <tr className="text-secondary">
              <th>Image</th>
              <th>Company Name</th>
              <th>Product Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Available Quantity</th>
              <th>Date Added</th>
              <th>Direct Assign Asset</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset) => (
              <motion.tr
                key={asset._id}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* Image */}
                <td>
                  <img
                    src={asset.productImage}
                    alt="asset"
                    className="w-12 h-12  md:w-10 md:h-10 rounded-2xl  object-contain"
                  />
                </td>

                {/*company Name */}
                <td className="font-medium whitespace-nowrap">
                  {highlightText(asset.companyName, searchText)}
                </td>
                {/* <td className="font-medium whitespace-nowrap">
                  {asset.companyName}
                </td> */}

                {/*product Name */}
                <td className="font-medium whitespace-nowrap">
                  {highlightText(asset.productName, searchText)}
                </td>
                {/* <td className="font-medium whitespace-nowrap">
                  {asset.productName}
                </td> */}

                {/* Type */}
                <td>
                  <span className="inline-flex whitespace-nowrap border px-2 py-1 rounded-lg text-sm md:text-base bg-blue-100 text-blue-600 font-medium">
                    {asset.productType}
                  </span>
                </td>

                {/* Quantity */}
                <td>{asset.productQuantity}</td>

                {/* Available Quantity */}
                <td>{asset.availableQuantity}</td>

                {/* added Date */}
                <td className="whitespace-nowrap">
                  {new Date(asset.dateAdded).toLocaleDateString()}
                </td>

                {/* Direct Assign Asset */}
                <td className="whitespace-nowrap ">
                   <button
                    onClick={() => directAssignModal(asset)}
                    className="btn btn-sm btn-outline btn-success  tooltip"
                    data-tip="Assign Asset"
                  >
                    
                      <FaUserCheck className="text-lg" />
                    
                  </button>
                </td>

                {/* Actions */}
                <td className="flex gap-2 flex-col sm:flex-row">
                  {/* direct assign */}
                  {/* <button
                    onClick={() => directAssignModal(asset)}
                    className="btn btn-sm btn-outline btn-success tooltip"
                    data-tip="Direct Assign Asset"
                  >
                    <NavLink>
                      <FaUserCheck className="text-lg" />
                    </NavLink>
                  </button> */}

                  {/* Edit Asset */}
                  <button
                    className="btn btn-sm btn-outline btn-primary tooltip"
                    data-tip="Edit Asset"
                  >
                    <NavLink to={`/dashboard/assets/edit/${asset._id}`}>
                      <FaEdit />
                    </NavLink>
                  </button>

                  {/* Delete Asset */}
                  <button
                    onClick={() => handlerDelete(asset._id)}
                    className="btn btn-sm btn-outline btn-error tooltip"
                    data-tip="Delete Asset"
                  >
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}

            {/* //new vabe */}
            {/* Loading state */}
            {isFetching && (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  <span className="loading loading-dots loading-sm text-primary"></span>
                </td>
              </tr>
            )}

            {/* Empty state */}
            {!isFetching && assets.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-secondary">
                  No assets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>




      {/* modal */}

      {/* dialog ar moddhe amr make kora "employeeModalRef" add korbo "ref" ar moddhe */}
      <dialog
        ref={employeeModalRef}
        id="assign_employee_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-5xl w-full p-6">
          {/* Header */}
          <h3 className="font-bold text-xl mb-4 text-center text-primary">
            Assign Asset to Employee
          </h3>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="text-center text-secondary">
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Affiliation Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {affiliationsEmployee.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 py-6">
                      No affiliated employees found
                    </td>
                  </tr>
                ) : (
                  affiliationsEmployee.map((employee, index) => (
                    <tr key={employee._id} className="text-center">
                      <td>{index + 1}</td>
                      <td className="font-medium">{employee.employeeName}</td>
                      <td>{employee.employeeEmail}</td>
                      <td>
                        <span className="badge badge-success badge-outline">
                          {employee.status}
                        </span>
                      </td>
                      <td>
                        {new Date(
                          employee.affiliationDate
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        <motion.button
                          onClick={() => handleDirectAssign(employee)}
                          className="btn btn-sm btn-success"
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          Assign
                        </motion.button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="modal-action mt-6">
            <form method="dialog">
              <motion.button
                className="btn btn-sm btn-outline text-primary border-primary hover:bg-primary hover:text-white"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Close
              </motion.button>
            </form>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
};

export default AssetList;
