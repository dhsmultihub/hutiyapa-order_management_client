'use client';

import Link from 'next/link';
import { Order } from '@/types/order';
import { formatCurrency, formatDate } from '@/lib/utils';
import OrderStatus from './OrderStatus';
import {
    CalendarIcon,
    UserIcon,
    CurrencyDollarIcon,
    ShoppingBagIcon
} from '@heroicons/react/24/outline';

interface OrderCardProps {
    order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
    return (
        <Link href={`/orders/${order.id}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {order.orderNumber}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {formatDate(order.createdAt, 'short')}
                        </div>
                    </div>
                    <OrderStatus status={order.status} />
                </div>

                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm">
                        <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">User ID: {order.userId}</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <ShoppingBagIcon className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{order.items.length} items</span>
                    </div>
                </div>

                {/* Amount */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-gray-600">
                        <CurrencyDollarIcon className="w-5 h-5 mr-1" />
                        <span className="text-sm">Total Amount</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">
                        {formatCurrency(order.totalAmount, order.currency)}
                    </span>
                </div>

                {/* Payment & Fulfillment Status */}
                <div className="flex gap-2 mt-4">
                    <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                        Payment: {order.paymentStatus}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                        Fulfillment: {order.fulfillmentStatus}
                    </span>
                </div>
            </div>
        </Link>
    );
}

