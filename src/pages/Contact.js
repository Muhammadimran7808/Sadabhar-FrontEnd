import React from 'react'
import Layout from '../components/layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi"

const Contact = () => {
    return (
        <Layout title={"Contact Us - SadaBahar"}>
            <div className='flex items-center justify-center gap-3 md:flex-row flex-col'>
                <img className=' md:w-2/5 md:m-5 m-3 select-none' src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740&t=st=1716527330~exp=1716527930~hmac=8f3d774016e5181a15dc92eeb1cba165d42355788aa74d8e26d74cfc9880d35e" alt="contact us" />
                <div className='md:w-4/12 mx-10 mb-24'>
                    <div className='bg-indigo-500 text-center md:pb-4 md:pt-3 md:mb-3 text-white md:text-5xl text-4xl'>contact us</div>
                    <p className='text-lg pt-6'>any query and info about product feel free to call any time. we 24x7 available</p>
                    <p className='flex items-center gap-2 mt-2'><BiMailSend/>: azmatfareed787@gmail.com</p>
                    <p className='flex items-center gap-2 mt-2'><BiPhoneCall/>: 03003348155</p>
                    <p className='flex items-center gap-2 mt-2'><BiSupport/>: 1800-0000-0000 (toll free)</p>
                </div>
            </div>
        </Layout>
    )
}

export default Contact
