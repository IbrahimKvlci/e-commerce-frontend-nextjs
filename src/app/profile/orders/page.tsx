import OrderList from "@/components/order/OrderList";
import { getActiveOrdersOfCustomer } from "./action";

export default async function Orders() {

    const orders = await getActiveOrdersOfCustomer(0, 2);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
                <div className="px-6 py-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Sipariş Geçmişi</h2>
                    <p className="text-sm text-gray-500 mt-1">Son siparişlerin durumunu kontrol edin, iadeleri yönetin ve faturaları indirin.</p>
                </div>
                <OrderList initialOrders={orders.content} />
            </div>
        </div>
    )
}