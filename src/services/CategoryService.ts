import { apiGet } from "@/lib/serverApi";
import { Category } from "@/models/Category";
import { CategorySubcategory } from "@/models/CategorySubcategory";

export default class CategoryService{
    private API_URL=`${process.env.NEXT_PUBLIC_API_URL}/catalog/categories`;

    async getParentCategories(){
        const categories:Category[]=await apiGet(`${this.API_URL}/parents`)
        return categories;
    }

    async getSubcategories(parentId:number){
        const categories:Category[]=await apiGet(`${this.API_URL}/subcategories/${parentId}`)
        return categories;
    }

    async getParentCategoryWithSubcategory(){
        const categories:CategorySubcategory[]=await apiGet(`${this.API_URL}/parentsWithSubcategories`)
        return categories;
    }
}