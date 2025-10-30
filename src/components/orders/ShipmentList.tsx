'use client';

import { Shipment } from '@/types/order';
import { formatDate, getStatusColor } from '@/lib/utils';
import { SHIPMENT_STATUS_LABELS, SHIPPING_CARRIER_LABELS } from '@/lib/constants';
import { TruckIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ShipmentListProps {
  shipments: Shipment[];
}

export default function ShipmentList({ shipments }: ShipmentListProps) {
  if (!shipments || shipments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No shipment information available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {shipments.map((shipment) => (
        <div
          key={shipment.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <TruckIcon className="w-5 h-5 text-gray-400 mr-2" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {SHIPPING_CARRIER_LABELS[shipment.carrier] || shipment.carrier}
                </h3>
                {shipment.serviceType && (
                  <p className="text-sm text-gray-500">{shipment.serviceType}</p>
                )}
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                shipment.status
              )}`}
            >
              {SHIPMENT_STATUS_LABELS[shipment.status]}
            </span>
          </div>

          {shipment.trackingNumber && (
            <div className="mb-3">
              <span className="text-sm text-gray-600">Tracking Number</span>
              <p className="font-mono text-sm font-medium">{shipment.trackingNumber}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            {shipment.shippedAt && (
              <div>
                <span className="text-gray-600">Shipped</span>
                <p className="font-medium">{formatDate(shipment.shippedAt, 'short')}</p>
              </div>
            )}
            {shipment.estimatedDelivery && (
              <div>
                <span className="text-gray-600">Est. Delivery</span>
                <p className="font-medium">
                  {formatDate(shipment.estimatedDelivery, 'short')}
                </p>
              </div>
            )}
            {shipment.deliveredAt && (
              <div className="col-span-2">
                <span className="text-gray-600">Delivered</span>
                <p className="font-medium text-green-600">
                  {formatDate(shipment.deliveredAt, 'short')}
                </p>
              </div>
            )}
          </div>

          {shipment.trackingUrl && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <Link
                href={shipment.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <MapPinIcon className="w-4 h-4 mr-1" />
                Track Package
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

