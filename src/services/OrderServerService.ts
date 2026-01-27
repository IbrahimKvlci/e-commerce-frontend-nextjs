import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/serverApi";
import { Order } from "@/models/order/Order";
import { DataResponseModel } from "@/models/response/DataResponseModel";
import { PageModel } from "@/models/response/PageModel";

export default class OrderServerService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/orders/orders`;

    async getOrdersOfCustomer(): Promise<DataResponseModel<Order[]>> {
        const response: DataResponseModel<Order[]> = await apiGet(this.API_URL + "/customer");
        return response;
    }

    async getActiveOrdersOfCustomer(page: number = 0, size: number = 10): Promise<DataResponseModel<PageModel<Order>>> {
        const response: DataResponseModel<PageModel<Order>> = await apiGet(this.API_URL + "/active-orders", { page, size });
        return response;
    }

    async getOrderById(id: number): Promise<DataResponseModel<Order>> {
        const response: DataResponseModel<Order> = await apiGet(this.API_URL + "/" + id);
        return response;
    }

    async createOrder(order: any): Promise<DataResponseModel<Order>> {
        const response: DataResponseModel<Order> = await apiPost(this.API_URL, order);
        return response;
    }
}
