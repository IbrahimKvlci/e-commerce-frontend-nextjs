import ProductList from "@/components/produtct-list/ProductList";
import getProductsByCategoryId from "./action";
import { ProductSearch } from "@/models/ProductSearch";

type Props = {
    params: Promise<{ [key: string]: string }>
    searchParams: Promise<{ [key: string]: string }>
}

export default async function CategoryPage({ params, searchParams }: Props) {
    const sParams = await searchParams;
    const pParams = await params;
    console.log(pParams);
    const categoryId = pParams.slug.split('-c-').pop();
    console.log(categoryId);

    const minPrice = sParams.minPrice ? Number(sParams.minPrice) : undefined;
    const maxPrice = sParams.maxPrice ? Number(sParams.maxPrice) : undefined;
    const page = sParams.page ? Number(sParams.page) : 1;
    const sort = sParams.sort ? Number(sParams.sort) : 0;
    const attributeFromParams = sParams.attributes ? JSON.parse(decodeURIComponent(sParams.attributes)) : [];

    if (!categoryId) {
        return <div>Category not found</div>;
    }

    const productSearchRequest: ProductSearch = {
        categoryIds: [parseInt(categoryId)],
        filters: attributeFromParams,
        minPrice: minPrice,
        maxPrice: maxPrice,
    };

    const productsResponse = await getProductsByCategoryId(productSearchRequest, page, sort);

    const products = productsResponse.data?.products.content;
    const categories = productsResponse.data?.categories;
    const attributes = productsResponse.data?.attributes;
    const totalPages = productsResponse.data?.products.totalPages;
    const totalElements = productsResponse.data?.products.totalElements;

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb / Header area */}
                <div className="mb-8 pl-1">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Category {categoryId}</h1>
                    <p className="text-gray-500 mt-2">Found {products?.length} results</p>
                </div>

                <ProductList
                    products={products!}
                    categories={categories!}
                    attributes={attributes!}
                    params={{ category: categoryId.toString() }}
                    page={page}
                    totalPages={totalPages!}
                />
            </div>
        </div>
    );
}