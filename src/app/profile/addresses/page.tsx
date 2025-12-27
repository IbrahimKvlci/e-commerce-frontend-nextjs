"use client"

import { AddressDetail } from "@/models/address/AddressDetail";
import AddressClientService from "@/services/address/AddressClientService";
import { Plus, MapPin, Phone, Edit2, Trash2, Home, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Addresses() {
    const router = useRouter();
    const [addresses, setAddresses] = useState<AddressDetail[]>([]);

    useEffect(() => {
        const fetchAddresses = async () => {
            const addressClientService = new AddressClientService();
            const response = await addressClientService.getAddressesOfCustomer();
            setAddresses(response.data);
        };
        fetchAddresses();
    }, [])

    const handleSetDefault = async (clickedAddress: AddressDetail) => {
        const addressClientService = new AddressClientService();
        await addressClientService.updateAddress(clickedAddress.id, {
            addressTitle: clickedAddress.addressTitle,
            name: clickedAddress.name,
            surname: clickedAddress.surname,
            phone: clickedAddress.phone,
            address: clickedAddress.address,
            postalCode: clickedAddress.postalCode,
            countryId: clickedAddress.country.id,
            districtId: clickedAddress.district.id,
            cityId: clickedAddress.city.id,
            neighborhoodId: clickedAddress.neighborhood.id,
            defaultAddress: true
        });
        const response = await addressClientService.getAddressesOfCustomer();
        setAddresses(response.data);

    };

    const handleDelete = async (addressId: number) => {
        const addressClientService = new AddressClientService();
        const response = await addressClientService.deleteAddress(addressId);
        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        const res = await addressClientService.getAddressesOfCustomer();
        setAddresses(res.data);
    };

    const handleUpdate = (addressId: number) => {
        router.push(`/profile/addresses/update-address/${addressId}`);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
                <div className="px-6 py-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Kayıtlı Adreslerim</h2>
                        <p className="text-sm text-gray-500 mt-1">Teslimat adreslerinizi yönetin ve düzenleyin.</p>
                    </div>
                    <button onClick={() => router.push('/profile/addresses/add-address')} className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
                        <Plus className="h-4 w-4 mr-2" />
                        Yeni Adres Ekle
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map((address) => (
                            <div
                                key={address.id}
                                onClick={() => handleSetDefault(address)}
                                className={`group relative flex flex-col bg-white rounded-xl border transition-all duration-200 cursor-pointer ${address.defaultAddress ? 'border-indigo-200 ring-1 ring-indigo-500/20 shadow-sm' : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'}`}
                            >
                                {address.defaultAddress && (
                                    <div className="absolute -top-3 left-4">
                                        <span className="inline-flex items-center rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-medium text-white shadow-sm ring-2 ring-white">
                                            Varsayılan
                                        </span>
                                    </div>
                                )}

                                <div className="p-5 flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{address.addressTitle}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2.5">
                                        <div className="flex items-center gap-3 text-sm text-gray-900 font-medium">
                                            <div className="w-5 flex justify-center">
                                                <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                                            </div>
                                            {address.name + " " + address.surname}
                                        </div>
                                        <div className="flex items-start gap-3 text-sm text-gray-600">
                                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <span className="leading-relaxed">
                                                {address.address}
                                                <br />
                                                <span className="text-gray-500">{address.district.name} / {address.city.name}</span>
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
                                        onClick={(e) => { handleUpdate(address.id); e.stopPropagation(); }}
                                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                                    >
                                        <Edit2 className="h-3.5 w-3.5" />
                                        Düzenle
                                    </button>
                                    <button
                                        onClick={(e) => { handleDelete(address.id); e.stopPropagation(); }}
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