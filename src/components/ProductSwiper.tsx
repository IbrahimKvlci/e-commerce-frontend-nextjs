"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { DisplayProduct } from "@/models/DisplayProduct";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductSwiperProps {
  displayProducts: DisplayProduct[];
}

const ProductSwiper: React.FC<ProductSwiperProps> = ({ displayProducts }) => {
  if (!displayProducts || displayProducts.length === 0) {
    return (
      <div className="w-full py-8 text-center text-gray-500">
        <p>No products available</p>
      </div>
    );
  }

  return (
    <div className=" w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600">Discover our latest collection</p>
        </div>

        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={5}
            slidesPerGroup={5}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              1280: {
                slidesPerView: 5,
                slidesPerGroup: 5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 12,
              },
              0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 10,
              },
            }}
            className="mySwiper pb-10"
          >
            {displayProducts.map((product) => (
              <SwiperSlide key={product.productId}>
                <div className="h-full flex justify-center">
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSwiper;
