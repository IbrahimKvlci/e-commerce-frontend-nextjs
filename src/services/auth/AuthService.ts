import { AuthLogin } from './../../models/AuthLogin';
import { apiPost } from "@/lib/api";
import { AuthInfo } from "@/models/AuthInfo";

export default class AuthService{
    private API_URL=`${process.env.NEXT_PUBLIC_API_URL}/auth`;

    async login(authLogin:AuthLogin){
        const authInfo:AuthInfo=await apiPost(`${this.API_URL}/login`,authLogin)
        return authInfo;
    }
}