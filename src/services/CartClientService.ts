import { apiGet, apiPut } from "@/lib/clientApi";

export default class CartClientService {

    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/orders/carts/`;

    async getCartByCustomerId(customerId: number) {
        const response: Cart = await apiGet(this.API_URL + customerId);
        return response;
    }

    async updateCart(cart: Cart) {
        const response: Cart = await apiPut(this.API_URL + cart.id, cart);
        return response;
    }

}
