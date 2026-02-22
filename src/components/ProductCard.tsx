"use client"

import React, { useEffect, useState } from "react";
import { DisplayProduct } from "@/models/DisplayProduct";
import ProductCardAddCartBtn from "./product/ProductCardAddCartBtn";
import CartClientService from "@/services/CartClientService";
import { formatPrice } from "@/utils/formatters";
import { PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import { ROUTES } from "@/utils/routes";

interface ProductCardProps {
  product: DisplayProduct;
}

const placeholderImg = PLACEHOLDER_IMAGE_URL;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {


  return (

    <div className=" h-[530px] bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-xs border border-gray-200 flex flex-col group hover:shadow-2xl transition-shadow"
      style={{ minHeight: "420px", maxWidth: "230px" }}>
      {/* Product Image with 3:4 Aspect Ratio */}
      <a href={ROUTES.product(product.title, product.productId.toString(), product.sellerId.toString())}>
        <div className="relative w-full aspect-[3/4] bg-gray-100 flex-shrink-0">
          <img
            src={product.imagesUrl.length > 0 ? product.imagesUrl[0] : placeholderImg}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </a>
      <div className="p-5 flex-1 flex flex-col">
        <a href={ROUTES.product(product.title, product.productId.toString(), product.sellerId.toString())}>
          <h3 className="text-lg text-gray-900 mb-15 line-clamp-2 w-full break-words">{product.brandName} {product.title}</h3>
        </a>
        <div className="justify-between">
          <a href={ROUTES.product(product.title, product.productId.toString(), product.sellerId.toString())}><p className="text-xl font-semibold text-black-700 mb-2">{formatPrice(product.price)}</p></a>

          <ProductCardAddCartBtn
            productId={product.productId}
            sellerId={product.sellerId}
            quantity={1}
          />

        </div>
      </div>
    </div>


  );
};

export default ProductCard;


