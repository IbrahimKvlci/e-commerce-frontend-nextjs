import { apiGet, apiPost } from "@/lib/serverApi";
import { DisplayProduct } from "@/models/DisplayProduct";
import { ProductSearch } from "@/models/ProductSearch";
import { ProductSearchResponse } from "@/models/ProductSearchResponse";
import { DataResponseModel } from "@/models/response/DataResponseModel";

export default class ProductService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/catalog/products`;

    async getAllDisplayProductsByCategoryId(id: number): Promise<DataResponseModel<DisplayProduct[]>> {
        const products: DataResponseModel<DisplayProduct[]> = await apiGet(`${this.API_URL}/category/${id}/displayProducts`)
        return products;
    }

    async getProductKeywordSuggestions(prefix: string): Promise<DataResponseModel<string[]>> {
        const suggestions: DataResponseModel<string[]> = await apiGet(`${this.API_URL}/search/suggestions`, { prefix })
        return suggestions;
    }

    async searchProducts(productSearch: ProductSearch, page: number): Promise<DataResponseModel<ProductSearchResponse>> {
        const products: DataResponseModel<ProductSearchResponse> = await apiPost(`${this.API_URL}/search?page=${page}`, productSearch)
        return products;
    }

}