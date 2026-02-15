import { Attribute } from "./Attribute";

export interface ProductSearch {

    searchTerm: string;
    categoryIds?: number[];
    filters?: Attribute[];
    minPrice?: number;
    maxPrice?: number;

}