import { apiGet } from "@/lib/serverApi";
import { Category } from "@/models/Category";
import { CategorySubcategory } from "@/models/CategorySubcategory";
import { DataResponseModel } from "@/models/response/DataResponseModel";

export default class CategoryService {
    private API_URL = `${process.env.NEXT_PUBLIC_API_URL}/catalog/categories`;

    async getParentCategories(): Promise<DataResponseModel<Category[]>> {
        const categories: DataResponseModel<Category[]> = await apiGet(`${this.API_URL}/parents`)
        return categories;
    }

    async getSubcategories(parentId: number): Promise<DataResponseModel<Category[]>> {
        const categories: DataResponseModel<Category[]> = await apiGet(`${this.API_URL}/subcategories/${parentId}`)
        return categories;
    }

    async getParentCategoryWithSubcategory(): Promise<DataResponseModel<CategorySubcategory[]>> {
        const categories: DataResponseModel<CategorySubcategory[]> = await apiGet(`${this.API_URL}/parentsWithSubcategories`)
        return categories;
    }
}