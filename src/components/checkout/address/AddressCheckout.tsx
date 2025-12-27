"use client";

import React, { useEffect, useState } from "react";
import AddressClientService from "@/services/address/AddressClientService";
import { AddressDetail } from "@/models/address/AddressDetail";
import AddressModal from "./AddressModal";
import { useCheckout } from "@/context/CheckoutContext";

export default function AddressCheckout() {
    const [addresses, setAddresses] = useState<AddressDetail[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<AddressDetail | null>(null);
    const [selectedBillingAddress, setSelectedBillingAddress] = useState<AddressDetail | null>(null);
    const [billAddressSameAsDelivery, setBillAddressSameAsDelivery] = useState(true);
    const [loading, setLoading] = useState(true);
    const [activeModal, setActiveModal] = useState<'delivery' | 'billing' | null>(null);
    const { setAddressValid, setCreditCardCheckout, creditCardCheckout } = useCheckout();

    const addressService = new AddressClientService();

    const handleSelectedAddress = (address: AddressDetail | null) => {
        setSelectedAddress(address);
        setCreditCardCheckout(prev => ({
            ...(prev ?? {}),
            shipAddressId: address?.id
        }));
        if (billAddressSameAsDelivery) {
            handleSelectedBillingAddress(address);
        }
    };

    const handleSelectedBillingAddress = (address: AddressDetail | null) => {
        setSelectedBillingAddress(address);
        setCreditCardCheckout(prev => ({
            ...(prev ?? {}),
            billAddressId: address?.id
        }));
    };

    const fetchAddresses = async () => {
        setLoading(true);
        const response = await addressService.getAddressesOfCustomer();
        if (response.data) {
            setAddresses(response.data);

            if (selectedAddress) {
                const found = response.data.find(a => a.id === selectedAddress.id);
                if (found) {
                    handleSelectedAddress(found);
                } else {
                    selectDefaultOrFirst(response.data, 'delivery');
                }
            } else {
                selectDefaultOrFirst(response.data, 'delivery');
            }

            if (selectedBillingAddress) {
                const found = response.data.find(a => a.id === selectedBillingAddress.id);
                if (found) {
                    handleSelectedBillingAddress(found);
                } else {
                    selectDefaultOrFirst(response.data, 'billing');
                }
            } else if (!billAddressSameAsDelivery) {
                selectDefaultOrFirst(response.data, 'billing');
            }
        }
        setLoading(false);
    };

    const selectDefaultOrFirst = (list: AddressDetail[], type: 'delivery' | 'billing') => {
        if (!list || list.length === 0) {
            if (type === 'delivery') handleSelectedAddress(null);
            else handleSelectedBillingAddress(null);
            return;
        }
        const defaultAddr = list.find(a => a.defaultAddress);
        const addr = defaultAddr || list[0];

        if (type === 'delivery') handleSelectedAddress(addr);
        else handleSelectedBillingAddress(addr);
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    useEffect(() => {
        if (billAddressSameAsDelivery) {
            setAddressValid(!!selectedAddress);
        } else {
            setAddressValid(!!selectedAddress && !!selectedBillingAddress);
        }
    }, [selectedAddress, selectedBillingAddress, billAddressSameAsDelivery, setAddressValid]);

    const handleAddressUpdated = () => {
        fetchAddresses();
    };

    const handleSelectAddress = (address: AddressDetail) => {
        if (activeModal === 'delivery') {
            handleSelectedAddress(address);
        } else if (activeModal === 'billing') {
            handleSelectedBillingAddress(address);
        }
    };

    const toggleBillingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setBillAddressSameAsDelivery(checked);
        if (checked) {
            handleSelectedBillingAddress(selectedAddress);
        } else if (!selectedBillingAddress && addresses.length > 0) {
            // Auto-select something for billing if turning off "same as"
            selectDefaultOrFirst(addresses, 'billing');
        }
    };

    const renderAddressCard = (address: AddressDetail | null, type: 'delivery' | 'billing') => {
        const title = type === 'delivery' ? 'Delivery Address' : 'Bill Address';
        const openModal = () => setActiveModal(type);

        return (
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    <button
                        onClick={openModal}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Change / Add
                    </button>
                </div>

                {address ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={openModal} className="text-gray-400 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-blue-50 p-3 rounded-full mr-4 text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-gray-900 text-lg">{address.addressTitle}</span>
                                </div>
                                <p className="text-gray-700 font-medium">{address.name} {address.surname}</p>
                                <p className="text-gray-600 text-sm mt-1">{address.phone}</p>
                                <p className="text-gray-600 mt-2 leading-relaxed">
                                    {address.address}<br />
                                    <span className="text-gray-500">{address.neighborhood.name}, {address.district.name}, {address.city.name}, {address.country.name}</span>
                                </p>
                                {address.defaultAddress && (
                                    <span className="inline-block mt-3 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">
                                        Default Delivery Address
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div onClick={openModal} className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Add {title}</span>
                    </div>
                )}
            </div>
        );
    };

    if (loading && addresses.length === 0) {
        return <div className="p-6 bg-white rounded-lg shadow animate-pulse h-40"></div>;
    }

    return (
        <div className="w-full">
            {renderAddressCard(selectedAddress, 'delivery')}

            <div className="flex items-center mb-6">
                <input
                    id="billAddressSame"
                    type="checkbox"
                    checked={billAddressSameAsDelivery}
                    onChange={toggleBillingAddress}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="billAddressSame" className="ml-2 text-sm font-medium text-gray-900">
                    Bill address is same with delivery address
                </label>
            </div>

            {!billAddressSameAsDelivery && renderAddressCard(selectedBillingAddress, 'billing')}

            <AddressModal
                isOpen={!!activeModal}
                onClose={() => setActiveModal(null)}
                addresses={addresses}
                onAddressUpdated={handleAddressUpdated}
                onSelectAddress={handleSelectAddress}
                selectedAddressId={activeModal === 'delivery' ? selectedAddress?.id : selectedBillingAddress?.id}
            />
        </div>
    );
}