"use client"

import { getActiveOrdersOfCustomer } from "@/app/profile/orders/action";
import { Order } from "@/models/order/Order"
import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";
import { useState } from "react"

export default function OrderList({ initialOrders }: { initialOrders: Order[] }) {
    const [orders, setOrders] = useState(initialOrders);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loadMore = async () => {
        if (loading) return;
        setLoading(true);

        const newData = await getActiveOrdersOfCustomer(page + 1);
        if (newData.last) {
            setHasMore(false);
        }
        setOrders((prev) => [...prev, ...newData.content])
        setPage(page + 1);

        setLoading(false);
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DELIVERED":
                return "bg-green-50 text-green-700 ring-green-600/20";
            case "PROCESSING":
                return "bg-blue-50 text-blue-700 ring-blue-600/20";
            case "SHIPPED":
                return "bg-indigo-50 text-indigo-700 ring-indigo-600/20";
            case "CANCELLED":
                return "bg-red-50 text-red-700 ring-red-600/20";
            default:
                return "bg-gray-50 text-gray-600 ring-gray-500/10";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "DELIVERED":
                return <CheckCircle className="h-4 w-4 mr-1.5" />;
            case "PROCESSING":
                return <Clock className="h-4 w-4 mr-1.5" />;
            case "SHIPPED":
                return <Truck className="h-4 w-4 mr-1.5" />;
            case "CANCELLED":
                return <XCircle className="h-4 w-4 mr-1.5" />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="divide-y divide-gray-100">
                {orders.map((order) => (
                    <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-start gap-4">
                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                                    <img
                                        src={order.image}
                                        alt={`Order ${order.id}`}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-base font-semibold text-gray-900">{order.id}</h3>
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-1">Sipariş Tarihi: {order.date}</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {order.total} <span className="text-gray-400 font-normal mx-1">•</span> {order.items} {order.items === 1 ? 'Ürün' : 'Ürün'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button className="flex-1 sm:flex-none items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
                                    Detayları Gör
                                </button>
                                <button className="flex-1 sm:flex-none items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
                                    Kargo Takip
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Load More Butonu */}
            {hasMore && orders.length > 0 && (
                <div className="w-full flex justify-center pt-2 pb-2 border-t border-gray-100">
                    <button
                        onClick={loadMore}
                        disabled={loading}
                        className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-indigo-600 bg-white border border-indigo-200 rounded-full shadow-sm hover:bg-indigo-50 hover:border-indigo-300 hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Yükleniyor...
                            </>
                        ) : (
                            <>
                                Daha Fazla Yükle
                                <svg className="ml-2 -mr-1 h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Empty State (Hidden by default, shown if no orders) */}
            {orders.length === 0 && (
                <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Sipariş Bulunamadı</h3>
                    <p className="mt-1 text-sm text-gray-500">Henüz hiç sipariş vermediniz.</p>
                    <div className="mt-6">
                        <button type="button" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Alışverişe Başla
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}