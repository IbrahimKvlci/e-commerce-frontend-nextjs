import { apiGet } from "@/lib/clientApi";
import { City } from "@/models/address/City";

export default class CityClientService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/address/cities/`;

    async getCitiesByCountry(countryId: number) {
        const response: City[] = await apiGet(this.API_URL + "country/" + countryId);
        return response;
    }
}
