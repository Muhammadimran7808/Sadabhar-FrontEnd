import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="flex items-start flex-col md:flex-row gap-2">
        <AdminMenu />
        <div className="w-full md:mt-20 border border-gray-300 mr-4 md:text-3xl text-gray-700 p-6">
          <div>Admin Name: {auth?.user?.name}</div>
          <div>Admin Email: {auth?.user?.email}</div>
          <div>Admin Phone: {auth?.user?.phone}</div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
