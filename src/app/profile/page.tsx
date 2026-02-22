"use client"

import { getCustomerInfo } from "./actions";
import ProfileUpdateBtn from "./components/profileUpdateBtn";
import { useEffect, useState } from "react";
import { CustomerInfo } from "@/models/auth/CustomerInfo";

export default function Profile() {


    useEffect(() => {
        getCustomerInfo().then((customerInfoResponse) => {
            const customerInfo = customerInfoResponse.data;
            setCustomerInfo(customerInfo);
            setCustomerInfoChange(customerInfo);
        });
    }, []);

    const [customerInfoChange, setCustomerInfoChange] = useState<CustomerInfo>();
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerInfoChange(prev => {
            if (prev) {
                return { ...prev, name: e.target.value }
            }
            return prev;
        })
    };

    const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerInfoChange(prev => {
            if (prev) {
                return { ...prev, surname: e.target.value }
            }
            return prev;
        })
    };




    return (
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
            <div className="px-6 py-6">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">{customerInfo?.name} {customerInfo?.surname}</h2>
                    <p className="text-sm text-gray-500">{customerInfo?.email}</p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">Kişisel Bilgiler</h3>
                            <p className="mt-1 text-sm text-gray-500">Kişisel bilgilerinizi buradan güncelleyin.</p>
                        </div>

                        <div className="sm:col-span-2">
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Ad</label>
                                    <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border" value={customerInfoChange?.name ?? ""} onChange={handleNameChange} />
                                </div>

                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Soyad</label>
                                    <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border" value={customerInfoChange?.surname ?? ""} onChange={handleSurnameChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <ProfileUpdateBtn customerInfo={customerInfoChange!}
                            onSuccess={() => {
                                setCustomerInfo(customerInfoChange!);
                            }} />
                    </div>
                </div>
            </div>
        </div >
    )
}