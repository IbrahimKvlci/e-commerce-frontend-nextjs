import { apiDelete, apiPost, apiPut } from "@/lib/clientApi";
import { DataResponseModel } from "@/models/response/DataResponseModel";

export default class CartItemService {

    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/orders/cart-items`;

    async updateCartItem(quantity: number, cartItemId: number): Promise<DataResponseModel<CartProductItem>> {
        const response: DataResponseModel<CartProductItem> = await apiPut(this.API_URL + "/" + cartItemId, { id: cartItemId, quantity: quantity });
        return response;
    }

    async deleteCartItem(cartItemId: number): Promise<DataResponseModel<CartProductItem>> {
        const response: DataResponseModel<CartProductItem> = await apiDelete(this.API_URL + "/" + cartItemId);
        return response;
    }

    async addCartItem(addCartItemRequest: AddCartItemRequest): Promise<DataResponseModel<CartProductItem>> {
        console.log(addCartItemRequest);
        const response: DataResponseModel<CartProductItem> = await apiPost(this.API_URL, addCartItemRequest)
        return response;
    }

}