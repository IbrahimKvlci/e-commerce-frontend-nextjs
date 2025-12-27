export interface AddressDetailRequest {
    addressTitle: string;
    name: string;
    surname: string;
    phone: string;
    address: string;
    postalCode: string;
    countryId: number;
    districtId: number;
    cityId: number;
    neighborhoodId: number;
    defaultAddress: boolean;
}
