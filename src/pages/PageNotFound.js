import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
      <Layout title={"Go back - Page not found | SadaBahar"}>
      <div className="grid place-items-center px-6 py-14 sm:py-24 lg:px-8">
        <div className="text-center">
          <p className="font-bold text-7xl">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={'/'}
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link to={'/contact'} className="text-sm font-semibold text-gray-500">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
      </Layout>
  )
}

export default PageNotFound