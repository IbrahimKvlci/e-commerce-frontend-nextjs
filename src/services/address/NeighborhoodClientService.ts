import { apiGet } from "@/lib/clientApi";
import { Neighborhood } from "@/models/address/Neighborhood";

export default class NeighborhoodClientService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/address/neighborhoods/`;

    async getNeighborhoodsByDistrict(districtId: number) {
        const response: Neighborhood[] = await apiGet(this.API_URL + "district/" + districtId);
        return response;
    }
}
