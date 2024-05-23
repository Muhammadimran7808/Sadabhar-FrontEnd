import React, { useState } from 'react'
import Layout from "../../components/layout/Layout"
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import swal from "sweetalert"
import axios from "axios"
import { TailSpin } from "react-loader-spinner"

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  // Form handling states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [secretQuestion, setsecretQuestion] = useState("");

  // form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post(`/api/v1/auth/register`, { name, email, phone, password, address, secretQuestion });
      setLoading(false)
      if (res.data.success) {
        swal({
          text: res.data.message,
          icon: "success",
          buttons: false,
          timer: 3000
        });
        navigate('/login')
      } else {
        swal({
          text: res.data.message,
          icon: "error",
          buttons: false,
          timer: 4000
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Some Thing wrong")
    }
  }

  return (
    <Layout title={"Customer Registration | SadaBahar"}>
      <section className="bg-gray-50 py-5">
        <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto lg:py-0">
          <div className="reg-container w-full bg-white  md:mt-0 sm:max-w-lg xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 className="reg text-center text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
                Registration Form
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 ">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sg font-medium text-gray-900"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 block w-full p-2.5"
                    placeholder="Jhon due"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
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
                    value={password}
                    minLength={6}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 block w-full p-2.5 "
                    required
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 block w-full p-2.5"
                    required
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="secretQuestion"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    What is your favorite sports?
                  </label>
                  <input
                    type="text"
                    name="secretQuestion"
                    value={secretQuestion}
                    onChange={(e) => setsecretQuestion(e.target.value)}
                    id="secretQuestion"
                    placeholder="Cricket"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className=" text-gray-900 ">
                      I accept the{" "}
                      <Link
                        to={"/policy"}
                        className="font-medium text-primary-600 hover:underline"
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2 flex justify-center "
                >
                  {loading ? (
                    <TailSpin height="30" color="#fff" />
                  ) : (
                    "Create account"
                  )}
                </button>
                <p className="text-sm  text-gray-900 ">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    href="#"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Register