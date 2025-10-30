'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Order } from '@/types/order';
import { formatCurrency, formatDate } from '@/lib/utils';
import OrderStatus from '@/app/orders/components/OrderStatus';
import { useTouch } from '@/hooks/use-touch';
import {
    CheckCircleIcon,
    XCircleIcon,
    EyeIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

interface SwipeableOrderCardProps {
    order: Order;
    onConfirm?: (order: Order) => void;
    onCancel?: (order: Order) => void;
}

export default function SwipeableOrderCard({
    order,
    onConfirm,
    onCancel
}: SwipeableOrderCardProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    const ref = useTouch<HTMLDivElement>({
        onSwipeLeft: () => {
            if (!isRevealed) setIsRevealed(true);
        },
        onSwipeRight: () => {
            if (isRevealed) setIsRevealed(false);
        },
    });

    return (
        <div className="relative overflow-hidden rounded-lg">
            {/* Action Buttons (Hidden behind card) */}
            <div className="absolute inset-0 flex items-center justify-end bg-gray-100 px-4 gap-2">
                {onConfirm && order.status === 'PENDING' && (
                    <button
                        onClick={() => onConfirm(order)}
                        className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-lg active:bg-green-600"
                    >
                        <CheckCircleIcon className="w-6 h-6" />
                    </button>
                )}
                {onCancel && (
                    <button
                        onClick={() => onCancel(order)}
                        className="flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-lg active:bg-red-600"
                    >
                        <XCircleIcon className="w-6 h-6" />
                    </button>
                )}
            </div>

            {/* Card (Swipeable) */}
            <div
                ref={ref}
                className={`bg-white border border-gray-200 p-4 transition-transform duration-300 ${isRevealed ? '-translate-x-32' : 'translate-x-0'
                    }`}
            >
                <Link href={`/orders/${order.id}`}>
                    <div className="active:bg-gray-50 transition-colors rounded-lg">
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
            </div>
        </div>
    );
}

