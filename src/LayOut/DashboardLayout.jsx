import React from "react";
import { FaListAlt, FaMotorcycle, FaUserCircle, FaUsers, FaWarehouse } from "react-icons/fa";
import {
  MdAccountCircle,
  MdGroups,
  MdOutlineAddCircle,
  MdOutlineAdminPanelSettings,
  MdOutlineDirectionsBike,
  MdPostAdd,
} from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import { FaBoxesStacked } from "react-icons/fa6";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineInbox, AiOutlinePlusCircle } from "react-icons/ai";

const DashboardLayout = () => {
  //useRole hook use kora holo:-->ata "role" ar hook
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">
            {" "}
            <span className="text-2xl font-semibold">
              Asset<span className="text-secondary">Verse</span>
            </span>{" "}
            <span className="text-2xl font-medium">Dashboard</span>
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}

            <li>
              <Link to={"/"}>
                {" "}
                <FaBoxesStacked className="text-3xl text-primary"></FaBoxesStacked>{" "}
              </Link>
            </li>

            {/* dashboard home */}
           

            {/* our dashboard links */}

            {/*only rider hole je link show hobe*/}
            {role === "hr" && (
              <>
                <li>
                  <NavLink
                    to={"/dashboard"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Asset List"
                  >
                    <BsBoxSeam />
                    <span className="is-drawer-close:hidden text-secondary">
                      Asset List
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/add-asset"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Asset"
                  >
                    <AiOutlinePlusCircle />

                    <span className="is-drawer-close:hidden text-secondary">
                      Add Asset
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/dashboard/all-requests"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Requests"
                  >
                    <AiOutlineInbox />

                    <span className="is-drawer-close:hidden text-secondary">
                      All Requests
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/dashboard/employee-list"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Employee List"
                  >
                    <FaUsers />

                    <span className="is-drawer-close:hidden text-secondary">
                      Employee List
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/dashboard/profile"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Profile"
                  >
                    <FaUserCircle />

                    <span className="is-drawer-close:hidden text-secondary">
                      Profile
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* role ar value dea option gulu conditional kora holo */}
            {role === "employee" && (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/employeeAssetList"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Assets"
                  >
                    <FaListAlt size={11} />

                    <span className="is-drawer-close:hidden">
                      My Assets
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/request-asset"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Request an Asset"
                  >
                    <MdPostAdd />

                    <span className="is-drawer-close:hidden">
                      Request an Asset
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/dashboard/my-team"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Team"
                  >
                    <MdGroups />

                    <span className="is-drawer-close:hidden">
                      My Team
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/employeeDashboard/profile"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Profile"
                  >
                    <MdAccountCircle />

                    <span className="is-drawer-close:hidden">
                     Profile
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* List item */}
            {/* Settings icon */}
            {/* <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
               
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
