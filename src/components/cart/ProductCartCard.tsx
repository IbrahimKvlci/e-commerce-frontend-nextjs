"use client"

import { Minus, Plus, Trash2, Store } from "lucide-react";
import CartItemService from "@/services/CartItemService";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLACEHOLDER_IMAGE_URL } from "@/utils/constants";

interface ProductCardProps {
    product: CartProductItem;
}

const ProductCartCard: React.FC<ProductCardProps> = ({ product }) => {

    const cartItemService = new CartItemService();
    const router = useRouter();
    const [quantity, setQuantity] = useState(product.quantity);

    const placeholderImage = PLACEHOLDER_IMAGE_URL;

    const handleQuantityChange = async (newQuantity: number) => {
        if (newQuantity <= 0) {
            await cartItemService.deleteCartItem(product.id);
            router.refresh();
            return;
        }
        try {
            await cartItemService.updateCartItem(newQuantity, product.id);
            setQuantity(newQuantity);
            router.refresh();
        } catch (error) {
            console.error("Failed to update cart item:", error);
        }
    };

    return (
        <div className="group relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 overflow-hidden">
            <div className="flex flex-col sm:flex-row h-full">
                {/* Image Section */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-gray-50">
                    <img
                        src={product.inventory.product.imagesUrl[0] ?? placeholderImage}
                        alt={product.inventory.product.title}
                        className="w-full h-full object-cover mix-blend-multiply p-4"
                    />
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between">
                    <div className="flex flex-col gap-3">
                        {/* Header: Seller & Brand */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                                <Store className="w-3.5 h-3.5 text-gray-400" />
                                <span className="font-medium text-gray-600">
                                    Satıcı: {product.inventory.sellerId}
                                </span>
                            </div>
                        </div>

                        {/* Title & Description */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 group-hover:text-indigo-700 transition-colors">
                                {product.inventory.product.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                {product.inventory.product.description || ""}
                            </p>
                        </div>
                    </div>

                    {/* Footer: Price & Actions */}
                    <div className="flex items-end justify-between mt-6 pt-4 border-t border-gray-50">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
                            <button
                                className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-600 shadow-sm hover:text-indigo-600 hover:border-indigo-200 border border-transparent transition-all disabled:opacity-50"
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => {
                                    handleQuantityChange(quantity - 1);
                                }}
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900">
                                {product.quantity}
                            </span>
                            <button
                                className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-600 shadow-sm hover:text-indigo-600 hover:border-indigo-200 border border-transparent transition-all"
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => {
                                    handleQuantityChange(quantity + 1);
                                }}
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex flex-col items-end gap-2">
                            <div className="text-xl font-bold text-gray-900">
                                {product.inventory.price.toLocaleString("tr-TR", {
                                    style: "currency",
                                    currency: "TRY",
                                })}
                            </div>
                            <button
                                className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                                type="button"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Kaldır</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCartCard;