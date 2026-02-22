import ProductSwiper from "./ProductSwiper";
import { CategorySubcategory } from "@/models/CategorySubcategory";
import ProductService from "@/services/ProductService";
import { ROUTES } from "@/utils/routes";

export default async function DisplayProducts({ category }: { category: CategorySubcategory }) {

    const productService = new ProductService()
    const products = await productService.getAllDisplayProductsByCategoryId(category.id)

    return (
        <div>
            {/* Category Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">{category.name}</h2>
                <a href={ROUTES.category(category.name, category.id.toString())} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Tümünü Gör
                </a>
            </div>

            {/* Product Swiper */}
            <ProductSwiper displayProducts={products.data ?? []} />
        </div>
    )
}