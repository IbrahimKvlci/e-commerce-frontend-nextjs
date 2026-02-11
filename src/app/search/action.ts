import { ProductSearch } from "@/models/ProductSearch";
import ProductService from "@/services/ProductService";

export async function searchProducts(productSearch: ProductSearch) {
    const productService = new ProductService();
    console.log("Product search:", productSearch.filters);
    const productsResponse = await productService.searchProducts(productSearch);
    return productsResponse;
}