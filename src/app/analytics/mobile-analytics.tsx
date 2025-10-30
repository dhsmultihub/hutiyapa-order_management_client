'use client';

import { useState } from 'react';
import { useOrderStatistics } from '@/hooks/use-orders';
import { formatCurrency, formatCompactNumber } from '@/lib/utils';
import { formatCompactNumber as formatMobileNumber } from '@/lib/mobile-utils';
import OrderStatus from '../orders/components/OrderStatus';
import {
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ShoppingBagIcon,
    CurrencyDollarIcon,
    ClockIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function MobileAnalytics() {
    const { statistics, isLoading } = useOrderStatistics();
    const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (!statistics) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500">No analytics data available</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Period Selector */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {['today', 'week', 'month'].map((period) => (
                    <button
                        key={period}
                        onClick={() => setSelectedPeriod(period as any)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedPeriod === period
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 active:bg-gray-200'
                            }`}
                    >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                ))}
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
                <MetricCard
                    icon={<ShoppingBagIcon className="w-5 h-5" />}
                    label="Total Orders"
                    value={formatMobileNumber(statistics.total)}
                    color="blue"
                />
                <MetricCard
                    icon={<CurrencyDollarIcon className="w-5 h-5" />}
                    label="Revenue"
                    value={formatCurrency(statistics.total * 150, 'USD')}
                    color="green"
                />
                <MetricCard
                    icon={<ClockIcon className="w-5 h-5" />}
                    label="Processing"
                    value={formatMobileNumber(statistics.processing)}
                    color="yellow"
                />
                <MetricCard
                    icon={<CheckCircleIcon className="w-5 h-5" />}
                    label="Completed"
                    value={formatMobileNumber(statistics.delivered)}
                    color="green"
                />
            </div>

            {/* Status Breakdown */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <ChartBarIcon className="w-5 h-5 mr-2" />
                    Order Status Breakdown
                </h3>
                <div className="space-y-3">
                    <StatusRow label="Pending" count={statistics.pending} total={statistics.total} />
                    <StatusRow label="Processing" count={statistics.processing} total={statistics.total} />
                    <StatusRow label="Shipped" count={statistics.shipped} total={statistics.total} />
                    <StatusRow label="Delivered" count={statistics.delivered} total={statistics.total} />
                </div>
            </div>

            {/* Quick Insights */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                <div className="flex items-center mb-2">
                    <ArrowTrendingUpIcon className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Quick Insights</span>
                </div>
                <p className="text-sm opacity-90">
                    {statistics.processing > 0
                        ? `You have ${statistics.processing} orders currently being processed`
                        : 'All orders are up to date!'}
                </p>
            </div>
        </div>
    );
}

interface MetricCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: 'blue' | 'green' | 'yellow' | 'purple';
}

function MetricCard({ icon, label, value, color }: MetricCardProps) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        green: 'bg-green-50 text-green-600 border-green-200',
        yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200',
    };

    return (
        <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
            <div className="flex items-center mb-2">{icon}</div>
            <p className="text-2xl font-bold mb-1">{value}</p>
            <p className="text-xs opacity-75">{label}</p>
        </div>
    );
}

interface StatusRowProps {
    label: string;
    count: number;
    total: number;
}

function StatusRow({ label, count, total }: StatusRowProps) {
    const percentage = total > 0 ? (count / total) * 100 : 0;

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="text-sm font-medium text-gray-900">{count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

