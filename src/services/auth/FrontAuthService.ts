import { apiPost } from "@/lib/api";
import { AuthLogin } from "@/models/AuthLogin";

export default class FrontAuthService{
    async login(authLogin:AuthLogin){
        const res=await apiPost(`/api/auth/login`,authLogin)
        return res;
    }
}