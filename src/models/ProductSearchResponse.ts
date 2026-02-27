import { Attribute } from "./Attribute";
import { Category } from "./Category";
import { DisplayProduct } from "./DisplayProduct";
import { PageModel } from "./response/PageModel";

export interface ProductSearchResponse {
    products: PageModel<DisplayProduct>;
    categories: Category[];
    attributes: Attribute[];
    categoryName?: string;
}