import { CustomerRegisterResponse } from '@/models/auth/CustomerRegisterResponse';
import { CustomerRegisterRequest } from './../../models/auth/CustomerRegisterRequest';
import { AuthLogin } from './../../models/AuthLogin';
import { apiPost } from "@/lib/clientApi";
import { AuthInfo } from "@/models/AuthInfo";
import { DataResponseModel } from '@/models/response/DataResponseModel';
import { CustomerVerifyCodeRequest } from '@/models/auth/CustomerVerifyCodeRequest';

export default class AuthService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

    async login(authLogin: AuthLogin) {
        const authInfo: AuthInfo = await apiPost(`${this.API_URL}/login`, authLogin)
        return authInfo;
    }

    async customerRegister(customerRegisterRequest: CustomerRegisterRequest) {
        const customerRegisterResponse: DataResponseModel<CustomerRegisterResponse> = await apiPost(`${this.API_URL}/customer/register`, customerRegisterRequest)
        return customerRegisterResponse;
    }

    async customerVerifyCode(customerVerifyCodeRequest: CustomerVerifyCodeRequest) {
        const customerVerifyCodeResponse: DataResponseModel<CustomerRegisterResponse> = await apiPost(`${this.API_URL}/customer/verify`, customerVerifyCodeRequest)
        return customerVerifyCodeResponse;
    }



}