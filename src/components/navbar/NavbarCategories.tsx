import CategoryService from "@/services/CategoryService";
import NavbarCategoriesClient from "./NavbarCategoriesClient";

export default async function NavbarCategories() {
    const categoryService = new CategoryService();

    const categoriesResponse = await categoryService.getParentCategoryWithSubcategory();
    return <NavbarCategoriesClient categories={categoriesResponse.data} />;
}
