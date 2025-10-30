'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useOrders, useOrderStatistics } from '@/hooks/use-orders';
import { useOrderUpdates } from '@/hooks/use-order-updates';
import { useResponsive } from '@/hooks/use-responsive';
import { OrderFilters } from '@/types/order';
import OrderCard from './components/OrderCard';
import MobileOrderCard from '@/components/mobile/MobileOrderCard';
import OrderFilter from './components/OrderFilter';
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';
import LiveOrderUpdates from '@/components/realtime/LiveOrderUpdates';
import { PlusIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';

export default function OrdersPage() {
    const [filters, setFilters] = useState<OrderFilters>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [mounted, setMounted] = useState(false);

    const { data, isLoading, error } = useOrders(filters, currentPage, DEFAULT_PAGE_SIZE);
    const { statistics, isLoading: statsLoading } = useOrderStatistics();
    const { latestUpdate } = useOrderUpdates();
    const { isMobile } = useResponsive();

    // Prevent hydration mismatch
    useState(() => {
        setMounted(true);
    });

    const handleFilterChange = (newFilters: OrderFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page when filters change
    };

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800">Error loading orders: {error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Orders</h1>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">
                        Manage and track all your orders
                    </p>
                </div>
                <div className="flex gap-2 md:gap-3">
                    <Link href="/analytics" className="hidden md:inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <ChartBarIcon className="w-5 h-5 mr-2" />
                        Analytics
                    </Link>
                    <Link href="/orders/new" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Create Order
                    </Link>
                </div>
            </div>

            {/* Statistics */}
            {!statsLoading && statistics && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <StatCard
                        label="Total Orders"
                        value={statistics.total.toString()}
                        color="blue"
                    />
                    <StatCard
                        label="Processing"
                        value={statistics.processing.toString()}
                        color="purple"
                    />
                    <StatCard
                        label="Shipped"
                        value={statistics.shipped.toString()}
                        color="indigo"
                    />
                    <StatCard
                        label="Delivered"
                        value={statistics.delivered.toString()}
                        color="green"
                    />
                </div>
            )}

            {/* Live Updates Banner */}
            {latestUpdate && (
                <div className="mb-6">
                    <LiveOrderUpdates />
                </div>
            )}

            {/* Filters */}
            <OrderFilter filters={filters} onFilterChange={handleFilterChange} />

            {/* Orders List */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader />
                </div>
            ) : data?.data && data.data.length > 0 ? (
                <>
                    <div className="grid gap-3 md:gap-4 mb-6">
                        {data.data.map((order) => (
                            <div key={order.id}>
                                <div className="md:hidden">
                                    <MobileOrderCard order={order} />
                                </div>
                                <div className="hidden md:block">
                                    <OrderCard order={order} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {data.pagination && data.pagination.totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2">
                            <button
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {currentPage} of {data.pagination.totalPages}
                            </span>
                            <button
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={currentPage === data.pagination.totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <EmptyState
                    title="No orders found"
                    description="Get started by creating your first order"
                    actionLabel="Create Order"
                    actionHref="/orders/new"
                />
            )}
        </div>
    );
}

function StatCard({
    label,
    value,
    color
}: {
    label: string;
    value: string;
    color: 'blue' | 'green' | 'purple' | 'indigo';
}) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        green: 'bg-green-50 text-green-600 border-green-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    };

    return (
        <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
            <p className="text-2xl font-bold mb-1">{value}</p>
            <p className="text-sm opacity-75">{label}</p>
        </div>
    );
}

