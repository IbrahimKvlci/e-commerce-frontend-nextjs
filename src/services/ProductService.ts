import { apiGet } from "@/lib/serverApi";
import { DisplayProduct } from "@/models/DisplayProduct";
import { DataResponseModel } from "@/models/response/DataResponseModel";

export default class ProductService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/catalog/products`;

    async getAllDisplayProductsByCategoryId(id: number): Promise<DataResponseModel<DisplayProduct[]>> {
        const products: DataResponseModel<DisplayProduct[]> = await apiGet(`${this.API_URL}/category/${id}/displayProducts`)
        return products;
    }
}