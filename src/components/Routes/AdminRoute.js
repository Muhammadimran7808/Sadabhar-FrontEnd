import { useAuth } from "../../context/auth"
import { Outlet } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import Spinner from "../Spinner"

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get('/api/v1/auth/admin-auth', {
                    headers: {
                        Authorization: auth.token
                    }
                })
                
                if (res?.data?.ok) {
                    setOk(true);
                }
                else {
                    setOk(false)
                }
            } catch (error) {
                console.log(error);
            }

        }
        // run authCheck function only when token found
        if (auth?.token) { authCheck(); }
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner path="" />
}