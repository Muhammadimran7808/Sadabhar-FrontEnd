import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const res = await axios.get("/api/v1/products/get-products");
      if (res?.data?.success) {
        setAllProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong");
    }
    setLoading(false);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="flex items-start flex-col md:flex-row gap-2">
          <AdminMenu />
        {loading ? (
          <div className="absolute top-72 left-[52rem]">
            <ThreeDots color="#6366F1" />
          </div>
        ) : (
          <section className="body-font w-full">
            <div className="text-3xl text-center mt-8">All Product</div>
            <div className="text-gray-600 container px-5 py-12 mx-auto">
              <div className="product-container">
                {allProducts?.map((product) => (
                    <div key={product._id} className="border-2 border-gray-200 border-opacity-60 rounded-lg">
                      <img
                        className="h-52 w-full"
                        src={`https://sadabahar-backend.onrender.com/api/v1/products/product-picture/${product?._id}`}
                        loading="lazy"
                        alt={product.name}
                      />
                      <div className="p-3 md:p-6">
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {product.name}
                        </h1>
                        <p className="leading-relaxed mb-3">
                          {product.description.substring(0, 35)}...
                        </p>
                        <Link
                          className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                          to={`/dashboard/admin/products/${product._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          View Porduct
                          <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};
export default Products;
