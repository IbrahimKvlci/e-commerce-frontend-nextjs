import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/serverApi";
import { AddressDetail } from "@/models/address/AddressDetail";
import { AddressDetailRequest } from "@/models/address/AddressDetailRequest";
import { DataResponseModel } from "@/models/response/DataResponseModel";

export default class AddressServerService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/address/address-details`;

    async getAddressesOfCustomer(): Promise<DataResponseModel<AddressDetail[]>> {
        const response: DataResponseModel<AddressDetail[]> = await apiGet(this.API_URL + "/customer");
        return response;
    }

    async updateAddress(addressId: number, address: AddressDetailRequest): Promise<DataResponseModel<AddressDetail>> {
        const response: DataResponseModel<AddressDetail> = await apiPut(this.API_URL + "/" + addressId, address);
        return response;
    }

    async deleteAddress(addressId: number) {
        await apiDelete(this.API_URL + addressId);
    }

    async addAddress(address: AddressDetailRequest): Promise<DataResponseModel<AddressDetail>> {
        const response: DataResponseModel<AddressDetail> = await apiPost(this.API_URL, address);
        return response;
    }
}
