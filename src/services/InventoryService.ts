import { apiGet } from "@/lib/serverApi";
import { DisplayInventory } from "@/models/DisplayInventory";
import { DataResponseModel } from "@/models/response/DataResponseModel";

export default class InventoryService {

    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/catalog/inventories`;

    async getDisplayInventoryByProductIdAndSellerId(productId: number, sellerId: number): Promise<DataResponseModel<DisplayInventory>> {
        const inventory: DataResponseModel<DisplayInventory> = await apiGet(`${this.API_URL}/display/${productId}/${sellerId}`)
        return inventory;
    }


}