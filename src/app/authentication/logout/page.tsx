"use client";

import FrontAuthService from "@/services/auth/FrontAuthService";
import { useEffect } from "react";

export default function LogoutPage() {
    const authService =new FrontAuthService();

    useEffect(() => {
        const logout = async () => {
            const res=await authService.logout().then(()=>{
                window.location.href = "/authentication/login";

            });

        }
        logout()
    }, []);




    return(
        "hello"
    )
}