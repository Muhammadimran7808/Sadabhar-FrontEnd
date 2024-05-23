import React from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import { FaUserEdit } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const Profile = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - SadaBahar"}>
      <div className="flex items-start flex-col md:flex-row gap-2">
        <div>
          <UserMenu />
        </div>
        <div className="mt-20 border border-gray-300 w-3/4 text-xl md:text-3xl text-gray-700 p-6 flex gap-24">
          <div>
            <div>Name: {auth?.user?.name}</div>
            <div>Email: {auth?.user?.email}</div>
            <div>Phone: {auth?.user?.phone}</div>
          </div>
          <Link to={"/dashboard/user/update-profile"}>
            <Tooltip title="Edit Profile" arrow>
              <IconButton>
                <FaUserEdit size={30} />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
