"use client";

import React, { useEffect, useState } from "react";
import { AddressDetailRequest } from "@/models/address/AddressDetailRequest";
import { Country } from "@/models/address/Country";
import { City } from "@/models/address/City";
import { District } from "@/models/address/District";
import { Neighborhood } from "@/models/address/Neighborhood";
import CountryClientService from "@/services/address/CountryClientService";
import CityClientService from "@/services/address/CityClientService";
import DistrictClientService from "@/services/address/DistrictClientService";
import NeighborhoodClientService from "@/services/address/NeighborhoodClientService";
import AddressClientService from "@/services/address/AddressClientService";
import { AddressDetail } from "@/models/address/AddressDetail";

interface AddressFormProps {
    initialData?: AddressDetail;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function AddressForm({ initialData, onCancel, onSuccess }: AddressFormProps) {
    const [formData, setFormData] = useState<AddressDetailRequest>({
        addressTitle: initialData?.addressTitle || "",
        name: initialData?.name || "",
        surname: initialData?.surname || "",
        phone: initialData?.phone || "",
        address: initialData?.address || "",
        postalCode: initialData?.postalCode || "",
        countryId: initialData?.country.id || 0,
        cityId: initialData?.city.id || 0,
        districtId: initialData?.district.id || 0,
        neighborhoodId: initialData?.neighborhood.id || 0,
        defaultAddress: initialData?.defaultAddress || false,
    });

    const [countries, setCountries] = useState<Country[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const countryService = new CountryClientService();
    const cityService = new CityClientService();
    const districtService = new DistrictClientService();
    const neighborhoodService = new NeighborhoodClientService();
    const addressService = new AddressClientService();

    // Load Countries on Mount
    useEffect(() => {
        countryService.getCountries().then((res) => setCountries(res.data));
    }, []);

    // Load Cities when Country Changes
    useEffect(() => {
        if (formData.countryId) {
            cityService.getCitiesByCountry(formData.countryId).then((res) => setCities(res.data));
            if (!initialData || formData.countryId !== initialData.country.id) {
                // Reset dependent fields if manually changed
                setFormData(prev => ({ ...prev, cityId: 0, districtId: 0, neighborhoodId: 0 }));
            }
        } else {
            setCities([]);
        }
    }, [formData.countryId]);

    // Load Districts when City Changes
    useEffect(() => {
        if (formData.cityId) {
            districtService.getDistrictsByCity(formData.cityId).then((res) => setDistricts(res.data));
            if (!initialData || formData.cityId !== initialData.city.id) {
                setFormData(prev => ({ ...prev, districtId: 0, neighborhoodId: 0 }));
            }
        } else {
            setDistricts([]);
        }
    }, [formData.cityId]);

    // Load Neighborhoods when District Changes
    useEffect(() => {
        if (formData.districtId) {
            neighborhoodService.getNeighborhoodsByDistrict(formData.districtId).then((res) => setNeighborhoods(res.data));
            if (!initialData || formData.districtId !== initialData.district.id) {
                setFormData(prev => ({ ...prev, neighborhoodId: 0 }));
            }
        } else {
            setNeighborhoods([]);
        }
    }, [formData.districtId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? val : name.endsWith("Id") ? Number(val) : val,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (initialData) {
                await addressService.updateAddress(initialData.id, formData);
            } else {
                await addressService.addAddress(formData);
            }
            onSuccess();
        } catch (err) {
            console.error(err);
            setError("Failed to save address. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address Title</label>
                    <input type="text" name="addressTitle" value={formData.addressTitle} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2" placeholder="e.g. Home, Office" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <select name="countryId" value={formData.countryId} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2">
                        <option value={0}>Select Country</option>
                        {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <select name="cityId" value={formData.cityId} onChange={handleChange} required disabled={!formData.countryId} className="w-full border border-gray-300 rounded p-2">
                        <option value={0}>Select City</option>
                        {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">District</label>
                    <select name="districtId" value={formData.districtId} onChange={handleChange} required disabled={!formData.cityId} className="w-full border border-gray-300 rounded p-2">
                        <option value={0}>Select District</option>
                        {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Neighborhood</label>
                    <select name="neighborhoodId" value={formData.neighborhoodId} onChange={handleChange} required disabled={!formData.districtId} className="w-full border border-gray-300 rounded p-2">
                        <option value={0}>Select Neighborhood</option>
                        {neighborhoods.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Full Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2" rows={3}></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required className="w-full border border-gray-300 rounded p-2" />
            </div>

            <div className="flex items-center">
                <input type="checkbox" name="defaultAddress" checked={formData.defaultAddress} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                <label className="ml-2 block text-sm text-gray-900">Set as default address</label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
                <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                    {loading ? "Saving..." : initialData ? "Update Address" : "Save Address"}
                </button>
            </div>
        </form>
    );
}
