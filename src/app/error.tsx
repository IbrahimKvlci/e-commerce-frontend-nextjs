"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-red-50 p-6 rounded-full mb-6 animate-in zoom-in duration-300">
                <AlertCircle className="w-16 h-16 text-red-500" />
            </div>

            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4">
                Bir şeyler yanlış gitti!
            </h2>

            <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                İsteğinizi işlerken beklenmedik bir hatayla karşılaştık. Lütfen tekrar deneyin veya ana sayfaya dönün.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
                <button
                    onClick={reset}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                >
                    <RefreshCcw className="w-5 h-5" />
                    Tekrar Dene
                </button>

                <Link
                    href="/"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                >
                    <Home className="w-5 h-5" />
                    Ana Sayfa
                </Link>
            </div>

            <div className="mt-12 text-sm text-gray-400">
                Hata Kodu: <span className="font-mono text-gray-500">{error.digest || 'UNKNOWN_ERROR'}</span>
            </div>
        </div>
    );
}
