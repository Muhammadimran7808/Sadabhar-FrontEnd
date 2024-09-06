import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import toast from "react-hot-toast";
import { Prices } from "../components/Prices";
import axios from "axios";
import { Button } from "@mui/material";
import { Checkbox, Radio } from "antd";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { RiFilterLine, RiFilterFill } from "react-icons/ri";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // get all categories
  const getAllCategories = async () => {
    // setLoading(true);
    try {
      const res = await axios.get("/api/v1/category/all-categories");
      if (res?.data?.success) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong while getting category");
    }
    // setLoading(false);
  };

  // Get products per page request
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/products/products-list/${page}`);
      if (res?.data?.success) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setPage(page - 1); //this is seting paginaion
    }
    setLoading(false);
  };

  // load more
  const loadMore = async () => {
    setLoadMoreLoading(true);
    try {
      const res = await axios.get(`/api/v1/products/products-list/${page}`);
      if (res?.data?.success) {
        setProducts([...products, ...res.data.products]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong");
    }
    setLoadMoreLoading(false);
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page]);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((e) => e !== id);
    }
    setChecked(all);
    setPage(1); //this is seting paginaion to one
  };

  // filtered product request
  const filteredProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/products/product-filter", {
        checked,
        radio,
      });
      if (res?.data?.success) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong");
    }
    setLoading(false);
  };

  // get total products count
  const getTotal = async () => {
    try {
      const res = await axios.get("/api/v1/products/products-count");
      if (res?.data?.success) {
        setTotal(res.data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked?.length && !radio?.length) getAllProducts();
    // eslint-disable-next-line
  }, [checked, radio]);

  useEffect(() => {
    if (checked?.length || radio?.length) filteredProducts();
    // eslint-disable-next-line
  }, [checked, radio]);

  // stop scrolling when spinner is loading
  let body = document.querySelector("body");
  if (loading) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }

  return (
    <Layout
      title={
        "SadaBahar - Pakistani Fashion | Shop Latest Kurta, Suits, and Western Wear - Official Online Store"
      }
    >
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="inline-block fixed z-[99]  md:hidden border mt-1 ml-1"
      >
        {isOpen ? <RiFilterFill size={23} /> : <RiFilterLine size={23} />}
      </span>
      <div className="flex">
        {/* Filter bar */}
        <div
          className={`filter-bar md:block top-32 border md:px-4 mobile:w-[70%] bg-white ${
            isOpen ? "block " : "hidden"
          }`}
        >
          {/* category filter  */}
          <div>
            <h6 className="border text-center text-xl font-bold">
              Filter by Category
            </h6>
            <div className="flex flex-col m-5">
              {categories?.map((category) => (
                <Checkbox
                  className="mb-1 text-base"
                  key={category._id}
                  onChange={(e) => {
                    handleFilter(e.target.checked, category._id);
                    setIsOpen(false);
                  }}
                >
                  {category.name}
                </Checkbox>
              ))}
            </div>
          </div>

          {/* price Filter */}
          <div>
            <h6 className="border text-center text-xl font-bold">
              Filter by Price
            </h6>
            <div className="flex flex-col m-5">
              <Radio.Group
                onChange={(e) => {
                  setRadio(e.target.value);
                  setPage(1);
                }}
              >
                {Prices?.map((p) => (
                  <div key={p._id} className="mb-1 text-lg">
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="ml-7">
            <Button
              onClick={() => window.location.reload()}
              variant="contained"
              color="error"
              size="medium"
            >
              RESET FILTER
            </Button>
          </div>
        </div>

        {/* Products section */}
        <div className="w-full  border text-center px-3 pt-5">
          <h1 className="text-2xl font-bold">All Products</h1>
          {loading ? (
            <div className="loader-div">
              <TailSpin color="rgb(37 99 235)" />
            </div>
          ) : (
            ""
          )}
          <div className="product-container">
            {products?.map((product) => (
              <div
                key={product._id}
                className="rounded overflow-hidden shadow-lg"
              >
                <div className="border overflow-hidden">
                  <img
                    className="image-transition hover:scale-110 w-full md:h-80 h-52"
                    src={`https://sadabahar-backend.vercel.app/api/v1/products/product-picture/${product?._id}`}
                    loading="lazy"
                    alt={product.name}
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
                  <p className="text-gray-700 md:text-base text-xs">
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
          <div className="m-4 p-2">
            {products && products?.length < total && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                variant="contained"
                color="primary"
                size="medium"
              >
                {loadMoreLoading ? (
                  <TailSpin height={"25px"} color="#fff" />
                ) : (
                  "Load more"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
