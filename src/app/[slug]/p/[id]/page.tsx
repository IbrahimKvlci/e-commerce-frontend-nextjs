import { Fragment } from "react";
import { ChevronRight, Heart, Minus, Plus, RotateCcw, Share2, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { getDisplayInventoryByProductIdAndSellerId } from "./action";
import { formatPrice } from "@/utils/formatters";
import AddToCartBtn from "./components/AddToCartBtn";

interface PageProps {
    params: {
        slug: string;
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

export default async function ProductPage(props: PageProps) {
    const { slug, id } = await props.params;
    const searchParams = await props.searchParams;
    const sellerId = Number(searchParams.seller);
    console.log(sellerId, id, slug);

    const inventoryResponse = await getDisplayInventoryByProductIdAndSellerId(Number(id), Number(sellerId));

    if (!inventoryResponse.success || !inventoryResponse.data) {
        return (
            <div className="bg-white min-h-screen font-sans text-neutral-900 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-3xl font-bold text-neutral-900">Product Not Found</h1>
                </div>
            </div>
        )
    }

    const inventory = inventoryResponse.data;
    const productTitle = inventory.inventoryDTO.productDTO.title;
    const productBrand = inventory.inventoryDTO.productDTO.brandDTO.name;
    const productDescription = inventory.inventoryDTO.productDTO.description;
    const productPrice = inventory.inventoryDTO.price;
    const productStock = inventory.inventoryDTO.quantity;
    const productId = inventory.inventoryDTO.productDTO.id;

    let category = inventory.inventoryDTO.productDTO.categoryDTO;
    let categoryPath = [];
    categoryPath.unshift(category);
    while (category.parentCategory) {
        categoryPath.unshift(category.parentCategory);
        category = category.parentCategory;
    }


    return (
        <div className="bg-white min-h-screen font-sans text-neutral-900 pb-20">
            {/* Breadcrumb */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <ol className="flex items-center space-x-2 text-sm text-neutral-500">
                    {categoryPath.map((category, index) => (
                        <Fragment key={index}>
                            {index !== 0 && (
                                <li><ChevronRight className="w-4 h-4" /></li>
                            )}
                            <li className="hover:text-neutral-900 cursor-pointer">{category.name}</li>
                        </Fragment>
                    ))}
                </ol>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start">

                    {/* Left Column: Image Gallery */}
                    <div className="flex flex-col-reverse lg:flex-row gap-6">
                        {/* Thumbnails (Vertical on desktop) */}
                        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                            {[1, 2, 3, 4].map((i) => (
                                <button key={i} className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === 1 ? 'border-neutral-900' : 'border-transparent hover:border-neutral-200'}`}>
                                    <img
                                        src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80`}
                                        alt={`Thumbnail ${i}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="relative w-full aspect-square bg-neutral-100 rounded-3xl overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
                                alt="SonicMaster Pro Headphones"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 flex flex-col gap-3">
                                <button className="p-3 bg-white/90 backdrop-blur-md rounded-full text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors shadow-sm">
                                    <Heart className="w-5 h-5" />
                                </button>
                                <button className="p-3 bg-white/90 backdrop-blur-md rounded-full text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors shadow-sm">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Product Info */}
                    <div className="mt-10 lg:mt-0 lg:sticky lg:top-8">
                        <h1 className="text-3xl lg:text-3xl font-bold tracking-tight text-neutral-900 mb-4">
                            {productBrand} {productTitle}
                        </h1>

                        <div className="flex items-center space-x-4 mb-6">
                            <div className="flex items-center text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>
                            <span className="text-neutral-500 text-sm font-medium">(1,204 Reviews)</span>
                            <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                            <span className="text-green-600 text-sm font-medium">In Stock</span>
                        </div>

                        <div className="flex items-baseline space-x-4 mb-8">
                            <p className="text-4xl font-bold text-neutral-900">{formatPrice(productPrice)}</p>
                            <p className="text-xl text-neutral-400 line-through">$429.00</p>
                            <span className="bg-neutral-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                20% OFF
                            </span>
                        </div>

                        {/* Separator */}
                        <div className="h-px bg-neutral-200 my-8"></div>

                        {/*  Selection */}
                        <div className="mb-8">
                            {/* TODO */}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            {/* Add to Cart */}
                            <AddToCartBtn productId={productId} sellerId={sellerId} />
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
                                <Truck className="w-6 h-6 text-neutral-900" />
                                <div>
                                    <h4 className="font-semibold text-sm">Free Delivery</h4>
                                    <p className="text-xs text-neutral-500">2-3 business days</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
                                <RotateCcw className="w-6 h-6 text-neutral-900" />
                                <div>
                                    <h4 className="font-semibold text-sm">30-Day Returns</h4>
                                    <p className="text-xs text-neutral-500">Hassle-free guarantee</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
                                <ShieldCheck className="w-6 h-6 text-neutral-900" />
                                <div>
                                    <h4 className="font-semibold text-sm">2-Year Warranty</h4>
                                    <p className="text-xs text-neutral-500">Full coverage included</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Tab/Details Section */}
                <div className="mt-24">
                    <div className="border-b border-neutral-200">
                        <div className="flex space-x-8">
                            <button className="border-b-2 border-neutral-900 pb-4 text-sm font-bold text-neutral-900">Description</button>
                            <button className="border-b-2 border-transparent pb-4 text-sm font-medium text-neutral-500 hover:text-neutral-700">Reviews (1,204)</button>
                        </div>
                    </div>
                    <div className="py-8 text-neutral-600 leading-relaxed max-w-4xl">
                        {productDescription}
                    </div>
                </div>

            </main>
        </div>
    );
}