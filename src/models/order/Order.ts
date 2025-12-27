import { OrderItem } from "./OrderItem";

export interface Order {
    id: number;
    orderNumber: string;
    customerId: number;
    customerName: string;
    status: string;
    totalAmount: number;
    currencyCode: string;
    installCount: number;
    notes: string;
    createdAt: string;
    updatedAt: string;
    orderItems: OrderItem[];
}