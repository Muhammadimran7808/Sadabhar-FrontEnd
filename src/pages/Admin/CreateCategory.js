import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import CreateCategoryForm from "../../components/Form/CreateCategoryForm";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addCatLoading, setaddCatLoading] = useState(false);
  const [name, setName] = useState("");
  const [auth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);

  // Create category handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setaddCatLoading(true);
    try {
      const res = await axios.post(
        "/api/v1/category/create-category",
        { name },
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );

      if (res?.data.success) {
        toast.success(`${name} category created successfully`);
        getAllCategories();
        setName("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong. Check Your connection");
    }
    setaddCatLoading(false);
  };

  // update category handler
  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      if (res?.data.success) {
        toast.success(res.data.message);
        setVisible(false); //closing model
        getAllCategories();
        setSelected(null);
        setUpdatedName("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong. Check Your connection");
    }
  };

  // delete category handler
  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/category/delete-category/${id}`, {
        headers: { Authorization: auth.token },
      });
      if (res?.data.success) {
        toast.success(res.data.message);
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("SOme thing went wronge. Check Your connection");
    }
  };

  // get all categories
  const getAllCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/category/all-categories");
      if (res?.data.success) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong while getting category");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout>
      <div className="flex items-start flex-col md:flex-row gap-2 mb-10">
        <AdminMenu />
        <div className="w-full">
          {loading ? (
            <div className="absolute top-72 left-[52rem]">
              <ThreeDots color="#6366F1" />
            </div>
          ) : (
            <>
              <p className="md:mt-10  w-full text-2xl md:text-3xl text-gray-900 font-semibold  p-6">
                Manage Category
              </p>
              <div>
                <div className="ml-4 mb-5">
                  <CreateCategoryForm
                    category={name}
                    setCategory={setName}
                    handleSubmit={handleSubmit}
                    loading={addCatLoading}
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full md:w-2/3 text-sm text-left rtl:text-right">
                    <thead className=" uppercase bg-gray-50 border-b border-gray-300">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {categories.map((category) => (
                      <tbody key={category._id}>
                        <tr className="bg-white border-b border-gray-300">
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-xl whitespace-nowrap"
                          >
                            {category.name}
                          </td>
                          <td className="px-6 py-4 flex gap-3">
                            <button
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(category.name);
                                setSelected(category);
                              }}
                              className="bg-indigo-500 hover:bg-indigo-600 py-2 px-3 rounded-md text-white"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteCategory(category._id)}
                              className="bg-red-500 hover:bg-red-600 py-2 px-3 rounded-md text-white"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </>
          )}
          <Modal
            onCancel={() => setVisible(false)}
            open={visible}
            title={"Update Category"}
            footer={null}
          >
            <CreateCategoryForm
              category={updatedName}
              setCategory={setUpdatedName}
              handleSubmit={updateCategory}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
