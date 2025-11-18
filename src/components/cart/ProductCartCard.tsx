"use client"

import { DisplayProduct } from "@/models/DisplayProduct";

interface ProductCardProps {
    product: DisplayProduct;
}

const ProductCartCard: React.FC<ProductCardProps> = ({ product }) =>  {
    
    return (
        <div>
        <div className="relative rounded-xl shadow border border-gray-100 w-full mx-auto bg-white flex flex-row items-stretch min-h-[200px]">
            {/* Seller ID at top INSIDE the card, like a header, styled */}
            <div className="w-full absolute left-0 top-0 flex flex-row items-center justify-start px-6 py-3 border-b border-gray-100 z-10">
                <span className="text-l font-semibold text-gray-700 tracking-normal">
                    Satıcı ID: {product.sellerId}
                </span>
            </div>
            <div className="grid grid-cols-7 w-full">
                {/* Product Image */}
                <div className="col-span-1 flex items-center justify-center w-32 h-40 flex-shrink-0 rounded-lg m-6 mt-16 bg-gray-100 self-center">
                <img
                    src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=facearea&w=400&h=400&q=80"
                    alt={product.title}
                    className="w-full h-full object-cover rounded-md"
                />
                </div>
                {/* Product Details */}
                <div className="col-span-6 flex flex-col mt-16 mb-6 w-full">
                    <div className="flex flex-col gap-1 items-start">
                        <div className="text-base font-semibold text-gray-900 text-left">{product.title}</div>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-1 text-left">{product.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 relative h-full">
                        {/* Product count and +/- buttons */}
                        <div className="flex flex-row items-center gap-2 absolute bottom-0 left-0">
                            <button
                                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xl font-bold text-gray-800 transition flex items-center justify-center"
                                type="button"
                                aria-label="Eksilt"
                            >
                                −
                            </button>
                            <span className="min-w-[30px] text-center text-md font-medium text-gray-900">
                                1
                            </span>
                            <button
                                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xl font-bold text-gray-800 transition flex items-center justify-center"
                                type="button"
                                aria-label="Arttır"
                            >
                                +
                            </button>
                        </div>
                        {/* Price aligned right and at bottom */}
                        <div className="flex flex-col items-end justify-end absolute bottom-0 right-10">
                            <span className="text-lg font-bold text-orange-700 mb-1 text-right">
                                {product.price.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>      
    )
}
export default ProductCartCard;