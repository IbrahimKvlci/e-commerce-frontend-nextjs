"use client"

import { useRouter, useSearchParams } from "next/navigation"

export default function PageButton({ page }: { page: number }) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePage = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete("page");
        } else {
            params.set("page", page.toString());
        }
        router.push(`/search?${params.toString()}`);
    }


    return (
        <button onClick={() => handlePage()} className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 font-medium shadow-sm transition-all duration-200 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:shadow-md">{page}</button>
    )
}