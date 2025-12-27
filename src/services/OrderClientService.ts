import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/clientApi";
import { Order } from "@/models/order/Order";
import { DataResponseModel } from "@/models/response/DataResponseModel";

export default class OrderClientService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/orders/orders`;

    async getOrdersOfCustomer(): Promise<DataResponseModel<Order[]>> {
        const response: DataResponseModel<Order[]> = await apiGet(this.API_URL + "/customer");
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
