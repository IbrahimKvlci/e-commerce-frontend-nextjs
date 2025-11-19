import { apiDelete, apiPut } from "@/lib/clientApi";

export default class CartItemService {

    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/orders/cart-items/`;

    async updateCartItem(quantity: number, cartItemId: number) {
        const response: CartProductItem = await apiPut(this.API_URL + cartItemId, { id: cartItemId, quantity: quantity });
        return response;
    }

    async deleteCartItem(cartItemId: number) {
        const response: CartProductItem = await apiDelete(this.API_URL + cartItemId);
        return response;
    }

}