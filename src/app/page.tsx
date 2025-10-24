"use client"

import ProductCard from "@/components/ProductCard";
import ProductSwiper from "@/components/ProductSwiper";
import { DisplayProduct } from "@/models/DisplayProduct";
import ProductService from "@/services/ProductService";
import { useEffect, useState } from "react";

// Example products for testing
const exampleProducts: DisplayProduct[] = [
  {
    productId: "1",
    title: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    brandName: "AudioTech",
    price: 159.99,
    sellerId: 1
  },
  {
    productId: "2", 
    title: "Smart Fitness Watch",
    description: "Track your health and fitness with advanced sensors, heart rate monitoring, and GPS. Water-resistant design for all activities.",
    brandName: "FitLife",
    price: 299.99,
    sellerId: 1
  },
  {
    productId: "3",
    title: "Professional Camera Lens",
    description: "High-quality 50mm f/1.8 lens perfect for portrait photography. Sharp images with beautiful bokeh effects.",
    brandName: "PhotoPro",
    price: 449.99,
    sellerId: 2
  },
  {
    productId: "4",
    title: "Mechanical Gaming Keyboard",
    description: "RGB backlit mechanical keyboard with tactile switches. Perfect for gaming and professional typing with customizable keys.",
    brandName: "GameTech",
    price: 129.99,
    sellerId: 1
  },
  {
    productId: "5",
    title: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and safety features.",
    brandName: "PowerUp",
    price: 39.99,
    sellerId: 3
  },
  {
    productId: "6",
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360-degree sound and 12-hour battery life. Perfect for outdoor adventures and parties.",
    brandName: "SoundWave",
    price: 89.99,
    sellerId: 2
  },
  {
    productId: "7",
    title: "Ergonomic Office Chair",
    description: "Comfortable ergonomic office chair with lumbar support and adjustable height. Perfect for long work sessions.",
    brandName: "ComfortZone",
    price: 199.99,
    sellerId: 3
  },
  {
    productId: "8",
    title: "Smart Home Hub",
    description: "Central control hub for all your smart home devices. Voice control, automation, and security features included.",
    brandName: "SmartHome",
    price: 149.99,
    sellerId: 1
  }
];

export default function Home() {
  const [displayProducts, setDisplayProducts] = useState<DisplayProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const productService: ProductService = new ProductService();
    
    // Try to fetch from API, fallback to example data
    productService.getAllDisplayProductsById(2)
      .then((data) => {
        if (data && data.length > 0) {
          setDisplayProducts(data);
        } else {
          // Use example products if API returns empty or fails
          setDisplayProducts(exampleProducts);
        }
      })
      .catch((error) => {
        console.log("API not available, using example products:", error);
        // Use example products if API fails
        setDisplayProducts(exampleProducts);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">E-Commerce Frontend</h1>
          <p className="text-lg text-gray-600">Discover amazing products</p>
        </div>
        <ProductSwiper displayProducts={displayProducts} />
        <ProductCard product={  {
    productId: "8",
    title: "Smart Home Hub",
    description: "Central control hub for all your smart home devices. Voice control, automation, and security features included.",
    brandName: "SmartHome",
    price: 149.99,
    sellerId: 1
  }} />
          <ProductCard product={  {
    productId: "8",
    title: "Smart Home Hub",
    description: "Central control hub for all your smart home devices. Voice control, automation, and security features included.",
    brandName: "SmartHome",
    price: 149.99,
    sellerId: 1
  }} />
      </main>
    </div>
  );
}
