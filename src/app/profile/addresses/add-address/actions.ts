"use server"

import CityClientService from "@/services/address/CityClientService"
import CountryClientService from "@/services/address/CountryClientService"
import DistrictClientService from "@/services/address/DistrictClientService"
import NeighborhoodClientService from "@/services/address/NeighborhoodClientService"

export default async function addAddressAction(formData: FormData) {
    const data = Object.fromEntries(formData)
}