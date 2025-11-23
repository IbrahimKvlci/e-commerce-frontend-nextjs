import { Country } from "./Country";
import { District } from "./District";
import { City } from "./City";
import { Neighborhood } from "./Neighborhood";

export interface AddressDetail {
    id: number;
    addressTitle: string;
    name: string;
    surname: string;
    phone: string;
    address: string;
    postalCode: string;
    country: Country;
    district: District;
    city: City;
    neighborhood: Neighborhood;
    defaultAddress: boolean;
}