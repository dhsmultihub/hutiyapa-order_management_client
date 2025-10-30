'use client';

import { useOrderUpdates } from '@/hooks/use-order-updates';
import { formatDate } from '@/lib/utils';
import { BoltIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface LiveOrderUpdatesProps {
    orderId?: string;
}

export default function LiveOrderUpdates({ orderId }: LiveOrderUpdatesProps) {
    const { latestUpdate, isConnected } = useOrderUpdates(orderId);

    if (!latestUpdate) return null;

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-slideIn">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <BoltIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-blue-900">
                        Live Update
                        {isConnected && (
                            <span className="ml-2 inline-flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
                                <span className="text-xs text-green-600">Connected</span>
                            </span>
                        )}
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                        {getUpdateMessage(latestUpdate)}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                        {formatDate(latestUpdate.timestamp, 'long')}
                    </p>
                </div>
            </div>
        </div>
    );
}

function getUpdateMessage(update: any): string {
    switch (update.type) {
        case 'order.created':
            return `Order ${update.data.orderNumber} has been created`;
        case 'order.updated':
            return `Order has been updated`;
        case 'order.status_changed':
            return `Order status changed to ${update.data.status}`;
        case 'payment.processed':
            return `Payment has been processed successfully`;
        case 'payment.failed':
            return `Payment has failed`;
        case 'shipment.created':
            return `Shipment has been created`;
        case 'shipment.updated':
            return `Shipment tracking updated`;
        case 'shipment.delivered':
            return `Order has been delivered`;
        default:
            return 'Order has been updated';
    }
}

