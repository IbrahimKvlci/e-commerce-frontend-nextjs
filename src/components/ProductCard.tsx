"use client"

import React, { useEffect, useState } from "react";
import { DisplayProduct } from "@/models/DisplayProduct";
import ProductCardAddCartBtn from "./product/ProductCardAddCartBtn";
import CartClientService from "@/services/CartClientService";
import { formatPrice } from "@/utils/formatters";

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
        const cartService = new CartClientService();
        const cartDataResponse = await cartService.getCartOfCustomer();
        setCart(cartDataResponse.data);
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      }
    };

    fetchCart();
  }, []);

  const productTitleForUrl = product.title.replace(/\s+/g, '-').toLowerCase();

  return (

    <div className=" h-[530px] bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-xs border border-gray-200 flex flex-col group hover:shadow-2xl transition-shadow"
      style={{ minHeight: "420px", maxWidth: "230px" }}>
      {/* Product Image with 3:4 Aspect Ratio */}
      <a href={`${productTitleForUrl}/p/${product.productId}?seller=${product.sellerId}`}>
        <div className="relative w-full aspect-[3/4] bg-gray-100 flex-shrink-0">
          <img
            src={product.imagesUrl.length > 0 ? product.imagesUrl[0] : placeholderImg}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
          {/* New Badge Example */}
          <span className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-0.5 rounded text-xs shadow">New</span>
        </div>
      </a>
      <div className="p-5 flex-1 flex flex-col">
        <a href={`${productTitleForUrl}/p/${product.productId}?seller=${product.sellerId}`}>
          <h3 className="text-lg text-gray-900 mb-15 line-clamp-2 w-full break-words">{product.brandName} {product.title}</h3>
        </a>
        <div className="justify-between">
          <a href=""><p className="text-xl font-semibold text-black-700 mb-2">{formatPrice(product.price)}</p></a>
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


