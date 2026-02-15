"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PageArrowButton({ page, direction }: { page: number, direction: "left" | "right" }) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePage = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (direction === "left") {
            if (page === 1) {
                params.delete("page");
            } else {
                params.set("page", (page).toString());
            }
        } else {
            params.set("page", (page).toString());
        }
        router.push(`/search?${params.toString()}`);
    }

    return (
        <button onClick={handlePage} className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-black transition-colors">
            {direction === "left" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
    )
}