import { CategorySubcategory } from "@/models/CategorySubcategory";
import CategoryService from "@/services/CategoryService";
import NavbarCategoriesClient from "./NavbarCategoriesClient";

export default async function NavbarCategories() {
    const categoryService = new CategoryService();
    const categories: CategorySubcategory[] =
        await categoryService.getParentCategoryWithSubcategory();

    return <NavbarCategoriesClient categories={categories} />;
}
