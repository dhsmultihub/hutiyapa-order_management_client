'use client';

import { Shipment } from '@/types/order';
import { formatDate } from '@/lib/utils';
import { SHIPMENT_STATUS_LABELS } from '@/lib/constants';
import { CheckCircleIcon, TruckIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface TrackingInfoProps {
  shipment: Shipment;
}

export default function TrackingInfo({ shipment }: TrackingInfoProps) {
  const trackingSteps = [
    {
      status: 'pending',
      label: 'Order Placed',
      date: shipment.createdAt,
      completed: true,
    },
    {
      status: 'in_transit',
      label: 'In Transit',
      date: shipment.shippedAt,
      completed: !!shipment.shippedAt,
    },
    {
      status: 'out_for_delivery',
      label: 'Out for Delivery',
      date: null,
      completed: shipment.status === 'out_for_delivery' || shipment.status === 'delivered',
    },
    {
      status: 'delivered',
      label: 'Delivered',
      date: shipment.deliveredAt,
      completed: !!shipment.deliveredAt,
    },
  ];

  const currentStepIndex = trackingSteps.findIndex(
    (step) => step.status === shipment.status
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Shipment Tracking</h2>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
          {SHIPMENT_STATUS_LABELS[shipment.status]}
        </span>
      </div>

      {/* Tracking Number */}
      {shipment.trackingNumber && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <label className="text-sm text-gray-600">Tracking Number</label>
          <p className="font-mono text-lg font-medium">{shipment.trackingNumber}</p>
          {shipment.trackingUrl && (
            <a
              href={shipment.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mt-2"
            >
              <MapPinIcon className="w-4 h-4 mr-1" />
              Track on Carrier Website
            </a>
          )}
        </div>
      )}

      {/* Progress Steps */}
      <div className="relative">
        {trackingSteps.map((step, index) => (
          <div key={step.status} className="relative pb-8 last:pb-0">
            {/* Line */}
            {index < trackingSteps.length - 1 && (
              <div
                className={`absolute left-4 top-8 w-0.5 h-full ${
                  step.completed ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}

            {/* Step Content */}
            <div className="relative flex items-start">
              {/* Icon */}
              <div
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                  step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.completed ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  <TruckIcon className="w-5 h-5" />
                )}
              </div>

              {/* Details */}
              <div className="ml-4 flex-1">
                <p
                  className={`font-medium ${
                    step.completed ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(step.date, 'long')}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estimated Delivery */}
      {shipment.estimatedDelivery && !shipment.deliveredAt && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Estimated Delivery</span>
            <span className="font-medium">
              {formatDate(shipment.estimatedDelivery, 'short')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

