'use client';

import { useState } from 'react';
import { OrderFilters } from '@/types/order';
import {
    ORDER_STATUS,
    PAYMENT_STATUS,
    ORDER_STATUS_LABELS,
    PAYMENT_STATUS_LABELS
} from '@/lib/constants';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface OrderFilterProps {
    filters: OrderFilters;
    onFilterChange: (filters: OrderFilters) => void;
}

export default function OrderFilter({ filters, onFilterChange }: OrderFilterProps) {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [localFilters, setLocalFilters] = useState<OrderFilters>(filters);

    const handleSearch = () => {
        onFilterChange(localFilters);
    };

    const handleReset = () => {
        const emptyFilters: OrderFilters = {};
        setLocalFilters(emptyFilters);
        onFilterChange(emptyFilters);
    };

    const handleStatusToggle = (status: string) => {
        const currentStatuses = localFilters.status || [];
        const newStatuses = currentStatuses.includes(status as any)
            ? currentStatuses.filter(s => s !== status)
            : [...currentStatuses, status as any];

        setLocalFilters({ ...localFilters, status: newStatuses.length > 0 ? newStatuses : undefined });
    };

    const handlePaymentStatusToggle = (status: string) => {
        const currentStatuses = localFilters.paymentStatus || [];
        const newStatuses = currentStatuses.includes(status as any)
            ? currentStatuses.filter(s => s !== status)
            : [...currentStatuses, status as any];

        setLocalFilters({ ...localFilters, paymentStatus: newStatuses.length > 0 ? newStatuses : undefined });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            {/* Search Bar */}
            <div className="flex gap-2 mb-4">
                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search by order number, customer name, or email..."
                        value={localFilters.search || ''}
                        onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                    <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                    Search
                </button>
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                    <FunnelIcon className="w-5 h-5 mr-2" />
                    Filters
                </button>
            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
                <div className="border-t border-gray-200 pt-4 space-y-4">
                    {/* Order Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Order Status
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {Object.values(ORDER_STATUS).map((status) => {
                                const isSelected = localFilters.status?.includes(status as any);
                                return (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusToggle(status)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${isSelected
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {ORDER_STATUS_LABELS[status]}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Payment Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Payment Status
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {Object.values(PAYMENT_STATUS).map((status) => {
                                const isSelected = localFilters.paymentStatus?.includes(status as any);
                                return (
                                    <button
                                        key={status}
                                        onClick={() => handlePaymentStatusToggle(status)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${isSelected
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {PAYMENT_STATUS_LABELS[status]}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Date Range Filter */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={localFilters.dateFrom || ''}
                                onChange={(e) => setLocalFilters({ ...localFilters, dateFrom: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={localFilters.dateTo || ''}
                                onChange={(e) => setLocalFilters({ ...localFilters, dateTo: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Amount Range Filter */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0"
                                value={localFilters.minAmount || ''}
                                onChange={(e) => setLocalFilters({ ...localFilters, minAmount: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Any"
                                value={localFilters.maxAmount || ''}
                                onChange={(e) => setLocalFilters({ ...localFilters, maxAmount: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            onClick={handleReset}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
                        >
                            <XMarkIcon className="w-4 h-4 mr-2" />
                            Clear Filters
                        </button>
                        <button
                            onClick={handleSearch}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

