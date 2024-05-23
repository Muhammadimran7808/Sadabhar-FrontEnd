import React from 'react'
import { BsFacebook } from "react-icons/bs"
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"
import { RiTwitterXFill } from "react-icons/ri"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full text-gray-400 bg-gray-900 body-font pb-8 mt-16">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <div className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">SadaBahar</span>
        </div>
        <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2023 All Right Reserved SadaBahar —
          <a href="https://twitter.com/knyttneve" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@imran</a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start md:mr-4">
          <Link
            to={"https://www.facebook.com/profile.php?id=100052821680235&mibextid=ZbWKwL"} target='_blank'
            className="text-gray-400 hover:text-white">
            <BsFacebook size={25} />
          </Link>

          <Link
            to={"https://instagram.com/yes_itx_imran"} target='_blank'
            className="ml-3 text-gray-400 hover:text-white">
            <FaInstagram size={25} />
          </Link>

          <Link
            to={"https://github.com/Muhammadimran7808"} target='_blank'
            className="ml-3 text-gray-400 hover:text-white">
            <FaGithub size={25} />
          </Link>

          <Link className="ml-3 text-gray-400 hover:text-white">
            <RiTwitterXFill size={25} />
          </Link>

          <Link className="ml-3 text-gray-400 hover:text-white">
            <FaLinkedin size={25} />
          </Link>
        </span>
      </div>
      <div className='flex flex-wrap items-start justify-center gap-2 pl-2'>
        <Link to={"/"} className=" hover:text-white">Home</Link>|
        <Link to={"/category"} className=" hover:text-white">Category</Link>|
        <Link to={"/about"} className=" hover:text-white">About</Link>|
        <Link to={"/contact"} className=" hover:text-white">Contact</Link>|
        <Link to={"/policy"} className=" hover:text-white">Privacy Policy</Link>
      </div>
    </footer>
  )
}

export default Footer