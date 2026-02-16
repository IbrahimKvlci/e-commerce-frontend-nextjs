import { ProductSearch } from "@/models/ProductSearch";
import { ProductSearchResponse } from "@/models/ProductSearchResponse";
import { DataResponseModel } from "@/models/response/DataResponseModel";
import ProductService from "@/services/ProductService";

export default async function getProductsByCategoryId(productSearchRequest: ProductSearch, page: number, sort: number): Promise<DataResponseModel<ProductSearchResponse>> {
    let sortPage;
    switch (sort) {
        case 0:
            sortPage = [];
            break;
        case 1:
            sortPage = ["price,asc"];
            break;
        case 2:
            sortPage = ["price,desc"];
            break;
    }
    const sortJson = JSON.stringify(sortPage);
    const encodedSortJson = encodeURIComponent(sortJson);
    const productService = new ProductService();
    const productsResponse = await productService.searchProducts(productSearchRequest, page - 1, encodedSortJson);
    return productsResponse;
}