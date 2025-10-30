'use client';

import LineChart from '../charts/LineChart';
import { formatCurrency } from '@/lib/utils';

interface RevenueChartProps {
    data: Array<{
        date: string;
        revenue: number;
        orders: number;
    }>;
}

export default function RevenueChart({ data }: RevenueChartProps) {
    const chartData = data.map((item) => ({
        label: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: item.revenue,
    }));

    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const averageRevenue = totalRevenue / data.length;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Revenue Over Time</h2>
                    <p className="text-sm text-gray-500 mt-1">Daily revenue trends</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(totalRevenue)}
                    </p>
                </div>
            </div>

            <div className="mb-4">
                <LineChart data={chartData} height={300} color="#10b981" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                    <p className="text-xs text-gray-500">Avg Daily Revenue</p>
                    <p className="text-lg font-semibold text-gray-900">
                        {formatCurrency(averageRevenue)}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Total Orders</p>
                    <p className="text-lg font-semibold text-gray-900">
                        {data.reduce((sum, item) => sum + item.orders, 0).toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Peak Day</p>
                    <p className="text-lg font-semibold text-gray-900">
                        {formatCurrency(Math.max(...data.map(d => d.revenue)))}
                    </p>
                </div>
            </div>
        </div>
    );
}

