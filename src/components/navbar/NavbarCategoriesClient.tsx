'use client';

import { useState } from "react";
import { CategorySubcategory } from "@/models/CategorySubcategory";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

type NavbarCategoriesClientProps = {
    categories: CategorySubcategory[];
};

export default function NavbarCategoriesClient({
    categories,
}: NavbarCategoriesClientProps) {
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
    const router = useRouter();

    if (!categories.length) {
        return null;
    }

    return (
        <div className="w-full bg-gray-50 py-2 px-8 shadow-sm relative">
            <ul className="flex items-center space-x-8 justify-center">
                {categories.map((category, index) => (
                    <li key={category.id} className="relative group">
                        <a
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1 py-2 px-3 rounded-md hover:bg-gray-100"
                            onMouseEnter={() => setHoveredCategory(index)}
                            onMouseLeave={() => setHoveredCategory(null)}
                            onClick={() => router.push(ROUTES.category(category.name, category.id.toString()))}
                        >
                            <span className="cursor-pointer">{category.name}</span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${hoveredCategory === index ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </a>

                        {hoveredCategory === index && (
                            <div
                                className="absolute top-full left-0 mt-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48"
                                onMouseEnter={() => setHoveredCategory(index)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <div className="py-2">
                                    {category.subcategories.map((subcategory, subIndex) => (
                                        <a
                                            key={subcategory.id}
                                            onClick={() => router.push(ROUTES.category(category.name, subcategory.id.toString()))}
                                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
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

