import { Attribute } from "./Attribute";

export interface ProductSearch {

    searchTerm: string;
    filters?: Attribute[];

}