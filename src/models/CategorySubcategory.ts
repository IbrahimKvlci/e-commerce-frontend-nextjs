import { Category } from "./Category"

export interface CategorySubcategory{
    id:number,
    name:string
    subcategories:Category[]
}