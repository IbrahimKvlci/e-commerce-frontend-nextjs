"use client"

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";



export default function Sort() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState(0);

    const router = useRouter();
    const searchParams = useSearchParams();

    const sortOptions = [
        { value: 0, label: 'Best Match' },
        { value: 1, label: 'Price: Low to High' },
        { value: 2, label: 'Price: High to Low' },
    ];

    const handleSortChange = (sortValue: number) => {
        setSelectedSort(sortValue);
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", sortValue.toString());
        router.push(`/search?${params.toString()}`);
        setIsOpen(false);

    }

    return (
        <div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <div className="relative group">
                    <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsOpen(!isOpen)}>
                        {sortOptions.find(option => option.value === selectedSort)?.label} <ChevronDown className="w-4 h-4" />
                    </button>
                    {/* Dropdown mockup */}
                    {isOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 p-1 z-20">
                            {sortOptions.map(option => (
                                <div key={option.value} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer" onClick={() => handleSortChange(option.value)}>{option.label}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}