import { DisplayProduct } from "@/models/DisplayProduct";
import { Category } from "@/models/Category";
import { Attribute } from "@/models/Attribute";
import { LayoutGrid, List } from "lucide-react";
import Filter from "@/components/produtct-list/Filter";
import Sort from "@/components/produtct-list/Sort";
import PageArrowButton from "@/components/produtct-list/PageArrowButton";
import PageButton from "@/components/produtct-list/PageButton";
import ProductCard from "./ProductCard";

interface ProductListProps {
    products: DisplayProduct[];
    categories: Category[];
    attributes: Attribute[];
    params: {
        category: string;
    };
    page: number;
    totalPages: number;
}

export default async function ProductList({ products, categories, attributes, params, page, totalPages }: ProductListProps) {
    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
                    {/* Mobile Filter Toggle (Visible on mobile only) */}
                    <div className="lg:hidden mb-4">
                        <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 p-3 rounded-lg shadow-sm font-medium text-gray-700">
                            Filters
                        </button>
                    </div>

                    <Filter key={params.category} categories={categories} attributes={attributes} />
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Toolbar */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                <List className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <Sort />
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product.productId}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination Mockup */}
                    <div className="mt-12 flex justify-center">
                        <div className="flex items-center gap-2">
                            {page > 1 && (
                                <PageArrowButton page={page - 1} direction="left" />
                            )}
                            {
                                <>
                                    {page > 2 && (
                                        <>
                                            <PageButton key={1} page={1} />
                                            <p>...</p>
                                        </>
                                    )}
                                    {page > 1 && (
                                        <PageButton key={page - 1} page={page - 1} />
                                    )}
                                    <button key={page} className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">{page}</button>
                                    {Array.from({ length: page <= totalPages - 2 ? 2 : totalPages - page }, (_, index) => index + 1).map((p) => (
                                        <PageButton key={p} page={page + p} />
                                    ))}
                                    {page < totalPages - 2 && (
                                        <>
                                            <p>...</p>
                                            <PageButton key={totalPages} page={totalPages} />
                                        </>
                                    )}
                                </>
                            }
                            {page < totalPages && (
                                <PageArrowButton page={page + 1} direction="right" />
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}