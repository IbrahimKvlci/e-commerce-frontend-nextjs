"use client"

import { Plus, MapPin, Phone, Edit2, Trash2, Home, Briefcase } from "lucide-react";
import { useState } from "react";

export default function Addresses() {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            title: "Ev Adresim",
            type: "home",
            fullName: "Ahmet Yılmaz",
            phone: "+90 555 123 45 67",
            address: "Atatürk Mah. Cumhuriyet Cad. No: 123 D: 4",
            district: "Kadıköy",
            city: "İstanbul",
            isDefault: true,
        },
        {
            id: 2,
            title: "İş Yeri",
            type: "work",
            fullName: "Ahmet Yılmaz",
            phone: "+90 555 987 65 43",
            address: "Maslak Mah. Büyükdere Cad. No: 45 Plaza B Blok Kat: 12",
            district: "Sarıyer",
            city: "İstanbul",
            isDefault: false,
        }
    ]);

    const handleSetDefault = (id: number) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
                <div className="px-6 py-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Kayıtlı Adreslerim</h2>
                        <p className="text-sm text-gray-500 mt-1">Teslimat adreslerinizi yönetin ve düzenleyin.</p>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
                        <Plus className="h-4 w-4 mr-2" />
                        Yeni Adres Ekle
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map((address) => (
                            <div
                                key={address.id}
                                onClick={() => handleSetDefault(address.id)}
                                className={`group relative flex flex-col bg-white rounded-xl border transition-all duration-200 cursor-pointer ${address.isDefault ? 'border-indigo-200 ring-1 ring-indigo-500/20 shadow-sm' : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'}`}
                            >
                                {address.isDefault && (
                                    <div className="absolute -top-3 left-4">
                                        <span className="inline-flex items-center rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-medium text-white shadow-sm ring-2 ring-white">
                                            Varsayılan
                                        </span>
                                    </div>
                                )}

                                <div className="p-5 flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${address.type === 'home' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                                                {address.type === 'home' ? <Home className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{address.title}</h3>
                                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{address.type === 'home' ? 'Ev' : 'İş'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2.5">
                                        <div className="flex items-center gap-3 text-sm text-gray-900 font-medium">
                                            <div className="w-5 flex justify-center">
                                                <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                                            </div>
                                            {address.fullName}
                                        </div>
                                        <div className="flex items-start gap-3 text-sm text-gray-600">
                                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <span className="leading-relaxed">
                                                {address.address}
                                                <br />
                                                <span className="text-gray-500">{address.district} / {address.city}</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                            <span>{address.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 rounded-b-xl flex items-center justify-end gap-3">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); }}
                                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                                    >
                                        <Edit2 className="h-3.5 w-3.5" />
                                        Düzenle
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); }}
                                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-white border border-gray-200 rounded-md hover:bg-red-50 hover:border-red-100 transition-colors"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Sil
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}