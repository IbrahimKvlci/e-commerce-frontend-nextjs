import { DisplayProduct } from "@/models/DisplayProduct";
import { PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import { formatPrice } from "@/utils/formatters";
import { Star } from "lucide-react";
import ProductCardAddCartBtn from "../product/ProductCardAddCartBtn";
import { ROUTES } from "@/utils/routes";

export default function ProductCard({ product }: { product: DisplayProduct }) {

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_25px_-5px_rgba(6,81,237,0.15)] transition-all duration-300 overflow-hidden flex flex-col">
            {/* Image */}
            <a href={ROUTES.product(product.title, product.productId.toString(), product.sellerId.toString())}>
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                        src={product.imagesUrl.length > 0 ? product.imagesUrl[0] : PLACEHOLDER_IMAGE_URL}
                        alt={product.title}
                        className="w-full h-full object-scale-down object-center transition-transform duration-200 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
            </a>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <a href={ROUTES.product(product.title, product.productId.toString(), product.sellerId.toString())}>
                    <div className="mb-2">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                            {product.brandName} {product.title}
                        </h3>
                    </div>
                </a>

                <a href={ROUTES.product(product.title, product.productId.toString(), product.sellerId.toString())}>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-400 text-sm">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 text-gray-200" />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">(128 reviews)</span>
                    </div>
                </a>

                <div className="mt-auto flex items-center justify-between gap-4">
                    <a href={ROUTES.product(product.title, product.productId.toString(), product.sellerId.toString())}>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                        </div>
                    </a>
                    <ProductCardAddCartBtn
                        productId={product.productId}
                        sellerId={product.sellerId}
                        quantity={1}
                    />
                </div>
            </div>
        </div>
    );
}