import { ProductSearch } from "@/models/ProductSearch";
import ProductService from "@/services/ProductService";

export async function searchProducts(productSearch: ProductSearch, page: number, sort: number) {
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
    const productsResponse = await productService.searchProducts(productSearch, page - 1, encodedSortJson);
    return productsResponse;
}