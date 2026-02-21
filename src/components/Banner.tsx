"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ROUTES } from "@/utils/routes";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  const banners = [
    {
      id: 1,
      title: "Discover the Best Deals on",
      brand: "E-Shop",
      subtitle: "Shop trending products, brands, and more! Enjoy fast shipping and secure checkout.",
      gradient: "from-blue-100 via-orange-50 to-orange-200",
    },
    {
      id: 2,
      title: "Summer Collection",
      brand: "2024",
      subtitle: "Explore our latest summer fashion trends and exclusive discounts up to 50% off!",
      gradient: "from-pink-100 via-purple-50 to-pink-200",
    },
    {
      id: 3,
      title: "Free Shipping",
      brand: "Free Returns",
      subtitle: "Hassle-free shopping with free shipping on orders over $50 and easy returns!",
      gradient: "from-green-100 via-emerald-50 to-teal-200",
    },
  ];

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".banner-button-next",
          prevEl: ".banner-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".banner-pagination",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="bannerSwiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className={`w-full bg-gradient-to-r ${banner.gradient} py-10 md:py-20`}>
              <div className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center gap-5">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 drop-shadow-sm">
                  {banner.title}{" "}
                  <span className="text-orange-600">{banner.brand}</span>
                </h1>
                <p className="text-gray-700 text-lg md:text-2xl max-w-2xl">
                  {banner.subtitle}
                </p>
                <a
                  href={ROUTES.home}
                  className="inline-block mt-4 bg-orange-600 hover:bg-orange-700 transition-colors text-white px-8 py-3 rounded-lg shadow-lg text-lg font-semibold"
                >
                  Start Shopping
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="banner-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white transition">
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <button className="banner-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white transition">
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>

      {/* Custom Pagination */}
      <div className="banner-pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-10"></div>
    </div>
  );
};

export default Banner;
