'use client';

import { UserGroupIcon, ShoppingBagIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface CustomerAnalyticsProps {
    totalCustomers: number;
    newCustomers?: number;
    repeatCustomers?: number;
    averageOrdersPerCustomer?: number;
    averageLifetimeValue?: number;
}

export default function CustomerAnalytics({
    totalCustomers,
    newCustomers = 0,
    repeatCustomers = 0,
    averageOrdersPerCustomer = 0,
    averageLifetimeValue = 0,
}: CustomerAnalyticsProps) {
    const repeatRate = totalCustomers > 0 ? (repeatCustomers / totalCustomers) * 100 : 0;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Customers */}
                <div className="flex items-start">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <UserGroupIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-gray-500">Total Customers</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {totalCustomers.toLocaleString()}
                        </p>
                        {newCustomers > 0 && (
                            <p className="text-xs text-green-600 mt-1">
                                +{newCustomers} new this period
                            </p>
                        )}
                    </div>
                </div>

                {/* Repeat Customers */}
                <div className="flex items-start">
                    <div className="p-3 bg-purple-100 rounded-lg">
                        <ShoppingBagIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-gray-500">Repeat Rate</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {repeatRate.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                            {repeatCustomers} repeat customers
                        </p>
                    </div>
                </div>

                {/* Average Lifetime Value */}
                <div className="flex items-start">
                    <div className="p-3 bg-green-100 rounded-lg">
                        <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-gray-500">Avg Lifetime Value</p>
                        <p className="text-2xl font-bold text-gray-900">
                            ${averageLifetimeValue.toFixed(2)}
                        </p>
                        {averageOrdersPerCustomer > 0 && (
                            <p className="text-xs text-gray-600 mt-1">
                                {averageOrdersPerCustomer.toFixed(1)} orders/customer
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Progress Bars */}
            <div className="mt-8 space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">New Customers</span>
                        <span className="font-medium">
                            {totalCustomers > 0 ? ((newCustomers / totalCustomers) * 100).toFixed(1) : 0}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{
                                width: `${totalCustomers > 0 ? (newCustomers / totalCustomers) * 100 : 0}%`,
                            }}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Repeat Customers</span>
                        <span className="font-medium">{repeatRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${repeatRate}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

