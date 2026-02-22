"use server"

import { DisplayInventory } from "@/models/DisplayInventory";
import { DataResponseModel } from "@/models/response/DataResponseModel";
import CartItemService from "@/services/CartItemService";
import CartService from "@/services/CartService";
import InventoryService from "@/services/InventoryService";

export async function getDisplayInventoryByProductIdAndSellerId(productId: number, sellerId: number): Promise<DataResponseModel<DisplayInventory>> {
    const inventoryService = new InventoryService();
    const inventory: DataResponseModel<DisplayInventory> = await inventoryService.getDisplayInventoryByProductIdAndSellerId(productId, sellerId);
    return inventory;
}

export async function addToCart(productId: number, sellerId: number): Promise<DataResponseModel<CartProductItem>> {
    const cartService = new CartService();
    const cart: DataResponseModel<Cart> = await cartService.getCartOfCustomer();
    if (!cart.success || !cart.data) {
        return { success: false, message: cart.message, data: null };
    }
    const addCartItemRequest: AddCartItemRequest = {
        cartId: cart.data.id,
        productId: productId,
        sellerId: sellerId,
        quantity: 1
    }
    const cartItemService = new CartItemService();
    const cartProductItem: DataResponseModel<CartProductItem> = await cartItemService.addCartItem(addCartItemRequest);
    return cartProductItem;
}
