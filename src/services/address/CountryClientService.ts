import { apiGet } from "@/lib/clientApi";
import { Country } from "@/models/address/Country";

export default class CountryClientService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/address/countries`;

    async getCountries() {
        const response: Country[] = await apiGet(this.API_URL);
        return response;
    }
}