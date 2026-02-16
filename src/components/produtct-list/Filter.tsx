"use client"

import { ChevronDown, Star } from "lucide-react";
import { Category } from "@/models/Category";
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Attribute } from "@/models/Attribute";

interface FilterProps {
    categories: Category[];
    attributes: Attribute[];
}



export default function Filter({ categories, attributes }: FilterProps) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>(attributes);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);

    const handleAttributeChange = (key: string, value: string, isChecked: boolean) => {
        setSelectedAttributes((prev) => {

            const updatedAttributes = prev.map((item) => {
                if (item.key === key) {
                    const updatedValues = item.values.map((v) => {
                        if (v.valueText === value) {
                            return { ...v, isSelected: isChecked };
                        }
                        return v;
                    });

                    return { ...item, values: updatedValues };
                }
                return item;
            });

            return updatedAttributes;
        });
    };

    const handleCategoryChange = (categoryId: number) => {
        setSelectedCategory(categoryId);
    };

    const handlePriceRange = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (!minPrice) {
            params.delete("minPrice");
        } else {
            params.set("minPrice", minPrice.toString());
        }
        if (!maxPrice) {
            params.delete("maxPrice");
        } else {
            params.set("maxPrice", maxPrice.toString());
        }
        router.push(`${pathname}?${params.toString()}`);
    };


    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (!selectedCategory) {
            params.delete("category");
            router.push(`${pathname}?${params.toString()}`);
            return;
        }
        console.log("Selected category:", selectedCategory);
        const jsonString = JSON.stringify(selectedCategory);
        const encodedJson = encodeURIComponent(jsonString);
        params.set("category", encodedJson);
        router.push(`${pathname}?${params.toString()}`);
    }, [selectedCategory]);




    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const isSelected = selectedAttributes.some((item) => {
            return item.values.some((v) => {
                console.log("Value selected:", v.isSelected);
                return v.isSelected;
            });
        });
        if (!isSelected) {
            params.delete("attributes");
            router.push(`${pathname}?${params.toString()}`);

            return;
        }
        const jsonString = JSON.stringify(selectedAttributes);
        const encodedJson = encodeURIComponent(jsonString);
        params.set("attributes", encodedJson);
        router.push(`${pathname}?${params.toString()}`);
    }, [selectedAttributes]);

    return (
        < div className="hidden lg:block space-y-8" >

            {/* Categories */}
            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-blue-50" >
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
                    Categories
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </h3>
                <div className="space-y-3">
                    {categories.map((category) => (
                        <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                            <button className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" onClick={(e) => handleCategoryChange(category.id)} >
                                {category.name}
                            </button>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-blue-50" >
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-full">
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">TL</span>
                        <input type="number" value={minPrice ?? ''} onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : null)} placeholder="Min" className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="relative w-full">
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">TL</span>
                        <input type="number" value={maxPrice ?? ''} onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)} placeholder="Max" className="w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" />
                    </div>
                </div>
                <button onClick={() => handlePriceRange()} className="w-full py-2 bg-gray-50 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-100 transition-colors">Apply</button>
            </div>

            {/* Rating */}
            <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-blue-50" >
                <h3 className="font-semibold text-gray-900 mb-4">Rating</h3>
                <div className="space-y-2">
                    {[5, 4, 3, 2].map((rating) => (
                        <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input type="checkbox" className="peer w-5 h-5 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500/20 transition-all checked:border-blue-600 checked:bg-blue-600 appearance-none" />
                                <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 14 14" fill="none">
                                    <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-gray-200'}`} />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500 group-hover:text-blue-600">& Up</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div >

            {/* Colors */}
            {
                attributes.map((attribute, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-blue-50">
                        <h3 className="font-semibold text-gray-900 mb-4">{attribute.key}</h3>
                        <div className="space-y-3">
                            {attribute.values.map((value, j) => (
                                <label key={j} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input checked={value.isSelected} onChange={(e) => handleAttributeChange(attribute.key, value.valueText, e.target.checked)} type="checkbox" className="peer w-5 h-5 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500/20 transition-all checked:border-blue-600 checked:bg-blue-600 appearance-none" />
                                        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 14 14" fill="none">
                                            <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-600 group-hover:text-blue-600 transition-colors">
                                        {value.valueText}
                                        <span className="text-gray-400 text-sm ml-1">({value.count})</span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))
            }
        </div >)
}