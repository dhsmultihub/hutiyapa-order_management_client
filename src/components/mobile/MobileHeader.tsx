'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
    Bars3Icon,
    BellIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import ConnectionStatus from '../realtime/ConnectionStatus';
import NotificationCenter from '../realtime/NotificationCenter';

export default function MobileHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-40 bg-white border-b border-gray-200 md:hidden">
                <div className="flex items-center justify-between px-4 h-14">
                    {/* Left: Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    {/* Center: Logo */}
                    <Link href="/" className="text-xl font-bold text-blue-600">
                        OrderHub
                    </Link>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-3">
                        <ConnectionStatus />
                        <NotificationCenter />
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
                        {/* Menu Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900">Menu</h2>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <nav className="p-4 space-y-2">
                            <Link
                                href="/orders"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Orders
                            </Link>
                            <Link
                                href="/analytics"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Analytics
                            </Link>
                            <Link
                                href="/profile"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Profile
                            </Link>
                            <Link
                                href="/settings"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Settings
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}

