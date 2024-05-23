import React, { useEffect, useState } from 'react'
import { TailSpin } from "react-loader-spinner"
import { useNavigate, useLocation } from 'react-router-dom'

const Spinner = ({ path = "login" }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [counter, setCounter] = useState(3)

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if (counter === 0) {
            navigate(`/${path}`, {
                state: location.pathname,
            });
        }
        return () => clearInterval(timer);
    }, [counter, navigate, location, path])
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
            <h1 className='text-2xl md:text-3xl'>Redirecting you in {counter} seconds</h1>
            <TailSpin height={70} width={70} color="#000" />
        </div>
    )
}

export default Spinner