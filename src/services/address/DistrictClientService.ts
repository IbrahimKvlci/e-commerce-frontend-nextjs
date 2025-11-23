import { apiGet } from "@/lib/clientApi";
import { District } from "@/models/address/District";

export default class DistrictClientService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/address/districts/`;

    async getDistrictsByCity(cityId: number) {
        const response: District[] = await apiGet(this.API_URL + "city/" + cityId);
        return response;
    }
}
