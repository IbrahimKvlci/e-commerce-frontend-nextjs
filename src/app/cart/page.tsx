import ProductCartCard from "@/components/cart/ProductCartCard";
import CartService from "@/services/CartService";
import UserService from "@/services/UserService";

export default async function CartPage() {

    const cartService = new CartService();
    const userService = new UserService();
    const cart = await cartService.getCartByCustomerId(await userService.getUserId());

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-3xl font-bold mb-8">Alışveriş Sepeti</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items Section */}
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        {cart.cartItems.map((item) =>
                            <div key={item.inventory.id}>
                                <ProductCartCard
                                    product={item}
                                />
                            </div>
                        )}
                        {cart.cartItems.length === 0 && (
                            <div className="text-center py-16 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
                                <p className="text-neutral-500 text-lg">Sepetiniz boş</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Checkout Summary Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sticky top-8 shadow-sm">
                        <h2 className="text-xl font-semibold mb-6">Sipariş Özeti</h2>

                        {/* Price Breakdown */}
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-600 dark:text-neutral-400">Ara Toplam</span>
                                <span className="font-medium text-neutral-900 dark:text-white">
                                    ${cart.totalPrice.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-neutral-600 dark:text-neutral-400">Kargo</span>
                                <span className="font-medium text-neutral-900 dark:text-white">$5.00</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-neutral-600 dark:text-neutral-400">Vergi</span>
                                <span className="font-medium text-neutral-900 dark:text-white">$0.00</span>
                            </div>

                            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-neutral-900 dark:text-white">Toplam</span>
                                    <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                                        ${(cart.totalPrice + 5).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <button className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-4 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-neutral-900/10 dark:shadow-white/10 mb-4">
                            Ödemeye Geç
                        </button>

                        {/* Continue Shopping Link */}
                        <button className="w-full text-neutral-600 dark:text-neutral-400 py-3 text-sm hover:text-neutral-900 dark:hover:text-white transition-colors">
                            Alışverişe Devam Et
                        </button>

                        {/* Security Badge */}
                        <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            <span>Güvenli Ödeme</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}