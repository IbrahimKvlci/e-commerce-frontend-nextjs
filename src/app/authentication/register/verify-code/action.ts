"use server"

import { CustomerRegisterResponse } from "@/models/auth/CustomerRegisterResponse";
import { CustomerVerifyCodeRequest } from "@/models/auth/CustomerVerifyCodeRequest";
import { DataResponseModel } from "@/models/response/DataResponseModel";
import AuthService from "@/services/auth/AuthService";

export async function verifyCustomer(email: string, code: string): Promise<DataResponseModel<CustomerRegisterResponse>> {

    const authService = new AuthService();
    const customerVerifyCodeRequest: CustomerVerifyCodeRequest = {
        email: email,
        code: code,
    };
    const res = await authService.customerVerifyCode(customerVerifyCodeRequest);
    return res;
}