import { OrderItem } from "./OrderItem";

export interface Order {
    id: number;
    orderNumber: string;
    customerId: number;
    customerName: string;
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED';
    totalAmount: number;
    currencyCode: string;
    installCount: number;
    notes: string;
    createdAt: string;
    updatedAt: string;
    orderItems: OrderItem[];
}