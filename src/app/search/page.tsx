import ProductService from '@/services/ProductService';
import { ChevronDown, Filter, LayoutGrid, List, Star } from 'lucide-react';
import ProductCard from './components/ProductCard';

type Props = {
    searchParams: Promise<{ [key: string]: string }>
}

export default async function SearchPage({ searchParams }: Props) {

    const params = await searchParams;
    const keyword = params.s;

    const productService = new ProductService();
    const productsResponse = await productService.searchProducts(keyword);

    if (!productsResponse.success) {
        return <div>Error: {productsResponse.message}</div>
    }

    const products = productsResponse.data;

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
                                <Filter className="w-4 h-4" /> Filters
                            </button>
                        </div>

                        {/* Desktop Filters (Hidden on mobile for now - user asked for design, sidebar usually hidden on mobile but let's keep it simple structure) */}
                        <div className="hidden lg:block space-y-8">

                            {/* Categories */}
                            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-blue-50">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
                                    Categories
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </h3>
                                <div className="space-y-3">
                                    {['Electronics', 'Audio', 'Accessories', 'Wearables'].map((category) => (
                                        <label key={category} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer w-5 h-5 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500/20 transition-all checked:border-blue-600 checked:bg-blue-600 appearance-none" />
                                                <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 14 14" fill="none">
                                                    <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-600 group-hover:text-blue-600 transition-colors">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-blue-50">
                                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative w-full">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                        <input type="number" placeholder="Min" className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" />
                                    </div>
                                    <span className="text-gray-400">-</span>
                                    <div className="relative w-full">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                        <input type="number" placeholder="Max" className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" />
                                    </div>
                                </div>
                                <button className="w-full py-2 bg-gray-50 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-100 transition-colors">Apply</button>
                            </div>

                            {/* Rating */}
                            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-blue-50">
                                <h3 className="font-semibold text-gray-900 mb-4">Rating</h3>
                                <div className="space-y-2">
                                    {[5, 4, 3, 2].map((rating) => (
                                        <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer w-5 h-5 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500/20 transition-all checked:border-blue-600 checked:bg-blue-600 appearance-none" />
                                                <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 14 14" fill="none">
                                                    <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-gray-200'}`} />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-500 group-hover:text-blue-600">& Up</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Colors */}
                            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-blue-50">
                                <h3 className="font-semibold text-gray-900 mb-4">Colors</h3>
                                <div className="flex flex-wrap gap-3">
                                    {['bg-black', 'bg-white border-gray-200 border', 'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500'].map((color, i) => (
                                        <div key={i} className={`w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-sm ring-2 ring-transparent hover:ring-offset-2 hover:ring-gray-200 ${color}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
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