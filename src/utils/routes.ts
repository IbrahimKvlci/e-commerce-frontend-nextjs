import { createSlug } from "./formatters";

export const ROUTES = {
    category: (name: string, id: string) => `/category/${createSlug(name)}-c-${id}`,
    cart: "/cart",
    checkout: "/checkout",
    login: "/authentication/login",
    register: "/authentication/register",
    logout: "/authentication/logout",
    profile: "/profile",
    orders: "/profile/orders",
    search: "/search",
    home: "/"
}