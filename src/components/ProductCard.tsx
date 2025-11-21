"use client"

import React, { useEffect, useState } from "react";
import { DisplayProduct } from "@/models/DisplayProduct";
import ProductCardAddCartBtn from "./product/ProductCardAddCartBtn";
import CartClientService from "@/services/CartClientService";
import UserClientService from "@/services/UserClientService";

interface ProductCardProps {
  product: DisplayProduct;
}

const placeholderImg =
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=facearea&w=400&h=400&q=80";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userService = new UserClientService();
        const cartService = new CartClientService();
        const userId = await userService.getUserId();
        const cartData = await cartService.getCartByCustomerId(userId);
        setCart(cartData);
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      }
    };

    fetchCart();
  }, []);

  return (

    <div className=" h-[530px] bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-xs border border-gray-200 flex flex-col group hover:shadow-2xl transition-shadow"
      style={{ minHeight: "420px", maxWidth: "230px" }}>
      {/* Product Image with 3:4 Aspect Ratio */}
      <a href="">
        <div className="relative w-full aspect-[3/4] bg-gray-100 flex-shrink-0">
          <img
            src={placeholderImg}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
          {/* New Badge Example */}
          <span className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-0.5 rounded text-xs shadow">New</span>
        </div>
      </a>
      <div className="p-5 flex-1 flex flex-col">
        <a href="">
          <h3 className="text-lg text-gray-900 mb-15 line-clamp-2 w-full break-words">{product.brandName} {product.title}</h3>
        </a>
        <div className="justify-between">
          <a href=""><p className="text-xl font-semibold text-black-700 mb-2">${product.price.toFixed(2)}</p></a>
          {cart && (
            <ProductCardAddCartBtn addCartItemRequest={
              {
                cartId: cart.id,
                productId: product.productId,
                sellerId: product.sellerId,
                quantity: 1
              }
            } />
          )}
        </div>
      </div>
    </div>


  );
};

export default ProductCard;


