"use client";

import React, { useEffect, useState } from "react";
import CartService from "@/services/CartClientService";
import { useCheckout } from "@/context/CheckoutContext";
import CheckoutClientService from "@/services/checkout/CheckoutClientService";

export default function CheckoutSummary() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAccepted, setIsAccepted] = useState(false);
    const [processing, setProcessing] = useState(false);
    const { isAddressValid, isPaymentValid } = useCheckout();
    const { creditCardCheckout } = useCheckout();

    const checkoutService = new CheckoutClientService();

    const handlePayment = async () => {
        if (!isAccepted) return;
        setProcessing(true);
        console.log(creditCardCheckout);
        const response = await checkoutService.initiate3DCheckout(creditCardCheckout);
        if (response.success && response.data) {
            document.open();
            document.write(response.data.htmlResponse);
            document.close();
        }
        setProcessing(false);
    };

    const cartService = new CartService();

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            const response = await cartService.getCartOfCustomer();
            if (response.success && response.data) {
                setCart(response.data);
            }
            setLoading(false);
        };

        fetchCart();
    }, []);


    if (loading) {
        return (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm animate-pulse h-64 sticky top-8">
                <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2 mb-6"></div>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4"></div>
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4"></div>
                    </div>
                    <div className="flex justify-between">
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4"></div>
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!cart) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sticky top-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Sipariş Özeti</h2>

            {/* Items Preview (Optional: Show up to 3 items) */}
            <div className="mb-6 space-y-3">
                {cart.cartItems.slice(0, 3).map((item) => (
                    <div key={item.inventory.id} className="flex gap-3 text-sm">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
                            {/* Ideally we would use Next.js Image here if we have the image URL */}
                            {/* <img src={item.inventory.product.images[0]?.url} alt="" className="object-cover w-full h-full" /> */}
                            <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
                                IMG
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-neutral-900 dark:text-white line-clamp-1">
                                {item.inventory.product.title}
                            </p>
                            <p className="text-neutral-500 text-xs">
                                Adet: {item.quantity}
                            </p>
                        </div>
                        <div className="font-medium text-neutral-900 dark:text-white">
                            ${item.inventory.price.toFixed(2)}
                        </div>
                    </div>
                ))}
                {cart.cartItems.length > 3 && (
                    <p className="text-xs text-neutral-500 text-center pt-2">
                        + {cart.cartItems.length - 3} diğer ürün
                    </p>
                )}
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-800 my-4"></div>

            {/* Price Breakdown */}
            <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Ara Toplam</span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                        ${cart.totalPrice.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Kargo</span>
                    <span className="font-medium text-neutral-900 dark:text-white">$5.00</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Vergi</span>
                    <span className="font-medium text-neutral-900 dark:text-white">$0.00</span>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-base font-semibold text-neutral-900 dark:text-white">Toplam</span>
                        <span className="text-xl font-bold text-neutral-900 dark:text-white">
                            ${(cart.totalPrice + 5).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center mt-0.5">
                        <input
                            type="checkbox"
                            className="peer h-4 w-4 rounded border-neutral-300 text-black focus:ring-black dark:border-neutral-700 dark:bg-neutral-800 dark:checked:bg-white dark:focus:ring-offset-neutral-900 transition-all"
                            checked={isAccepted}
                            onChange={(e) => setIsAccepted(e.target.checked)}
                        />
                        <svg
                            className="absolute left-0 top-0 pointer-events-none hidden h-4 w-4 text-white peer-checked:block stroke-black dark:stroke-black"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <span className="text-xs text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors select-none leading-tight">
                        <span className="font-medium text-neutral-900 dark:text-white">Ön bilgilendirme koşullarını</span> ve <span className="font-medium text-neutral-900 dark:text-white">mesafeli satış sözleşmesini</span> okudum, onaylıyorum.
                    </span>
                </label>
            </div>

            {/* Payment Button */}
            <button
                onClick={handlePayment}
                disabled={!isAccepted || processing || !isAddressValid || !isPaymentValid}
                className={`w-full py-4 px-6 rounded-xl font-medium text-white shadow-sm transition-all duration-200 flex items-center justify-center gap-2
                    ${isAccepted && !processing && isAddressValid && isPaymentValid
                        ? 'bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer transform hover:-translate-y-0.5'
                        : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                    }`}
            >
                {processing ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>İşleniyor...</span>
                    </>
                ) : (
                    <>
                        <span>Siparişi Tamamla</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </>
                )}
            </button>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <span>Güvenli Ödeme</span>
            </div>
        </div>
    );
}
