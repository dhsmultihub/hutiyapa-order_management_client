'use client';

import { OrderStatus as OrderStatusType } from '@/types/order';
import { ORDER_STATUS_LABELS } from '@/lib/constants';
import { getStatusColor } from '@/lib/utils';

interface OrderStatusProps {
    status: OrderStatusType;
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
};

export default function OrderStatus({
    status,
    showLabel = true,
    size = 'md'
}: OrderStatusProps) {
    const statusColor = getStatusColor(status);
    const statusLabel = ORDER_STATUS_LABELS[status] || status;

    return (
        <span
            className={`inline-flex items-center rounded-full font-medium ${statusColor} ${sizeClasses[size]}`}
        >
            <span className="w-2 h-2 rounded-full bg-current mr-2" />
            {showLabel && statusLabel}
        </span>
    );
}

