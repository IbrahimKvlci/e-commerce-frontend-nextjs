import FrontAuthService from "@/services/auth/FrontAuthService";

export default async function LogoutPage() {
    const authService =new FrontAuthService();

    authService.logout().then(()=>{
        window.location.href = "/authentication/login";

    })

    return(
        "hello"
    )
}