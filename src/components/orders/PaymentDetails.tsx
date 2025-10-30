'use client';

import { Payment } from '@/types/order';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import { PAYMENT_METHOD_LABELS, PAYMENT_STATUS_LABELS } from '@/lib/constants';
import Button from '@/components/ui/button';
import { CreditCardIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface PaymentDetailsProps {
  payment: Payment;
  onRefund?: () => void;
  canRefund?: boolean;
}

export default function PaymentDetails({ 
  payment, 
  onRefund,
  canRefund = false 
}: PaymentDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CreditCardIcon className="w-6 h-6 text-gray-600 mr-3" />
          <h2 className="text-xl font-semibold">Payment Details</h2>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            payment.status
          )}`}
        >
          {PAYMENT_STATUS_LABELS[payment.status]}
        </span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Payment Method</label>
            <p className="font-medium">
              {PAYMENT_METHOD_LABELS[payment.paymentMethod] || payment.paymentMethod}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Gateway</label>
            <p className="font-medium capitalize">{payment.paymentGateway}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Amount</label>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(payment.amount, payment.currency)}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Currency</label>
            <p className="font-medium">{payment.currency}</p>
          </div>
        </div>

        {payment.transactionId && (
          <div>
            <label className="text-sm text-gray-600">Transaction ID</label>
            <p className="font-mono text-sm bg-gray-50 p-2 rounded">
              {payment.transactionId}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Created At</label>
            <p className="font-medium">{formatDate(payment.createdAt, 'long')}</p>
          </div>
          {payment.processedAt && (
            <div>
              <label className="text-sm text-gray-600">Processed At</label>
              <p className="font-medium">{formatDate(payment.processedAt, 'long')}</p>
            </div>
          )}
        </div>

        {payment.gatewayResponse && (
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Gateway Response</label>
            <pre className="bg-gray-50 p-3 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(payment.gatewayResponse, null, 2)}
            </pre>
          </div>
        )}

        {canRefund && payment.status === 'paid' && onRefund && (
          <div className="pt-4 border-t border-gray-200">
            <Button
              variant="destructive"
              onClick={onRefund}
            >
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              Process Refund
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

