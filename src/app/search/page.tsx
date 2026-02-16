import { ProductSearch } from '@/models/ProductSearch';
import { searchProducts } from './action';
import ProductList from '@/components/produtct-list/ProductList';

type Props = {
    searchParams: Promise<{ [key: string]: string }>
}

export default async function SearchPage({ searchParams }: Props) {

    const params = await searchParams;
    const keyword = params.s;
    const categoryId = Number(params.category);
    const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
    const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
    const page = params.page ? Number(params.page) : 1;
    const sort = params.sort ? Number(params.sort) : 0;
    const attributeFromParams = params.attributes ? JSON.parse(decodeURIComponent(params.attributes)) : [];

    const productSearch: ProductSearch = {
        searchTerm: keyword,
        filters: attributeFromParams,
        minPrice: minPrice,
        maxPrice: maxPrice,
        categoryIds: categoryId ? [categoryId] : []
    }

    const productsResponse = await searchProducts(productSearch, page, sort);

    if (!productsResponse.success) {
        return <div>Error: {productsResponse.message}</div>
    }

    const products = productsResponse.data.products.content;
    const categories = productsResponse.data.categories;
    const attributes = productsResponse.data.attributes;
    const totalPages = productsResponse.data.products.totalPages;
    const totalElements = productsResponse.data.products.totalElements;


    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb / Header area */}
                <div className="mb-8 pl-1">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Search Results</h1>
                    <p className="text-gray-500 mt-2">Found {totalElements} results for <span className="text-black font-medium">{keyword}</span></p>
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