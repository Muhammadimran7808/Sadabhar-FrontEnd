import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/auth/forgot-password`, { email, secretQuestion, newPassword });
      setLoading(false);
      if (res?.data?.success) {
        swal({
          text: res.data.message,
          icon: "success",
          buttons: false,
          timer: 3000
        })
        navigate('/login');
      }
      else {
        swal({
          text: res?.data?.message,
          icon: "error",
          buttons: false,
          timer: 3000
        })
      }

    } catch (error) {
      setLoading(false)
      console.log(error);
      swal({ text: "Some thing went wrong.", icon: "error", timer: 3000 })
    }

  }

  return (
    <Layout title={"Forgot Password | SadaBahar"}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
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
              <label htmlFor="secretQuestion" className="block text-sm font-medium leading-6 text-gray-900">
                What is your favorite sports?
              </label>
              <div className="mt-2">
                <input
                  id="secretQuestion"
                  name="secretQuestion"
                  type='text'
                  value={secretQuestion}
                  onChange={(e) => setSecretQuestion(e.target.value)}
                  autoComplete='none'
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-none focus:ring-inset focus:ring-indigo-600 md:text-lg sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  New Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                {loading ? <TailSpin height="30" color="#fff" /> : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default ForgotPassword