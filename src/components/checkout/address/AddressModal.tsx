"use client";

import React, { useState } from "react";
import { AddressDetail } from "@/models/address/AddressDetail";
import AddressForm from "./AddressForm";
import AddressClientService from "@/services/address/AddressClientService";

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    addresses: AddressDetail[];
    onAddressUpdated: () => void;
    onSelectAddress: (address: AddressDetail) => void;
    selectedAddressId?: number;
}

export default function AddressModal({
    isOpen,
    onClose,
    addresses,
    onAddressUpdated,
    onSelectAddress,
    selectedAddressId
}: AddressModalProps) {
    const [view, setView] = useState<"LIST" | "FORM">("LIST");
    const [editingAddress, setEditingAddress] = useState<AddressDetail | undefined>(undefined);
    const addressService = new AddressClientService();

    if (!isOpen) return null;

    const handleAddNew = () => {
        setEditingAddress(undefined);
        setView("FORM");
    };

    const handleEdit = (address: AddressDetail, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingAddress(address);
        setView("FORM");
    };

    const handleDelete = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this address?")) {
            await addressService.deleteAddress(id);
            onAddressUpdated();
        }
    };

    const handleFormSuccess = () => {
        onAddressUpdated();
        setView("LIST");
    };

    const handleFormCancel = () => {
        setView("LIST");
        setEditingAddress(undefined);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
                <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {view === "LIST" ? "My Addresses" : (editingAddress ? "Edit Address" : "Add New Address")}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 flex-1">
                    {view === "LIST" ? (
                        <div className="space-y-4">
                            <button
                                onClick={handleAddNew}
                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add New Address
                            </button>

                            <div className="grid grid-cols-1 gap-4">
                                {addresses.map((addr) => (
                                    <div
                                        key={addr.id}
                                        onClick={() => { onSelectAddress(addr); onClose(); }}
                                        className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-all ${selectedAddressId === addr.id ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200'}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-900">{addr.addressTitle}</span>
                                                    {addr.defaultAddress && <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Default</span>}
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">{addr.name} {addr.surname}</p>
                                                <p className="text-sm text-gray-600">{addr.phone}</p>
                                                <p className="text-sm text-gray-600 mt-2">{addr.address}</p>
                                                <p className="text-sm text-gray-500">{addr.neighborhood.name}, {addr.district.name}, {addr.city.name}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => handleEdit(addr, e)}
                                                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(addr.id, e)}
                                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <AddressForm
                            initialData={editingAddress}
                            onCancel={handleFormCancel}
                            onSuccess={handleFormSuccess}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
