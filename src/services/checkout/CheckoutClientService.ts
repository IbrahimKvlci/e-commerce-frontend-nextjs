import { apiPost } from "@/lib/clientApi";
import { CreditCardCheckout } from "@/models/checkout/CreditCardCheckout";
import { SaleResponse } from "@/models/checkout/SaleResponse";
import { DataResponseModel } from "@/models/response/DataResponseModel";

export default class CheckoutClientService {

    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout/`;

    async initiate3DCheckout(creditCardCheckout: CreditCardCheckout): Promise<DataResponseModel<SaleResponse>> {
        const response: DataResponseModel<SaleResponse> = await apiPost(this.API_URL + "initiate/3d", creditCardCheckout);
        return response;
    }
}

