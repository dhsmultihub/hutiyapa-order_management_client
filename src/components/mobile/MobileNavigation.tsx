'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HomeIcon,
    ShoppingBagIcon,
    ChartBarIcon,
    UserCircleIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import {
    HomeIcon as HomeIconSolid,
    ShoppingBagIcon as ShoppingBagIconSolid,
    ChartBarIcon as ChartBarIconSolid,
    UserCircleIcon as UserCircleIconSolid,
    Cog6ToothIcon as Cog6ToothIconSolid,
} from '@heroicons/react/24/solid';

const navigation = [
    {
        name: 'Home',
        href: '/',
        icon: HomeIcon,
        activeIcon: HomeIconSolid,
    },
    {
        name: 'Orders',
        href: '/orders',
        icon: ShoppingBagIcon,
        activeIcon: ShoppingBagIconSolid,
    },
    {
        name: 'Analytics',
        href: '/analytics',
        icon: ChartBarIcon,
        activeIcon: ChartBarIconSolid,
    },
    {
        name: 'Profile',
        href: '/profile',
        icon: UserCircleIcon,
        activeIcon: UserCircleIconSolid,
    },
];

export default function MobileNavigation() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
            <div className="flex items-center justify-around h-16">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = isActive ? item.activeIcon : item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive
                                    ? 'text-blue-600'
                                    : 'text-gray-600 active:bg-gray-100'
                                }`}
                        >
                            <Icon className="w-6 h-6 mb-1" />
                            <span className="text-xs font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

