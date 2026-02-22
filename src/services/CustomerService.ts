import { apiGet, apiPut } from "@/lib/serverApi";
import { CustomerInfo } from "@/models/auth/CustomerInfo";
import { CustomerInfoRequest } from "@/models/auth/CustomerInfoRequest";
import { DataResponseModel } from "@/models/response/DataResponseModel";

export default class CustomerService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/customer`;

    async getCustomerInfo() {
        const customerInfoResponse: DataResponseModel<CustomerInfo> = await apiGet(`${this.API_URL}/me`)
        return customerInfoResponse;
    }

    async updateCustomerInfo(customerInfo: CustomerInfoRequest) {
        const customerInfoResponse: DataResponseModel<CustomerInfo> = await apiPut(`${this.API_URL}/me`, customerInfo)
        return customerInfoResponse;
    }
}