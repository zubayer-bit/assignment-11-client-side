import React, { useState, use } from "react";
import { FaBars, FaChartPie, FaTimes, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { NavLink, Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import PageLoad from "../../../PageLoad/PageLoad";
import { FaBoxesStacked } from "react-icons/fa6";
import useRole from "../../../hooks/useRole";
import { div, ul } from "framer-motion/client";

const Navbar = () => {
  const {
    user,
    logOut,
    loading,
    //  role
  } = use(AuthContext);
  // role = "employee" | "hr"
  const { role } = useRole();
  console.log("role data:", role);
  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => Swal.fire("Logged out successfully"))
      .catch((error) => Swal.fire(error.message));
  };

  if (loading) return <PageLoad />;

  return (
    <motion.div
      className="bg-base-100 shadow-md sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaBoxesStacked className="text-3xl text-primary" />
          <span className="text-2xl font-bold">
            Asset<span className="text-secondary">Verse</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-300 px-1 pb-1 ${
                isActive
                  ? "text-primary border-b-2 border-primary"
                  : "hover:text-primary hover:border-b-2 hover:border-primary"
              }`
            }
          >
            Home
          </NavLink>

          {!user && (
            <>
              <NavLink
                to="/employee-register"
                className={({ isActive }) =>
                  `transition-colors duration-300 px-1 pb-1 ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "hover:text-primary hover:border-b-2 hover:border-primary"
                  }`
                }
              >
                Join as Employee
              </NavLink>

              <NavLink
                to="/hr-register"
                className={({ isActive }) =>
                  `transition-colors duration-300 px-1 pb-1 ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "hover:text-primary hover:border-b-2 hover:border-primary"
                  }`
                }
              >
                Join as HR Manager
              </NavLink>
            </>
          )}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!user ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block" // inline-block preserve kore button size tikh thakbe
            >
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Profile Image */}
              <div className="w-10 h-10 ">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-gray-500" />
                )}
              </div>

              {/*  dashboard */}

              {/* hr dashboard */}
              {/* {role === "hr" && (
                <>
                <li>
                   <NavLink
                    to="/dashboard"
              className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md font-semibold transition
                 ${
                   isActive
                     ? "bg-primary text-white"
                     : "hover:bg-primary/10 text-secondary"
                 }`
                    }
                  >
                    <FaChartPie className="text-lg" />
                    <span>Hr Dashboard</span>
                  </NavLink>

                </li>
                 
                </>
              )} */}

              {role === "hr" && (
                <ul>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 border rounded-md font-semibold transition
                 ${
                   isActive
                     ? "bg-primary text-white"
                     : "hover:bg-primary/10 text-secondary"
                 }`
                    }
                  >
                    {/* <FaChartPie className="text-lg" /> */}
                    <span>Hr Dashboard</span>
                  </NavLink>
                </ul>
              )}
              {/* employee dashboard */}
              {role === "employee" && (
                <ul>
                  <NavLink
                    to="/dashboard/employeeAssetList"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 border py-2 rounded-md font-semibold transition
                 ${
                   isActive
                     ? "bg-primary text-white"
                     : "hover:bg-primary/10 text-secondary"
                 }`
                    }
                  >
                    <span>Employee Dashboard</span>
                  </NavLink>
                </ul>
              )}

              {/* HR Menu */}
              {role === "hr" && (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="
    btn btn-ghost font-semibold
    flex items-center gap-1
    group
  "
                  >
                    <span className="text-secondary">HR Menu</span>

                    <svg
                      className="
      w-4 h-4
      opacity-70
      animate-bounce
      group-focus:animate-none
      group-focus:rotate-180
      transition-transform duration-300
    "
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </label>

                  <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56"
                  >
                    <li>
                      <NavLink to="/dashboard">Asset List</NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/add-asset">Add Asset</NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/all-requests">
                        All Requests
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/employee-list">
                        Employee List
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/upgrade-package">
                        Upgrade Package
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/hrProfile">Profile</NavLink>
                    </li>
                    {/* <li className="border-t">
                      <button onClick={handleLogOut} className="text-error">
                        Logout
                      </button>
                    </li> */}
                  </ul>
                </div>
              )}

              {/* Employee Menu */}
              {role === "employee" && (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="
                    btn btn-ghost font-semibold
                    flex items-center gap-1
                    group
                    "
                  >
                    <span className="text-secondary"> Employee Menu</span>

                    <svg
                      className="
                    w-4 h-4
                    opacity-70
                    animate-bounce
                    group-focus:animate-none
                    group-focus:rotate-180
                    transition-transform duration-300
                    "
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </label>

                  <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56"
                  >
                    <li>
                      <NavLink to="/dashboard/employeeAssetList">
                        My Assets
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/dashboard/request-asset">
                        Request an Asset
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/my-team">My Team</NavLink>
                    </li>

                    <li>
                      <NavLink to="/dashboard/profile">Profile</NavLink>
                    </li>
                    {/* <li className="border-t">
                      <button onClick={handleLogOut} className="text-error">
                        Logout
                      </button>
                    </li> */}
                  </ul>
                </div>
              )}

              {/* logout btn */}
              <div>
                <motion.button
                  onClick={handleLogOut}
                  className="text-white btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </div>
            </>
            // flex gap-3 add kora holo:
            // <div className="dropdown dropdown-end  flex gap-3">
            //   <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            //     {user?.photoURL ? (
            //       <img
            //         src={user.photoURL}
            //         alt="profile"
            //         className="w-10 rounded-full"
            //       />
            //     ) : (
            //       <FaUserCircle className="text-3xl" />
            //     )}
            //   </label>

            //   <ul
            //     tabIndex={0}
            //     className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
            //   >
            //     {/* Employee Menu */}
            //     {role === "employee" && (
            //       <>
            //         <li><NavLink to="/employee/my-assets">My Assets</NavLink></li>
            //         <li><NavLink to="/employee/my-team">My Team</NavLink></li>
            //         <li><NavLink to="/employee/request-asset">Request Asset</NavLink></li>
            //         <li><NavLink to="/employee/profile">Profile</NavLink></li>
            //       </>
            //     )}

            //     {/* HR Menu */}
            //     {role === "hr" && (
            //       <>
            //         <li><NavLink to="/hr/assets">Asset List</NavLink></li>
            //         <li><NavLink to="/hr/add-asset">Add Asset</NavLink></li>
            //         <li><NavLink to="/hr/requests">All Requests</NavLink></li>
            //         <li><NavLink to="/hr/employees">Employee List</NavLink></li>
            //         <li><NavLink to="/hr/profile">Profile</NavLink></li>
            //       </>
            //     )}

            //     {/* <li className="border-t mt-2">
            //       <button onClick={handleLogOut} className="text-error">
            //         Logout
            //       </button>
            //     </li> */}
            //   </ul>

            //   {/* logout btn */}
            //   <div className="">
            //      <button onClick={handleLogOut} className="text-white btn btn-primary">
            //         Logout
            //       </button>
            //   </div>
            // </div>
          )}

          {/* Mobile Toggle */}
          <div className="md:hidden">
            {open ? (
              <FaTimes
                size={22}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            ) : (
              <FaBars
                size={22}
                onClick={() => setOpen(true)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden  bg-base-100 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ul className="flex flex-col items-center gap-4 py-4 ">
          <NavLink
            className={
              "font-semibold hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-300"
            }
            to="/"
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>

          {!user && (
            <>
              <NavLink
                className={
                  "font-semibold hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-300"
                }
                to="/employee-register"
              >
                Join as Employee
              </NavLink>
              <NavLink
                className={
                  "font-semibold hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-300"
                }
                to="/hr-register"
              >
                Join as HR Manager
              </NavLink>

              <NavLink
                className={
                  "font-semibold hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-300"
                }
                to="/login"
              >
                Login
              </NavLink>
            </>
          )}
        </ul>

        {/* logout btn */}

        {/* <div >
          <button onClick={handleLogOut} className="text-white btn btn-primary flex mx-auto">
                    Logout
                  </button>
        </div> */}
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
