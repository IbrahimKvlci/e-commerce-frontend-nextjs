import { apiGet, apiPut } from "@/lib/clientApi";
import { DataResponseModel } from "@/models/response/DataResponseModel";

export default class CartClientService {

    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/orders/carts/`;

    async getCartOfCustomer(): Promise<DataResponseModel<Cart>> {
        const response: DataResponseModel<Cart> = await apiGet(this.API_URL + "customer");
        return response;
    }

    async updateCart(cart: Cart): Promise<DataResponseModel<Cart>> {
        const response: DataResponseModel<Cart> = await apiPut(this.API_URL + cart.id, cart);
        return response;
    }

}
