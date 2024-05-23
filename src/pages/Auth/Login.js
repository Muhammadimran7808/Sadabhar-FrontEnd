import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import { useNavigate, useLocation } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import { useAuth } from '../../context/auth'


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/auth/login`, { email, password });
      setLoading(false);

      if (res.data.success) {
        swal({
          text: "Wellcome Back " + res.data.user.name,
          icon: "success",
          buttons: false,
          timer: 3000
        })
        setAuth({
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem("auth", JSON.stringify(res.data))
        navigate(location.state || '/');

      } else {
        swal({ text: res.data.message, icon: "error", button: false, timer: 3000 })
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      swal({ text: "Some thing went wrong. Check your internet connection", icon: "error", timer: 3000 })
    }
  }

  return (
    <Layout title={"Customer Login | SadaBahar"}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 md:text-lg sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to={'/forgot-password'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 md:text-lg sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full h-11 justify-center rounded-md bg-indigo-500 px-3 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? <TailSpin height="30" color="#fff" /> : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have accout?{' '}
            <Link to={'/register'} className="font-semibold leading-6 text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Login