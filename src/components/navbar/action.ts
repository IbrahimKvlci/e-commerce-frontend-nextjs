"use server"

import ProductService from "@/services/ProductService";

export async function getSuggestions(keyword: string) {

    const productService = new ProductService();
    const suggestions = await productService.getProductKeywordSuggestions(keyword);
    return suggestions;
}