"use server"

import OrderServerService from "@/services/OrderServerService";

export async function getActiveOrdersOfCustomer(page: number, size: number = 2) {
    const orderService = new OrderServerService();
    const ordersResponse = await orderService.getActiveOrdersOfCustomer(page, size);
    if (!ordersResponse.success) {
        throw new Error(ordersResponse.message);
    }

    return ordersResponse.data;
}