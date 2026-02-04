import Categories from "./NavbarCategories";
import ProfileDropdown from "../ProfileDropdown";
import { isUserLoggedIn } from "@/lib/auth";
import SearchBar from "./SearchBar";

export default async function Navbar() {

    const isLoggedIn = await isUserLoggedIn();
    return (
        <div>
            {/* Top Navbar: Logo, Searchbar, Favorites, Cart, Login/Logout */}
            <nav className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded">
                    <span className="font-extrabold text-2xl text-gray-900">E-Shop</span>
                </a>
                {/* Search Bar */}
                <SearchBar />
                {/* Icon Buttons: Favourite, Cart, Login/Logout */}
                <div className="flex items-center space-x-6">
                    <a href="/favourites" className="text-gray-600 hover:text-blue-600 transition-colors" title="Favourites">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.638l1.318-1.32a4.5 4.5 0 1 1 6.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z" />
                        </svg>
                    </a>
                    <a href="/cart" className="text-gray-600 hover:text-blue-600 transition-colors" title="Cart">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M1 1h4l2.68 13.39A2 2 0 0 0 9.63 17h7.72a2 2 0 0 0 1.95-1.61l2.36-10.39A1 1 0 0 0 20.32 4H6" />
                        </svg>
                    </a>
                    <div className="flex items-center space-x-3">
                        {isLoggedIn ? (
                            <ProfileDropdown />
                        ) : (
                            <>
                                <a href="/authentication/login" className="flex items-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors font-medium space-x-2">
                                    <span>Giriş yap</span>
                                </a>
                                <a href="/authentication/register" className="flex items-center bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400 transition-colors font-medium space-x-2">
                                    <span>Kayıt ol</span>
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <Categories />
        </div>
    )
}
