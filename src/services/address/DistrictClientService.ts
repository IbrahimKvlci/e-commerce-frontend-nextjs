import { apiGet } from "@/lib/clientApi";
import { District } from "@/models/address/District";
import { DataResponseModel } from "@/models/response/DataResponseModel";

export default class DistrictClientService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/address/districts/`;

    async getDistrictsByCity(cityId: number): Promise<DataResponseModel<District[]>> {
        const response: DataResponseModel<District[]> = await apiGet(this.API_URL + "city/" + cityId);
        return response;
    }
}
