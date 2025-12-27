import { apiGet } from "@/lib/clientApi";
import { City } from "@/models/address/City";
import { DataResponseModel } from "@/models/response/DataResponseModel";

export default class CityClientService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/address/cities/`;

    async getCitiesByCountry(countryId: number): Promise<DataResponseModel<City[]>> {
        const response: DataResponseModel<City[]> = await apiGet(this.API_URL + "country/" + countryId);
        return response;
    }
}
