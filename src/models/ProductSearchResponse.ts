import { Attribute } from "./Attribute";
import { Category } from "./Category";
import { DisplayProduct } from "./DisplayProduct";

export interface ProductSearchResponse {
    products: DisplayProduct[];
    categories: Category[];
    attributes: Attribute[];
}