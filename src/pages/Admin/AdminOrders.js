import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { Select } from "antd";
import { ThreeDots } from "react-loader-spinner";

const { Option } = Select;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Deliverd",
    "Cancel",
  ]);

  // get all orders
  const getAllOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/auth/all-orders");
      if (res?.data?.success) {
        setOrders(res?.data?.orders);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong while getting orders");
    }
    setLoading(false);
  };

  // order status change handler
  const handleChange = async (id, value) => {
    try {
      const res = await axios.put(`/api/v1/auth/update-status/${id}`, {
        status: value,
      });
      if (res?.data?.success) {
        getAllOrders();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while chaging order status");
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="flex items-start flex-col md:flex-row gap-2">
        <AdminMenu />
        {loading ? (
          <div className="absolute top-72 left-[52rem]">
            <ThreeDots color="#6366F1" />
          </div>
        ) : (
          <div className="mt-2 w-full p-6">
            <h3 className="text-3xl text-center text-gray-900">All Orders</h3>
            <div>
              {orders?.map((order, index) => (
                <div key={index} className="relative overflow-x-auto border mb-5">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 0 400">
                      <tr>
                        <th scope="col" className="px-3 py-3">
                          #
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Bayer Name
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Quantity
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Payment
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-3 py-4">{order?.buyer?.name}</td>
                        <td className="px-3 py-4">
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(order._id, value)}
                            defaultValue={order?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td className="px-3 py-4">
                          {moment(order?.createdAt).fromNow()}
                        </td>
                        <td className="px-3 py-4">{order?.products.length}</td>
                        <td className="px-3 py-4">
                          {order?.payment.success ? "Success" : "Failed"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="w-full flex flex-wrap">
                    {order?.products?.map((product) => (
                      <div
                        key={product._id}
                        className="w-1/2 flex px-3 gap-4 py-1"
                      >
                        <div>
                          <img
                            className="h-28 w-28"
                            src={`/api/v1/products/product-picture/${product._id}`}
                            loading="lazy"
                            alt={product.name}
                          />
                        </div>
                        <div className="text-start text-[13px]">
                          <p className="font-semibold">{product.name}</p>
                          <p>{product.description.substring(0, 30)}...</p>
                          <p>price: $ {product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminOrders;
