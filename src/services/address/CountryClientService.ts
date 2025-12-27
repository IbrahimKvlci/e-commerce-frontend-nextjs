import { apiGet } from "@/lib/clientApi";
import { Country } from "@/models/address/Country";
import { DataResponseModel } from "@/models/response/DataResponseModel";

export default class CountryClientService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/address/countries`;

    async getCountries(): Promise<DataResponseModel<Country[]>> {
        const response: DataResponseModel<Country[]> = await apiGet(this.API_URL);
        return response;
    }
}