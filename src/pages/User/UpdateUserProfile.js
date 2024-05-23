import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

const UpdateUserProfile = () => {
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);

  // Form handling states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  // get previous data of user
  useEffect(() => {
    const { name, phone, address, email } = auth?.user;
    setName(name);
    setPhone(phone);
    setAddress(address);
    setEmail(email);
  }, [auth?.user]);

  // form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`/api/v1/auth/update-profile`, {
        name,
        phone,
        password,
        address,
      });
      if (res?.data?.success) {
        setAuth({ ...auth, user: res.data.updatedUser });

        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = res.data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(res.data.message);
      } 
      else {
        toast.error(res?.data?.error);
        console.log(res?.data?.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some Thing went wrong");
    }
    setLoading(false);
  };

  return (
    <Layout title={"Update Profile - SadaBahar"}>
      <div className="flex items-start gap-2">
        <div>
          <UserMenu />
        </div>
        <div className="mr-10 border border-gray-300 w-3/4 text-gray-700 px-6 pr-28">
          <div className="p-4 space-y-4 md:space-y-6  ">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
              Update Profile
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 ">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 block w-full p-2"
                  placeholder="Jhon due"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-500"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="bg-gray-50 border cursor-not-allowed border-gray-300 text-gray-400 sm:text-sm rounded-md focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 block w-full p-2"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  // minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 block w-full p-2 "
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  placeholder="123456789"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 block w-full p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  placeholder="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 block w-full p-2"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-lg px-5 py-2 flex justify-center "
              >
                {loading ? (
                  <TailSpin height="30" color="#fff" />
                ) : (
                  "Update Profile"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateUserProfile;
