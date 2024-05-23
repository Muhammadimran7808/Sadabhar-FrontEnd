import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Button } from "@mui/material";
import { FaUserEdit } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  // delete cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // payment gateway token
  const getClientToken = async () => {
    try {
      const res = await axios.get("/api/v1/products/braintree/token");
      if (res?.status === 200) {
        setClientToken(res?.data?.clientToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClientToken();
  }, [auth?.user]);

  // handle payment
  const handlePayment = async () => {
    setLoading(true);
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/products/braintree/payment", {
        nonce,
        cart,
      });
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment completed successfully");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="container text-center">
          <div>
            <h1 className="text-xl">Hello {auth?.token && auth?.user?.name}</h1>
            <h3>
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart. ${
                    auth?.token ? "" : "Please Login to checkout"
                  }`
                : "Your Cart Is Empty."}
            </h3>
          </div>

          <div className="flex md:flex-row flex-col justify-around flex-wrap">
            <div className="min-w-[50%]">
              {cart?.map((product) => (
                <div key={product._id} className="flex px-6 gap-12 py-1">
                  <div>
                    <img
                      className="md:h-40 h-40"
                      src={`https://sadabahar-backend.onrender.com/api/v1/products/product-picture/${product?._id}`}
                      loading="lazy"
                      alt={product.name}
                    />
                  </div>
                  <div className="text-start">
                    <p>{product?.name}</p>
                    <p>{product?.description?.substring(0, 30)}...</p>
                    <p>price: $ {product?.price}</p>
                    <Button
                      onClick={() => removeCartItem(product._id)}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="min-w-[50%] text-center pt-8">
              <div>
                <h1 className="text-lg font-semibold">Cart Summary</h1>
                <hr />
                <p className="mt-2">Total | CheckOut | Payment</p>
                <h3 className="text-xl font-semibold">
                  Total : {totalPrice()}
                </h3>
              </div>
              {auth?.user?.address ? (
                <div className="flex justify-center items-center gap-5 mt-2">
                  <h3 className="mt-2">
                    Shipping Address : {auth.user.address}
                  </h3>
                  <Tooltip title="Edit Shipping Address" arrow>
                    <IconButton
                      onClick={() => navigate("/dashboard/user/update-profile")}
                    >
                      <FaUserEdit size={25} />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : (
                <div>
                  {auth?.token ? (
                    ""
                  ) : (
                    <div>
                      <Button
                        onClick={() => navigate("/login", { state: "/cart" })}
                        variant="contained"
                      >
                        Please Login To Chechout
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* payment */}
              {!clientToken || !cart.length ? (
                ""
              ) : (
                <div>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    disabled={loading || !instance || !auth?.user?.address}
                    onClick={handlePayment}
                  >
                    {loading ? "processing ...." : "Make Payment"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
