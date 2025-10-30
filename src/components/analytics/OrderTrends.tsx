'use client';

import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';
import { ORDER_STATUS_LABELS } from '@/lib/constants';

interface OrderTrendsProps {
    ordersByStatus: Record<string, number>;
    ordersByDay?: Array<{
        date: string;
        count: number;
    }>;
}

export default function OrderTrends({ ordersByStatus, ordersByDay }: OrderTrendsProps) {
    const statusData = Object.entries(ordersByStatus).map(([status, count]) => ({
        label: ORDER_STATUS_LABELS[status] || status,
        value: count,
    }));

    const dailyData = ordersByDay?.map((item) => ({
        label: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: item.count,
    })) || [];

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Orders by Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Orders by Status</h2>
                <PieChart data={statusData} size={250} />
            </div>

            {/* Daily Orders */}
            {dailyData.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Daily Orders</h2>
                    <BarChart data={dailyData} height={300} color="#3b82f6" />
                </div>
            )}
        </div>
    );
}

