import { Package, ChevronRight, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import OrderServerService from "@/services/OrderServerService";

export default async function Orders() {

    const orderService = new OrderServerService();
    const ordersResponse = await orderService.getOrdersOfCustomer();
    const orders = ordersResponse.data;

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
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
                <div className="px-6 py-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Sipariş Geçmişi</h2>
                    <p className="text-sm text-gray-500 mt-1">Son siparişlerin durumunu kontrol edin, iadeleri yönetin ve faturaları indirin.</p>
                </div>
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
        </div>
    )
}