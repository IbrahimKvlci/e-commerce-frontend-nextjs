"use server"

import AddressServerService from "@/services/address/AddressServerService"

export default async function updateAddressAction(formData: FormData, id: number) {
    const data = Object.fromEntries(formData)

    if (!data.countryId || !data.cityId || !data.districtId || !data.neighborhoodId
        || !data.addressTitle || !data.name || !data.surname || !data.phone || !data.address || !data.postalCode) {
        return { success: false, message: "Lütfen tüm alanları doldurunuz." };
    }

    const addressServerService = new AddressServerService()

    try {
        return await addressServerService.updateAddress(Number(id), {
            addressTitle: data.addressTitle.toString(),
            name: data.name.toString(),
            surname: data.surname.toString(),
            phone: data.phone.toString(),
            address: data.address.toString(),
            postalCode: data.postalCode.toString(),
            countryId: Number(data.countryId),
            districtId: Number(data.districtId),
            cityId: Number(data.cityId),
            neighborhoodId: Number(data.neighborhoodId),
            defaultAddress: data.defaultAddress === "on"
        })

    } catch (error) {
        console.error("Adres güncellenirken hata oluştu:", error);
        return { success: false, message: "Adres güncellenirken bir hata oluştu." }
    }
}