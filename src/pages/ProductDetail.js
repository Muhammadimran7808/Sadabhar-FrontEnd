import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // get single product based on slug
  const getProduct = async () => {
    try {
      const res = await axios.get(`/api/v1/products/get-product/${params.pid}`);
      if (res?.data?.success) {
        setProduct(res?.data?.product); //when single product is fetched then calling getRelatedProducts function👇
        getRelatedProducts(params.pid, res?.data?.product.category._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong");
    }
  };

  // Get related products
  const getRelatedProducts = async (pid, cid) => {
    try {
      const res = await axios.get(
        `/api/v1/products/related-products/${pid}/${cid}`
      );
      if (res?.data?.success) {
        setRelatedProducts(res?.data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong while getting similar produts");
    }
  };

  useEffect(() => {
    if (params?.pid) getProduct();
  }, [params?.pid]);

  return (
    <Layout>
      <div className="md:px-16">
        {/* product details */}
        <div className="flex md:flex-row flex-col justify-center gap-12 ">
          <div className="mx-auto overflow-hidden border">
            <img
              className="image-transition md:h-96 h-60 hover:scale-110"
              src={`https://sadabahar-backend.vercel.app/api/v1/products/product-picture/${product?._id}`}
              loading="lazy"
              alt={product?.name}
            />
          </div>
          <div className="w-full px-3 md:px-0 md:w-3/5">
            <h1 className="mb-3 text-2xl font-bold text-center">
              Product Detail
            </h1>
            <div className="mb-4">
              <span className="font-semibold">Title</span> : {product?.name}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Description</span> :{" "}
              {product?.description}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Price</span> : ${product?.price}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Category</span> :{" "}
              {product?.category?.name}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Availability</span> :
              {product?.quantity > 0 ? (
                <span className="text-green-600"> In Stock</span>
              ) : (
                <span className="text-red-500"> Out Of Stock</span>
              )}
            </div>
            <button
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item added to cart");
              }}
              className="mb-4 px-3 py-2 text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:outline-none"
            >
              Add To Cart
            </button>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-10 border p-5">
          <h1 className="text-center md:text-xl font-semibold md:tracking-wider mt-3">
            YOU MAY ALSO LIKE
          </h1>
          {relatedProducts?.length < 1 && (
            <p className="text-center">No Similar Product Found 🙁</p>
          )}
          <div>
            <div className="product-container text-center">
              {relatedProducts?.map((product) => (
                <div
                  key={product._id}
                  className="w-full rounded overflow-hidden shadow-lg"
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
                      {product?.description?.substring(0, 30)}...
                    </p>
                  </div>
                  <div className="pb-2 flex content-center justify-center gap-3">
                    <button
                      onClick={() => {
                        navigate(`/product/${product._id}`);
                        window.scrollTo(0, 0);
                      }}
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
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
