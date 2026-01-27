"use server"

import { CustomerRegisterRequest } from "@/models/auth/CustomerRegisterRequest";
import { CustomerRegisterResponse } from "@/models/auth/CustomerRegisterResponse";
import { DataResponseModel } from "@/models/response/DataResponseModel";
import AuthService from "@/services/auth/AuthService";

export async function registerCustomer(prevState: any, formData: FormData): Promise<DataResponseModel<CustomerRegisterResponse>> {
    const name = formData.get("firstName") as string;
    const surname = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
        return {
            success: false,
            message: "Parolalar eşleşmiyor!",
            data: {
                email: "",
                name: "",
                lastName: ""
            }
        };
    }

    const authService = new AuthService();
    const customerRegisterRequest: CustomerRegisterRequest = {
        name: name,
        surname: surname,
        email: email,
        password: password,
    };
    const customerRegisterResponse = await authService.customerRegister(customerRegisterRequest);
    console.log(customerRegisterResponse)
    return customerRegisterResponse;
}