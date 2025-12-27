"use client"
import AddressCheckout from "@/components/checkout/address/AddressCheckout";
import PaymentCheckout from "@/components/checkout/payment/PaymentCheckout";

import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { CheckoutProvider } from "@/context/CheckoutContext";

export default function CheckoutPage() {
    return (
        <CheckoutProvider>
            <div className="container mx-auto p-4 max-w-6xl">
                <h1 className="text-3xl font-bold mb-8 text-gray-900 px-4 lg:px-0">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Checkout Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        <AddressCheckout />
                        <PaymentCheckout />
                    </div>

                    {/* Checkout Summary - Right Column */}
                    <div className="lg:col-span-1">
                        <CheckoutSummary />
                    </div>
                </div>
            </div>
        </CheckoutProvider>
    )
}