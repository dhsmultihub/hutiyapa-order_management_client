'use client';

import { Payment } from '@/types/order';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import { PAYMENT_METHOD_LABELS, PAYMENT_STATUS_LABELS } from '@/lib/constants';
import { CreditCardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface PaymentListProps {
  payments: Payment[];
  currency: string;
}

export default function PaymentList({ payments, currency }: PaymentListProps) {
  if (!payments || payments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No payment information available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <CreditCardIcon className="w-5 h-5 text-gray-400 mr-2" />
              <div>
                <h3 className="font-medium text-gray-900">
                  {PAYMENT_METHOD_LABELS[payment.paymentMethod] || payment.paymentMethod}
                </h3>
                <p className="text-sm text-gray-500">
                  via {payment.paymentGateway}
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                payment.status
              )}`}
            >
              {PAYMENT_STATUS_LABELS[payment.status]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Amount</span>
              <p className="font-medium text-lg">
                {formatCurrency(payment.amount, payment.currency)}
              </p>
            </div>
            {payment.transactionId && (
              <div>
                <span className="text-gray-600">Transaction ID</span>
                <p className="font-mono text-xs">{payment.transactionId}</p>
              </div>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <span>Created: {formatDate(payment.createdAt, 'short')}</span>
            {payment.processedAt && (
              <span className="flex items-center text-green-600">
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                Processed: {formatDate(payment.processedAt, 'short')}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

