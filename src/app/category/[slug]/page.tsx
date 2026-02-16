import ProductList from "@/components/produtct-list/ProductList";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const lastSlug = slug[slug.length - 1];
    const categoryId = lastSlug.split('-c-').pop();


    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb / Header area */}
                <div className="mb-8 pl-1">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Category {categoryId}</h1>
                    <p className="text-gray-500 mt-2">Found {products.length} results for <span className="text-black font-medium">{keyword}</span></p>
                </div>

                <ProductList
                    products={products}
                    categories={categories}
                    attributes={attributes}
                    params={{ category: categoryId.toString() }}
                    page={page}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
}