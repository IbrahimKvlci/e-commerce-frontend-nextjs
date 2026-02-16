import { DisplayProduct } from "@/models/DisplayProduct";
import { PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import { formatPrice } from "@/utils/formatters";
import { Star } from "lucide-react";

export default function ProductCard({ product }: { product: DisplayProduct }) {
    let imageUrl = PLACEHOLDER_IMAGE_URL;
    if (product.imagesUrl) {
        imageUrl = product.imagesUrl[0];
    }

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_25px_-5px_rgba(6,81,237,0.15)] transition-all duration-300 overflow-hidden flex flex-col">
            {/* Image */}
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <div className="absolute top-3 right-3 z-10">
                    <button className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm group/heart">
                        <svg xmlns={imageUrl} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/heart:scale-110"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <div className="mb-2">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.brandName} {product.title}
                    </h3>
                </div>

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

                <div className="mt-auto flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                    </div>
                    <button className="px-5 py-2.5 bg-gray-900 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-gray-900/10 hover:shadow-blue-600/20 transition-all duration-300 transform active:scale-95 flex items-center gap-2">
                        Add
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}