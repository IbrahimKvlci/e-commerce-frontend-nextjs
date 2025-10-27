
import ProductSwiper from "@/components/ProductSwiper";
import CategoryService from "@/services/CategoryService";
import ProductService from "@/services/ProductService";


export default async function Home() {

  const productService=new ProductService()
  const categoryService=new CategoryService()

  const [products,categories]=await Promise.all([
    productService.getAllDisplayProductsByCategoryId(2),
    categoryService.getParentCategoryWithSubcategory()
  ])


  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Categories with their own swipers */}
        {categories.map((category, index) => (
          <section key={index} className="mb-12">
            {/* Category Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">{category.name}</h2>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Tümünü Gör
              </a>
            </div>
            
            {/* Product Swiper */}
            <ProductSwiper displayProducts={products} />
          </section>
        ))}
      </main>
    </div>
  );
}
