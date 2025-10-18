"use client";

import { useState } from "react";

export default function Categories() {
    const categories = [
        { 
            name: "Electronics", 
            href: "/category/electronics",
            subcategories: [
                { name: "Smartphones", href: "/category/electronics/smartphones" },
                { name: "Laptops", href: "/category/electronics/laptops" },
                { name: "Tablets", href: "/category/electronics/tablets" },
                { name: "Audio", href: "/category/electronics/audio" },
                { name: "Cameras", href: "/category/electronics/cameras" },
                { name: "Gaming", href: "/category/electronics/gaming" }
            ]
        },
        { 
            name: "Fashion", 
            href: "/category/fashion",
            subcategories: [
                { name: "Men's Clothing", href: "/category/fashion/mens" },
                { name: "Women's Clothing", href: "/category/fashion/womens" },
                { name: "Shoes", href: "/category/fashion/shoes" },
                { name: "Accessories", href: "/category/fashion/accessories" },
                { name: "Jewelry", href: "/category/fashion/jewelry" },
                { name: "Watches", href: "/category/fashion/watches" }
            ]
        },
        { 
            name: "Home", 
            href: "/category/home",
            subcategories: [
                { name: "Furniture", href: "/category/home/furniture" },
                { name: "Kitchen", href: "/category/home/kitchen" },
                { name: "Bedding", href: "/category/home/bedding" },
                { name: "Decor", href: "/category/home/decor" },
                { name: "Garden", href: "/category/home/garden" },
                { name: "Appliances", href: "/category/home/appliances" }
            ]
        },
        { 
            name: "Beauty", 
            href: "/category/beauty",
            subcategories: [
                { name: "Skincare", href: "/category/beauty/skincare" },
                { name: "Makeup", href: "/category/beauty/makeup" },
                { name: "Hair Care", href: "/category/beauty/hair" },
                { name: "Fragrances", href: "/category/beauty/fragrances" },
                { name: "Tools", href: "/category/beauty/tools" },
                { name: "Men's Grooming", href: "/category/beauty/mens-grooming" }
            ]
        },
        { 
            name: "Sports", 
            href: "/category/sports",
            subcategories: [
                { name: "Fitness", href: "/category/sports/fitness" },
                { name: "Outdoor", href: "/category/sports/outdoor" },
                { name: "Team Sports", href: "/category/sports/team" },
                { name: "Water Sports", href: "/category/sports/water" },
                { name: "Winter Sports", href: "/category/sports/winter" },
                { name: "Equipment", href: "/category/sports/equipment" }
            ]
        },
        { 
            name: "Books", 
            href: "/category/books",
            subcategories: [
                { name: "Fiction", href: "/category/books/fiction" },
                { name: "Non-Fiction", href: "/category/books/non-fiction" },
                { name: "Textbooks", href: "/category/books/textbooks" },
                { name: "Children's Books", href: "/category/books/children" },
                { name: "E-books", href: "/category/books/ebooks" },
                { name: "Audiobooks", href: "/category/books/audiobooks" }
            ]
        }
    ];

    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

    return (
        <div className="w-full bg-gray-50 py-2 px-8 shadow-sm relative">
            <ul className="flex items-center space-x-8 justify-center">
                {categories.map((category, index) => (
                    <li 
                        key={index}
                        className="relative group"
                    >
                        <a 
                            href={category.href} 
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1 py-2 px-3 rounded-md hover:bg-gray-100"
                            onMouseEnter={() => setHoveredCategory(index)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <span>{category.name}</span>
                            <svg 
                                className={`w-4 h-4 transition-transform duration-200 ${hoveredCategory === index ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                        
                        {/* Dropdown Menu */}
                        {hoveredCategory === index && (
                            <div 
                                className="absolute top-full left-0 mt-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48"
                                onMouseEnter={() => setHoveredCategory(index)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <div className="py-2">
                                    {category.subcategories.map((subcategory, subIndex) => (
                                        <a
                                            key={subIndex}
                                            href={subcategory.href}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                        >
                                            {subcategory.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
