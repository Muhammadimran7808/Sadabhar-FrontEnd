import React from 'react'
import { NavLink } from 'react-router-dom'
import { CgNotes, CgProfile } from "react-icons/cg";
import { MdAddCircleOutline } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { TbBrandProducthunt } from "react-icons/tb";

const AdminMenu = () => {

  return (
    <>
      <div className="w-full md:w-80 mt-10  flex flex-col gap-8 ">
        <div className="w-full md:w-96 text-center text-2xl font-semibold">
          Admin Panel
        </div>
        <div className="w-full text-center font-medium text-lg text-gray-700 border">
          <NavLink
            to={"/dashboard/admin/profile"}
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
            to={"/dashboard/admin/create-category"}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "rgb(99 102 241)" : "",
                color: isActive ? "#fff" : "",
              };
            }}
            className="flex items-center gap-4 pl-14 py-2 border-b border-gray-300 cursor-pointer"
          >
            <MdOutlineDashboardCustomize size={"25px"} />
            <span>Create Category</span>
          </NavLink>

          <NavLink
            to={"/dashboard/admin/create-product"}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "rgb(99 102 241)" : "",
                color: isActive ? "#fff" : "",
              };
            }}
            className="flex items-center gap-4 pl-14 py-2 border-b border-gray-300 cursor-pointer"
          >
            <MdAddCircleOutline size={"25px"} />
            <span>Add Product</span>
          </NavLink>

          <NavLink
            to={"/dashboard/admin/products"}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "rgb(99 102 241)" : "",
                color: isActive ? "#fff" : "",
              };
            }}
            className="flex items-center gap-4 pl-14 py-2 border-b border-gray-300 cursor-pointer"
          >
            <TbBrandProducthunt size={"25px"} />
            <span>Products</span>
          </NavLink>

          <NavLink
            to={"/dashboard/admin/orders"}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "rgb(99 102 241)" : "",
                color: isActive ? "#fff" : "",
              };
            }}
            className="flex items-center gap-4 pl-14 py-2 border-b border-gray-300 cursor-pointer"
          >
            <CgNotes size={"25px"} />
            <span>Orders</span>
          </NavLink>

          <NavLink
            to={"/dashboard/admin/users"}
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "rgb(99 102 241)" : "",
                color: isActive ? "#fff" : "",
              };
            }}
            className="flex items-center gap-4 pl-14 py-2 border-b border-gray-300 cursor-pointer"
          >
            <FaUsers size={"25px"} />
            <span>Users</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default AdminMenu