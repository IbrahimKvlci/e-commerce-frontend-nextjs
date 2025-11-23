import { apiDelete, apiGet, apiPut } from "@/lib/clientApi";
import { AddressDetail } from "@/models/address/AddressDetail";
import { AddressDetailRequest } from "@/models/address/AddressDetailRequest";

export default class AddressClientService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/address/address-details/`;

    async getAddressesOfCustomer() {
        const response: AddressDetail[] = await apiGet(this.API_URL + "customer");
        return response;
    }

    async updateAddress(addressId: number, address: AddressDetailRequest) {
        console.log(address);
        const response: AddressDetail = await apiPut(this.API_URL + addressId, address);
        return response;
    }

    async deleteAddress(addressId: number) {
        await apiDelete(this.API_URL + addressId);
    }
}