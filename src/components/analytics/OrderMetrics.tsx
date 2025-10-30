'use client';

import { formatCurrency } from '@/lib/utils';
import {
    ShoppingBagIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';

interface OrderMetricsProps {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    totalCustomers: number;
    orderGrowth?: number;
    revenueGrowth?: number;
}

export default function OrderMetrics({
    totalOrders,
    totalRevenue,
    averageOrderValue,
    totalCustomers,
    orderGrowth = 0,
    revenueGrowth = 0,
}: OrderMetricsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
                title="Total Orders"
                value={totalOrders.toLocaleString()}
                icon={ShoppingBagIcon}
                color="blue"
                growth={orderGrowth}
            />
            <MetricCard
                title="Total Revenue"
                value={formatCurrency(totalRevenue)}
                icon={CurrencyDollarIcon}
                color="green"
                growth={revenueGrowth}
            />
            <MetricCard
                title="Avg Order Value"
                value={formatCurrency(averageOrderValue)}
                icon={ChartBarIcon}
                color="purple"
            />
            <MetricCard
                title="Total Customers"
                value={totalCustomers.toLocaleString()}
                icon={UserGroupIcon}
                color="orange"
            />
        </div>
    );
}

interface MetricCardProps {
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color: 'blue' | 'green' | 'purple' | 'orange';
    growth?: number;
}

function MetricCard({ title, value, icon: Icon, color, growth }: MetricCardProps) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        green: 'bg-green-50 text-green-600 border-green-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200',
        orange: 'bg-orange-50 text-orange-600 border-orange-200',
    };

    const iconColorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
        orange: 'bg-orange-100 text-orange-600',
    };

    return (
        <div className={`border rounded-lg p-6 ${colorClasses[color]}`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${iconColorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {growth !== undefined && growth !== 0 && (
                    <div
                        className={`flex items-center text-sm font-medium ${growth > 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                    >
                        {growth > 0 ? (
                            <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                        ) : (
                            <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(growth)}%
                    </div>
                )}
            </div>
            <h3 className="text-sm font-medium opacity-75 mb-1">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}

