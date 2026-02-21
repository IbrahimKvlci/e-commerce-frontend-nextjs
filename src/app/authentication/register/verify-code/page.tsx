"use client";

import { useRegisterStore } from "@/stores/useRegisterStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, KeyboardEvent, ChangeEvent, ClipboardEvent, useEffect, useState } from "react";
import { ROUTES } from "@/utils/routes";
import { verifyCustomer } from "./action";
import { toast } from "react-toastify";

export default function VerifyCode() {
    const router = useRouter();
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const email = useRegisterStore((state) => state.email);
    const reset = useRegisterStore((state) => state.reset);


    useEffect(() => {
        if (!email) {
            router.push(ROUTES.register);
        }
    }, [email]);

    const handleVerify = async () => {
        if (!email) {
            return;
        }
        const code = inputs.current.map((input) => input?.value).join("");
        const res = await verifyCustomer(email, code);
        if (res.success) {
            toast.success("Doğrulama kodu başarıyla onaylandı.");
            reset();
            router.push(ROUTES.login);
        } else {
            toast.error("Doğrulama kodu geçersiz.");
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;

        // Verify if the value is a number
        if (!/^\d*$/.test(value)) {
            e.target.value = "";
            return;
        }

        if (value.length === 1 && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text");

        // Only iterate if the pasted content is numeric
        if (!/^\d+$/.test(pastedData)) return;

        const digits = pastedData.slice(0, 6).split("");
        digits.forEach((digit, idx) => {
            if (inputs.current[idx]) {
                inputs.current[idx]!.value = digit;
            }
        });

        // Focus the input after the last pasted character
        const focusIndex = Math.min(digits.length, 5);
        if (focusIndex < 6) {
            inputs.current[focusIndex]?.focus();
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center group">
                    <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <svg
                            className="h-8 w-8 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            ></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Verify your account
                    </h2>
                    <p className="mt-3 text-base text-gray-500 max-w-sm mx-auto">
                        We've sent a 6-digit verification code to your email address. Please enter it below.
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-2xl shadow-blue-900/10 ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 overflow-hidden relative">
                    {/* Decorative background element */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                    <form className="space-y-8 mt-4">
                        <div>
                            <label
                                htmlFor="verification-code"
                                className="block text-sm font-medium text-gray-700 text-center mb-6 tracking-wide uppercase text-xs"
                            >
                                Secure Verification Code
                            </label>
                            <div className="flex justify-center gap-2 sm:gap-3">
                                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            inputs.current[index] = el;
                                        }}
                                        type="text"
                                        maxLength={1}
                                        className="w-10 h-12 sm:w-12 sm:h-14 text-center text-2xl font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 ease-in-out transform focus:scale-105 caret-blue-600"
                                        placeholder=""
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={() => handleVerify()}
                                className="group relative flex w-full justify-center rounded-xl border border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform active:scale-[0.98]"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg
                                        className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                                Verify Secure Code
                            </button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-3 text-gray-400 font-medium">
                                    Didn't receive the code?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                type="button"
                                className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors hover:underline decoration-2 underline-offset-2"
                            >
                                Resend verification code
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href={ROUTES.login}
                        className="inline-flex items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <svg
                            className="mr-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}