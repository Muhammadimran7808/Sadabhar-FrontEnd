import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useCart } from "../context/cart";

const CategoryBasedProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // get products based on category
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/v1/products/category-products/${params.slug}`
      );
      if (res?.data?.success) {
        setProducts(res?.data?.products);
        setCategory(res?.data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (params?.slug) getProducts();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="flex items-center justify-center md:px-10">
        {loading ? (
          <div className="absolute top-1/2">
            <ThreeDots width={90} color="blue" />
          </div>
        ) : (
          <div className="container">
            <div className="text-center text-2xl font-semibold">
              Category - {category?.name}
            </div>
            <h5 className="text-center text-lg mb-4">
              {products?.length} products found
            </h5>
            <div className="px-2 product-container text-center">
              {products?.map((product) => (
                <div
                  key={product._id}
                  className="rounded overflow-hidden shadow-lg"
                >
                  <div className="border overflow-hidden">
                    <img
                      className="image-transition hover:scale-110 w-full md:h-80 h-60"
                      src={`https://sadabahar-backend.vercel.app/api/v1/products/product-picture/${product?._id}`}
                      loading="lazy"
                      alt={product?.name}
                    />
                  </div>
                  <div className="px-3 py-4">
                    <div className="product-title-price flex flex-row justify-around mb-2">
                      <div className="font-bold md:text-xl text-base">
                        {product.name}
                      </div>
                      <div className="font-medium md:text-lg text-base">
                        ${product.price}
                      </div>
                    </div>
                    <p className="text-gray-700 text-base">
                      {product.description.substring(0, 30)}...
                    </p>
                  </div>
                  <div className="pb-2 flex content-center justify-center gap-3">
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="md:px-3 md:py-2 px-1 py-1 md:text-sm text-xs md:font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:outline-none"
                    >
                      More Detail
                    </button>
                    <button
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Item added to cart");
                      }}
                      className="md:px-3 md:py-2 px-1 py-1 md:text-sm text-xs md:font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:ring-2 focus:outline-none"
                    >
                      Add To Cart
                    </button>
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

export default CategoryBasedProducts;
