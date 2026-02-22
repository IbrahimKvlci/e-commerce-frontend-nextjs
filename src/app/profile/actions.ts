"use server"

import { CustomerInfo } from "@/models/auth/CustomerInfo";
import { CustomerInfoRequest } from "@/models/auth/CustomerInfoRequest";
import { DataResponseModel } from "@/models/response/DataResponseModel";
import CustomerService from "@/services/CustomerService";

export async function getCustomerInfo(): Promise<DataResponseModel<CustomerInfo>> {
    const customerService = new CustomerService();
    const customerInfo = await customerService.getCustomerInfo();
    return customerInfo;
}

export async function updateCustomerInfo(customerInfo: CustomerInfoRequest): Promise<DataResponseModel<CustomerInfo>> {

    if (customerInfo.name == "" || customerInfo.surname == "" || customerInfo.email == "") {
        return {
            data: customerInfo as unknown as CustomerInfo,
            message: "Lütfen tüm alanları doldurun.",
            success: false
        }
    }

    const customerService = new CustomerService();
    const customerInfoResponse = await customerService.updateCustomerInfo(customerInfo);
    return customerInfoResponse;
}