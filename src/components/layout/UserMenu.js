import React from 'react'
import { NavLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { FaClipboardList } from "react-icons/fa6";

const UserMenu = () => {
  return (
    <>
      <div className="w-screen md:w-96 mt-10 gap-8">
        <div className="text-center text-3xl font-semibold mb-6">
          Dashboard
        </div>
        <div className="text-center font-medium text-lg text-gray-700 border">
          <NavLink
            to={"/dashboard/user/profile"}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "rgb(99 102 241)" : "",
                color: isActive ? "#fff" : "",
              };
            }}
            className="flex items-center gap-4 pl-14 py-2 border-b border-gray-300 cursor-pointer"
          >
            <CgProfile size={"25px"} />
            <span>Profile</span>
          </NavLink>

          <NavLink
            to={"/dashboard/user/orders"}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "rgb(99 102 241)" : "",
                color: isActive ? "#fff" : "",
              };
            }}
            className="flex items-center gap-4 pl-14 py-2 border-b border-gray-300 cursor-pointer"
          >
            <FaClipboardList size={"25px"} />
            <span>Orders</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default UserMenu