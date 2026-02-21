"use client"

import FrontAuthService from "@/services/auth/FrontAuthService";
import { ROUTES } from "@/utils/routes";

export default async function LogoutPage() {
    const authService = new FrontAuthService();

    authService.logout().then(() => {
        window.location.href = ROUTES.login;
    })

    return (
        "hello"
    )
}