"use client"

import { MapPin, Package, User, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {

    const pathname = usePathname();

    const navigation = [
        { name: 'Profil', href: '/profile', icon: User },
        { name: 'Siparişler', href: '/profile/orders', icon: Package },
        { name: 'Adresler', href: '/profile/addresses', icon: MapPin },
    ];

    return (
        <div>
            {/* Sidebar Navigation */}
            <nav className="space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group rounded-xl px-3 py-3 flex items-center text-sm font-medium transition-all duration-200 ${isActive
                                ? 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-sm ring-1 ring-gray-200'
                                : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm hover:ring-1 hover:ring-gray-200'
                                }`}
                        >
                            <item.icon
                                className={`flex-shrink-0 -ml-1 mr-3 h-5 w-5 ${isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                                    }`}
                            />
                            <span className="truncate">{item.name}</span>
                        </Link>
                    );
                })}
                <div className="pt-4 mt-4 border-t border-gray-200">
                    <a href="/authentication/logout" className="text-red-600 hover:bg-red-50 group rounded-xl px-3 py-3 flex items-center text-sm font-medium transition-all duration-200">
                        <LogOut className="flex-shrink-0 -ml-1 mr-3 h-5 w-5 text-red-500" />
                        <span className="truncate">Çıkış Yap</span>
                    </a>
                </div>
            </nav>
        </div>
    );
};
export default Sidebar;  