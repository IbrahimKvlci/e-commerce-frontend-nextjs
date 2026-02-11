import { ChevronDown, LayoutGrid, List, Star } from 'lucide-react';
import ProductCard from './components/ProductCard';
import { ProductSearch } from '@/models/ProductSearch';
import { searchProducts } from './action';
import Filter from './components/Filter';

type Props = {
    searchParams: Promise<{ [key: string]: string }>
}

export default async function SearchPage({ searchParams }: Props) {

    const params = await searchParams;
    const keyword = params.s;
    const attributeFromParams = params.attributes ? JSON.parse(decodeURIComponent(params.attributes)) : [];

    const productSearch: ProductSearch = {
        searchTerm: keyword,
        filters: attributeFromParams
    }

    const productsResponse = await searchProducts(productSearch);

    if (!productsResponse.success) {
        return <div>Error: {productsResponse.message}</div>
    }

    const products = productsResponse.data.products;
    const categories = productsResponse.data.categories;
    const attributes = productsResponse.data.attributes;



    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb / Header area */}
                <div className="mb-8 pl-1">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Search Results</h1>
                    <p className="text-gray-500 mt-2">Found {products.length} results for <span className="text-black font-medium">{keyword}</span></p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
                        {/* Mobile Filter Toggle (Visible on mobile only) */}
                        <div className="lg:hidden mb-4">
                            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 p-3 rounded-lg shadow-sm font-medium text-gray-700">
                                Filters
                            </button>
                        </div>

                        <Filter categories={categories} attributes={attributes} />
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
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Sort by:</span>
                                    <div className="relative group">
                                        <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                                            Best Match <ChevronDown className="w-4 h-4" />
                                        </button>
                                        {/* Dropdown mockup */}
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 p-1 hidden group-hover:block z-20">
                                            {['Best Match', 'Price: Low to High', 'Price: High to Low', 'Newest'].map(item => (
                                                <div key={item} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">{item}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
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
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">
                                    <ChevronDown className="w-5 h-5 rotate-90" />
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20">1</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium">2</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium">3</button>
                                <span className="text-gray-400">...</span>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium">8</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">
                                    <ChevronDown className="w-5 h-5 -rotate-90" />
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}