"use client"

import { ShoppingBag, Loader2, Check } from "lucide-react";
import { addToCart } from "../action";
import { toast } from "react-toastify";
import { useState } from "react";

interface AddToCartBtnProps {
    productId: number;
    sellerId: number;
}

export default function AddToCartBtn({ productId, sellerId }: AddToCartBtnProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleAddToCartBtnClick = async () => {
        if (isAdding || isSuccess) return;

        setIsAdding(true);
        const response = await addToCart(productId, sellerId);
        setIsAdding(false);

        if (!response.success) {
            toast.error(response.message);
            return;
        }

        setIsSuccess(true);
        toast.success("Product added to cart");

        // Reset success state after 2 seconds
        setTimeout(() => {
            setIsSuccess(false);
        }, 2000);
    }

    return (
        <button
            onClick={handleAddToCartBtnClick}
            disabled={isAdding || isSuccess}
            className={`flex-1 font-bold py-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg
                ${isSuccess
                    ? "bg-green-600 hover:bg-green-700 text-white scale-105"
                    : "bg-neutral-900 hover:bg-neutral-800 text-white hover:shadow-xl"
                }
                ${isAdding ? "opacity-90 cursor-wait" : ""}
            `}>
            {isAdding ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Adding...</span>
                </>
            ) : isSuccess ? (
                <>
                    <Check className="w-5 h-5" />
                    <span>Added</span>
                </>
            ) : (
                <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                </>
            )}
        </button>
    )
}