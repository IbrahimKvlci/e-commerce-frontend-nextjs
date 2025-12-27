"use client";
import React, { useState } from "react";
import { CreditCard, Lock, CheckCircle2, Circle } from "lucide-react";
import CreditCardPaymentCheckoutForm from "./CreditCardPaymentCheckoutForm";

export default function PaymentCheckout() {
    const [paymentMethod, setPaymentMethod] = useState("credit-card");

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mt-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                        <CreditCard className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">Payment Details</h2>
                </div>
            </div>

            <div className="p-8">
                {/* Payment Method Selection */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-4 uppercase tracking-wider">
                        Select Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => setPaymentMethod("credit-card")}
                            className={`group relative flex items-center p-4 rounded-2xl border-2 transition-all duration-300 ${paymentMethod === "credit-card"
                                ? "border-indigo-600 bg-indigo-50/50"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                        >
                            <div className={`p-3 rounded-xl mr-4 transition-colors ${paymentMethod === "credit-card" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"
                                }`}>
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <span className={`block font-bold text-lg ${paymentMethod === "credit-card" ? "text-indigo-900" : "text-gray-900"
                                    }`}>Credit Card</span>
                                <span className="text-sm text-gray-500">Pay securely with card</span>
                            </div>
                            {paymentMethod === "credit-card" && (
                                <div className="absolute top-4 right-4 text-indigo-600">
                                    <CheckCircle2 className="w-6 h-6 fill-indigo-100" />
                                </div>
                            )}
                            {paymentMethod !== "credit-card" && (
                                <div className="absolute top-4 right-4 text-gray-300">
                                    <Circle className="w-6 h-6" />
                                </div>
                            )}
                        </button>

                        {/* Placeholder for other methods */}
                        <button
                            disabled
                            className="flex items-center p-4 rounded-2xl border-2 border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                        >
                            <div className="p-3 rounded-xl mr-4 bg-gray-200 text-gray-400">
                                <Lock className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <span className="block font-bold text-lg text-gray-400">PayPal</span>
                                <span className="text-sm text-gray-400">Coming soon</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Card Information Section */}
                {paymentMethod === "credit-card" && (
                    <CreditCardPaymentCheckoutForm />
                )}
            </div>
        </div>
    );
}
