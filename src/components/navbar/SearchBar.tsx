"use client"

import { getSuggestions } from "./action"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function SearchBar() {

    const router = useRouter();
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const onSearchBarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 1) {
            const suggestions = await getSuggestions(e.target.value);
            if (suggestions.success) {
                setSuggestions(suggestions.data);
                setIsDropdownOpen(true);
            }
        }
        else {
            setSuggestions([]);
            setIsDropdownOpen(false);
        }
    }

    const onSuggestionClick = (suggestion: string) => {
        router.push(`/search?s=${suggestion}`);
        setIsDropdownOpen(false);
    }

    return (
        <div className="flex-1 flex justify-center px-8 z-50">
            <div className="w-full max-w-md relative">
                <div className="relative">
                    <input
                        onChange={onSearchBarChange}
                        type="text"
                        placeholder="Ürün, kategori veya marka ara"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                {/* Search Results Dropdown */}
                {isDropdownOpen && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                        <div className="p-2">


                            <div className="text-xs font-semibold text-gray-500 mb-2 px-2 uppercase tracking-wider">Sonuçlar</div>
                            <ul className="flex flex-col">
                                {suggestions.map((suggestion, index) => (
                                    <li onClick={() => onSuggestionClick(suggestion)} key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">{suggestion}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}