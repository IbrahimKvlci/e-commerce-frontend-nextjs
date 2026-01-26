
export interface SaleResponse {
    saleStatusEnum: string;
    hostMessage: string;
    hostResponseCode: string;
    responseMessage: string;
    order: {
        orderId: string;
    };
    htmlResponse: string;
}
