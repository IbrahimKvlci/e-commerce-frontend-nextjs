import Banner from "@/components/Banner";
import DisplayProducts from "@/components/DisplayProducts";
import CategoryService from "@/services/CategoryService";

export default async function Home() {

  const categoryService = new CategoryService()

  const categories = await categoryService.getParentCategoryWithSubcategory()

  return (
    <div className="min-h-screen bg-white">
      <main>
        <div className="mb-[20px]">
          <Banner />
        </div>
        {/* Categories with their own swipers */}
        {categories.data?.map((category, index) => (
          <section key={index} className="mb-12">
            <DisplayProducts category={category} />
          </section>
        ))}
      </main>
    </div>
  );
}
