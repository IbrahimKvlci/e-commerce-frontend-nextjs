import { Attribute } from "./Attribute";

export interface ProductCategoryRequest {

    categoryId: number;
    filters?: Attribute[];
    minPrice?: number;
    maxPrice?: number;

}