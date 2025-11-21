"use client"

import CartItemService from "@/services/CartItemService"
import { toast } from "react-toastify";
import { useState } from "react";
import { Check } from "lucide-react";


interface ProductCardAddCartBtnProps {
    addCartItemRequest: AddCartItemRequest;
}

const ProductCardAddCartBtn: React.FC<ProductCardAddCartBtnProps> = ({ addCartItemRequest }) => {

    const cartItemService = new CartItemService()
    const [isAdded, setIsAdded] = useState(false);


    return (
        <div>
            <button
                className={`w-full px-4 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 text-sm font-semibold shadow transition flex items-center justify-center gap-2 ${isAdded
                    ? "bg-green-600 hover:bg-green-700 focus:ring-green-400 text-white"
                    : "bg-orange-600 hover:bg-orange-700 focus:ring-orange-400 text-white"
                    }`}
                type="button"
                disabled={isAdded}
                onClick={async () => {
                    try {
                        await cartItemService.addCartItem(addCartItemRequest);
                        toast.success("Ürün sepete eklendi");
                        setIsAdded(true);
                        setTimeout(() => setIsAdded(false), 2000);
                    } catch (error) {
                        toast.error("Ürün sepete eklenemedi");
                        console.error(error);
                    }
                }}
            >
                {isAdded ? (
                    <>
                        <Check size={18} />
                        Sepete Eklendi
                    </>
                ) : (
                    "Sepete Ekle"
                )}
            </button>
        </div>
    )
};
export default ProductCardAddCartBtn;