'use client';

import Link from 'next/link';
import { Order } from '@/types/order';
import { formatCurrency, formatDate } from '@/lib/utils';
import OrderStatus from '@/app/orders/components/OrderStatus';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface MobileOrderCardProps {
    order: Order;
}

export default function MobileOrderCard({ order }: MobileOrderCardProps) {
    return (
        <Link href={`/orders/${order.id}`}>
            <div className="bg-white rounded-lg border border-gray-200 p-4 active:bg-gray-50 transition-colors">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">
                            {order.orderNumber}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {formatDate(order.createdAt, 'short')}
                        </p>
                    </div>
                    <OrderStatus status={order.status} size="sm" />
                </div>

                {/* Amount */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-600">Total Amount</span>
                    <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(order.totalAmount, order.currency)}
                    </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </div>
                    <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </div>
            </div>
        </Link>
    );
}

