import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, MenuItem, TextField } from "@mui/material";
import TextArea from "antd/es/input/TextArea";
import { useAuth } from "../../context/auth";
import { useNavigate, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  // get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.pid}`
      );
      if (data?.success) {
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setId(data.product._id);
        setCategory(data.product.category._id);
      } else {
        toast.error("Some thing went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong");
    }
  };

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
    getSingleProduct();
  }, []);

  // update product handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productData = new FormData();
      productData.append("name", name);
      image && productData.append("image", image);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);
      const res = await axios.put(
        `/api/v1/products/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: auth.token,
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

  // Delete product
  const handleDelete = async () => {
    try {
      let confirm = window.confirm("Are you sure want to delete this product");
      if (!confirm) return;
      const res = await axios.delete(`/api/v1/products/del-product/${id}`);
      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex items-start flex-col md:flex-row gap-2">
        <AdminMenu />
        <div className="mt-10  w-full text-gray-900 p-6">
          <div className="text-3xl">Update Product</div>

          <form className="m-2">
            <Select
              placeholder="Select a category"
              size="large"
              className="md:w-3/4 w-full mb-4"
              showSearch
              onChange={(value) => setCategory(value)}
              value={category}
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
              {image ? (
                <div className="flex justify-center md:w-3/4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="product_image"
                    height={"200px"}
                    width={"200px"}
                  />
                </div>
              ) : (
                <div className="flex justify-center md:w-3/4">
                  <img
                    src={`/api/v1/products/product-picture/${id}`}
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
                onChange={(e) => setShipping(e.target.value)}
                value={shipping ? 1 : 0}
                className="md:w-3/4 w-full mb-3"
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={0}>No</MenuItem>
              </TextField>
            </div>

            <div className="mt-4 flex gap-x-5">
              <Button onClick={handleUpdate} variant="contained" size="large">
                {loading ? (
                  <TailSpin height={30} color="#fff" />
                ) : (
                  "UPDATE PRODUCT"
                )}
              </Button>
              <Button
                onClick={handleDelete}
                variant="contained"
                color="error"
                size="large"
              >
                DELETE PRODUCT
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
