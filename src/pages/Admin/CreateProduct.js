import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { Select, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, MenuItem, TextField } from "@mui/material";
import TextArea from "antd/es/input/TextArea";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // get all categories
  const getAllCategories = async () => {
    try {
      // setLoading(true)
      const res = await axios.get("/api/v1/category/all-categories");
      if (res?.data?.success) {
        setCategories(res.data.categories);
      }
      // setLoading(false)
    } catch (error) {
      console.log(error);
      toast.error("Something wrong while getting category");
      // setLoading(false)
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // create product handler
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/v1/products/create-product",
        {
          name,
          image,
          description,
          price,
          quantity,
          shipping,
          category,
        },
        {
          headers: {
            Authorization: auth.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(res?.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex items-start flex-col md:flex-row gap-2">
        <AdminMenu />
        <div className="mt-10  w-full p-6">
          <div className="text-3xl text-gray-900">Create Product</div>

          <form onSubmit={handleCreate} className="m-2">
            <Select
              placeholder="Select a category"
              size="large"
              className="md:w-3/4 w-full mb-4"
              showSearch
              onChange={(value) => setCategory(value)}
            >
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <div className="mt-4">
              <label className="border-2 border-gray-300 rounded-md flex items-center justify-center md:w-3/4 cursor-pointer py-3 hover:bg-gray-400 hover:text-white">
                {image ? image.name : "Upload image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>

            <div className="mt-4">
              {image && (
                <div className="flex justify-center md:w-3/4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="product_image"
                    height={"200px"}
                    width={"200px"}
                  />
                </div>
              )}
            </div>

            <div className="mt-4">
              <TextField
                required
                id="outlined-required"
                label="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="md:w-3/4 w-full mb-3"
              />
            </div>

            <div className="mt-4">
              <TextArea
                required
                placeholder="Product description *"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="md:w-3/4 w-full mb-3 border-2"
              />
            </div>

            <div className="mt-4">
              <TextField
                type="number"
                required
                id="outlined-required"
                label="Product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="md:w-3/4 w-full mb-3"
              />
            </div>
            <div className="mt-4">
              <TextField
                required
                type="number"
                id="outlined-required"
                label="Product quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="md:w-3/4 w-full mb-3"
              />
            </div>

            <div className="mt-4">
              <TextField
                select
                label="Shipping"
                size="large"
                required
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                className="md:w-3/4 w-full mb-3"
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </TextField>
            </div>

            <div className="mt-4">
              <Button type="submit" variant="contained" size="large">
                {loading ? (
                  <TailSpin height={30} color="#fff" />
                ) : (
                  "CREATE PRODUCT"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
