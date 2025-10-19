'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from './ProductCard';

export default function ProductSwiper(){
    return (
      <div className="w-full max-w-7xl mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          className="flexible-swiper"
        >
          <SwiperSlide>
            <ProductCard
          product={{
            id: 1,
            name: "Sample Productqaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            price: 24.99,
            image: "https://via.placeholder.com/300x400.png?text=Product+Image",
            description: "This is a sample product to showcase the ProductCard.",
            rating: 4.2
          }}
        />
          </SwiperSlide>
          
          <SwiperSlide>
            <ProductCard
              product={{
                id: 2,
                name: "Wireless Bluetooth Headphones",
                price: 89.99,
                image: "https://via.placeholder.com/300x400.png?text=Headphones",
                description: "High-quality wireless headphones with noise cancellation",
                rating: 4.5
              }}
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <ProductCard
              product={{
                id: 3,
                name: "Smart Fitness Watch",
                price: 199.99,
                image: "https://via.placeholder.com/300x400.png?text=Smart+Watch",
                description: "Track your fitness goals with this advanced smartwatch",
                rating: 4.3
              }}
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <ProductCard
              product={{
                id: 4,
                name: "Portable Power Bank",
                price: 29.99,
                image: "https://via.placeholder.com/300x400.png?text=Power+Bank",
                description: "Keep your devices charged on the go",
                rating: 4.7
              }}
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <ProductCard
              product={{
                id: 5,
                name: "USB-C Cable Set",
                price: 15.99,
                image: "https://via.placeholder.com/300x400.png?text=USB+Cable",
                description: "High-speed charging and data transfer cables",
                rating: 4.2
              }}
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <ProductCard
              product={{
                id: 6,
                name: "Wireless Charging Pad",
                price: 39.99,
                image: "https://via.placeholder.com/300x400.png?text=Charging+Pad",
                description: "Convenient wireless charging for your devices",
                rating: 4.4
              }}
            />
          </SwiperSlide>
          
          {/* Enhanced Navigation Buttons */}
          <div className="swiper-button-prev !text-black transition-all duration-300 !w-12 !h-12 !from-blue-600 !to-purple-600 !rounded-full !shadow-5xl hover:!shadow-6xl !border-2 !border-white/20 backdrop-blur-sm"></div>
          <div className="swiper-button-next !text-black transition-all duration-300 !w-12 !h-12 !from-blue-600 !to-purple-600 !rounded-full !shadow-5xl hover:!shadow-6xl !border-2 !border-white/20 backdrop-blur-sm"></div>
      </Swiper>
        
        {/* Flexible Swiper Styling */}
        <style jsx global>{`
          .flexible-swiper {
            padding: 20px 20px;
            position: relative;
            width: 100%;
            height: auto;
          }
          
          .flexible-swiper .swiper-wrapper {
            align-items: stretch;
          }
          
          .flexible-swiper .swiper-slide {
            height: auto;
            display: flex;
            align-items: stretch;
            justify-content: center;
            padding: 0 10px;
          }
          
          /* Ensure ProductCard maintains its natural dimensions */
          .flexible-swiper .swiper-slide > * {
            width: 100%;
            max-width: 240px;
            height: auto;
            flex-shrink: 0;
          }
          
          .flexible-swiper .swiper-button-next,
          .flexible-swiper .swiper-button-prev {
            color: #6b7280;
            font-weight: bold;
            transition: all 0.3s ease;
            width: 48px !important;
            height: 48px !important;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
          
          .flexible-swiper .swiper-button-next:hover,
          .flexible-swiper .swiper-button-prev:hover {
            color: #3b82f6;
            background: rgba(255, 255, 255, 1);
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
          }
          
          .flexible-swiper .swiper-button-next:after,
          .flexible-swiper .swiper-button-prev:after {
            font-size: 18px;
            font-weight: 900;
          }
          
          /* Responsive adjustments for different screen sizes */
          @media (max-width: 480px) {
            .flexible-swiper .swiper-slide {
              padding: 0 5px;
            }
            
            .flexible-swiper .swiper-slide > * {
              max-width: 200px;
            }
            
            .flexible-swiper .swiper-button-next,
            .flexible-swiper .swiper-button-prev {
              width: 40px !important;
              height: 40px !important;
            }
            
            .flexible-swiper .swiper-button-next:after,
            .flexible-swiper .swiper-button-prev:after {
              font-size: 16px;
            }
          }
          
          @media (min-width: 640px) {
            .flexible-swiper .swiper-slide > * {
              max-width: 220px;
            }
          }
          
          @media (min-width: 768px) {
            .flexible-swiper .swiper-slide > * {
              max-width: 240px;
            }
          }
          
          @media (min-width: 1024px) {
            .flexible-swiper .swiper-slide > * {
              max-width: 260px;
            }
          }
          
          @media (min-width: 1280px) {
            .flexible-swiper .swiper-slide > * {
              max-width: 280px;
            }
          }
          
          /* Ensure proper spacing and alignment */
          .flexible-swiper .swiper-container {
            overflow: visible;
          }
          
          /* Smooth transitions */
          .flexible-swiper .swiper-slide {
            transition: transform 0.3s ease;
          }
          
          .flexible-swiper .swiper-slide:hover {
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    );
}