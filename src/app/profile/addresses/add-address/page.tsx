"use client"

import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import addAddressAction from "./actions";
import { useEffect, useState } from "react";
import { Country } from "@/models/address/Country";
import CountryClientService from "@/services/address/CountryClientService";
import CityClientService from "@/services/address/CityClientService";
import { City } from "@/models/address/City";
import DistrictClientService from "@/services/address/DistrictClientService";
import { District } from "@/models/address/District";
import NeighborhoodClientService from "@/services/address/NeighborhoodClientService";
import { Neighborhood } from "@/models/address/Neighborhood";

export default function AddAddress() {
    const router = useRouter();

    const [countries, setCountries] = useState<Country[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [districts, setDistricts] = useState<District[]>([])
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])

    const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
    const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
    const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState<number | null>(null);

    useEffect(() => {
        const fetchCountries = async () => {
            const countryClientService = new CountryClientService();
            const response: Country[] = await countryClientService.getCountries();
            setCountries(response);
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            if (selectedCountryId === null) return;
            const cityClientService = new CityClientService();
            const response: City[] = await cityClientService.getCitiesByCountry(selectedCountryId);
            setCities(response);
        };
        fetchCities();
    }, [selectedCountryId]);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedCityId === null) return;
            const districtClientService = new DistrictClientService();
            const response: District[] = await districtClientService.getDistrictsByCity(selectedCityId);
            setDistricts(response);
        };
        fetchDistricts();
    }, [selectedCityId]);

    useEffect(() => {
        if (selectedDistrictId === null) return;
        const fetchNeighborhoods = async () => {
            const neighborhoodClientService = new NeighborhoodClientService();
            const response: Neighborhood[] = await neighborhoodClientService.getNeighborhoodsByDistrict(selectedDistrictId);
            setNeighborhoods(response);
        };
        fetchNeighborhoods();
    }, [selectedDistrictId]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
                <div className="px-6 py-6 border-b border-gray-100 flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 -ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Yeni Adres Ekle</h2>
                        <p className="text-sm text-gray-500 mt-1">Teslimat için yeni bir adres oluşturun.</p>
                    </div>
                </div>

                <div className="p-6">
                    <form action={addAddressAction} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Adres Başlığı */}
                            <div className="col-span-1 md:col-span-2">
                                <label htmlFor="addressTitle" className="block text-sm font-medium text-gray-700 mb-1">
                                    Adres Başlığı
                                </label>
                                <input
                                    type="text"
                                    id="addressTitle"
                                    name="addressTitle"
                                    placeholder="Örn: Evim, İşyerim"
                                    className="w-full rounded-lg bg-gray-50 border-transparent px-4 py-3 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
                                />
                            </div>

                            {/* Ad ve Soyad */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Ad
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full rounded-lg bg-gray-50 border-transparent px-4 py-3 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                                    Soyad
                                </label>
                                <input
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    className="w-full rounded-lg bg-gray-50 border-transparent px-4 py-3 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
                                />
                            </div>

                            {/* Telefon */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Telefon
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="05XX XXX XX XX"
                                    className="w-full rounded-lg bg-gray-50 border-transparent px-4 py-3 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
                                />
                            </div>

                            {/* Posta Kodu */}
                            <div>
                                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                                    Posta Kodu
                                </label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    className="w-full rounded-lg bg-gray-50 border-transparent px-4 py-3 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
                                />
                            </div>

                            {/* Ülke ve Şehir */}
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                    Ülke
                                </label>
                                <select
                                    id="country"
                                    name="countryId"
                                    className="w-full rounded-lg bg-gray-50 border-transparent px-4 py-3 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
                                    onChange={(e) => setSelectedCountryId(Number(e.target.value))}
                                >
                                    <option value="">Seçiniz</option>
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                    İl
                                </label>
                                <select
                                    id="city"
                                    name="cityId"
                                    className="w-full rounded-lg bg-gray-50 border-transparent px-4 py-3 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
                                    onChange={(e) => setSelectedCityId(Number(e.target.value))}
                                >
                                    <option value="">Seçiniz</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* İlçe ve Mahalle */}
                            <div>
                                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                                    İlçe
                                </label>
                                <select
                                    id="district"
                                    name="districtId"
                                    className="w-full rounded-lg bg-gray-50 border-transparent px-4 py-3 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
                                    onChange={(e) => setSelectedDistrictId(Number(e.target.value))}
                                >
                                    <option value="">Seçiniz</option>
                                    {districts.map((district) => (
                                        <option key={district.id} value={district.id}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                                    Mahalle
                                </label>
                                <select
                                    id="neighborhood"
                                    name="neighborhoodId"
                                    className="w-full rounded-lg bg-gray-50 border-transparent px-4 py-3 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
                                    onChange={(e) => setSelectedNeighborhoodId(Number(e.target.value))}
                                >
                                    <option value="">Seçiniz</option>
                                    {neighborhoods.map((neighborhood) => (
                                        <option key={neighborhood.id} value={neighborhood.id}>
                                            {neighborhood.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Açık Adres */}
                            <div className="col-span-1 md:col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Açık Adres
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    className="w-full rounded-lg bg-gray-50 border-transparent px-4 py-3 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-sm"
                                    placeholder="Cadde, sokak, kapı no vb. detayları giriniz"
                                ></textarea>
                            </div>

                            {/* Varsayılan Adres */}
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center">
                                    <input
                                        id="defaultAddress"
                                        name="defaultAddress"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="defaultAddress" className="ml-2 block text-sm text-gray-900">
                                        Bu adresi varsayılan teslimat adresi olarak kullan
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Kaydet
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}