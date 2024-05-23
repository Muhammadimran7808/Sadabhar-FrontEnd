import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";

const Users = () => {
  return (
    <Layout>
      <div className="flex items-start flex-col md:flex-row gap-2">
        <AdminMenu />
        <div className="mt-10  w-full md:text-3xl text-gray-900 p-6">users</div>
      </div>
    </Layout>
  );
};

export default Users;
