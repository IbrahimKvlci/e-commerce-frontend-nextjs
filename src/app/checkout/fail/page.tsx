'use client';

import Link from 'next/link';
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function CheckoutFailPage() {
    const searchParams = useSearchParams();
    const message = searchParams.get('error');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-4 transition-colors duration-300">
            <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300 ring-1 ring-gray-100 dark:ring-zinc-800">
                <div className="p-8 text-center">
                    {/* Icon Animation */}
                    <div className="mb-6 relative inline-block">
                        <div className="absolute inset-0 bg-red-100 dark:bg-red-900/30 rounded-full animate-ping opacity-75"></div>
                        <div className="relative bg-red-50 dark:bg-red-900/20 p-4 rounded-full">
                            <XCircle className="w-16 h-16 text-red-500 dark:text-red-400" strokeWidth={1.5} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                        Payment Failed
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        {message}
                    </p>

                    <div className="space-y-3">
                        <Link
                            href="/checkout"
                            className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-lg shadow-red-200 dark:shadow-red-900/20 hover:shadow-red-300 hover:-translate-y-0.5"
                        >
                            Try Again
                        </Link>

                        <Link
                            href="/"
                            className="group flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200 font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 border border-gray-100 dark:border-zinc-700"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                            Return to Home
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-zinc-900/50 p-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <HelpCircle className="w-4 h-4" />
                    <span>Need help? <Link href="/contact" className="text-red-600 dark:text-red-400 hover:underline">Contact Support</Link></span>
                </div>
            </div>
        </div>
    );
}