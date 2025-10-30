'use client';

import { use } from 'react';
import { useOrder, useUpdateOrderStatus } from '@/hooks/use-orders';
import { useOrderUpdates } from '@/hooks/use-order-updates';
import { formatCurrency, formatDate } from '@/lib/utils';
import OrderStatus from '../components/OrderStatus';
import OrderActions from '../components/OrderActions';
import Button from '@/components/ui/button';
import Loader from '@/components/Loader';
import LiveOrderUpdates from '@/components/realtime/LiveOrderUpdates';
import ConnectionStatus from '@/components/realtime/ConnectionStatus';
import Link from 'next/link';
import {
    ArrowLeftIcon,
    MapPinIcon,
    UserIcon,
    CreditCardIcon,
    TruckIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { OrderStatus as OrderStatusType } from '@/types/order';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function OrderDetailsPage({ params }: PageProps) {
    const { id } = use(params);
    const { data: order, isLoading, error } = useOrder(id);
    const { mutate: updateStatus, isPending: isUpdating } = useUpdateOrderStatus(id);
    const { latestUpdate, isConnected } = useOrderUpdates(id);

    const handleUpdateStatus = (status: OrderStatusType) => {
        updateStatus(status);
    };

    const handleCancelOrder = () => {
        updateStatus('cancelled');
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800">
                        Error loading order: {error?.message || 'Order not found'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6">
                <Link href="/orders">
                    <Button variant="ghost" className="mb-4">
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Back to Orders
                    </Button>
                </Link>
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-gray-900">{order.orderNumber}</h1>
                            <ConnectionStatus />
                        </div>
                        <p className="text-gray-600 mt-1">
                            Created on {formatDate(order.createdAt, 'long')}
                        </p>
                    </div>
                    <OrderStatus status={order.status} size="lg" />
                </div>
            </div>

            {/* Live Updates */}
            {latestUpdate && (
                <div className="mb-6">
                    <LiveOrderUpdates orderId={id} />
                </div>
            )}

            {/* Actions */}
            <div className="mb-6">
                <OrderActions
                    order={order}
                    onUpdateStatus={handleUpdateStatus}
                    onCancelOrder={handleCancelOrder}
                    isLoading={isUpdating}
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center mb-4">
                            <ShoppingBagIcon className="w-5 h-5 text-gray-600 mr-2" />
                            <h2 className="text-xl font-semibold">Order Items</h2>
                        </div>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                                        {item.description && (
                                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                        )}
                                    </div>
                                    <div className="text-right ml-4">
                                        <p className="font-medium">
                                            {formatCurrency(item.totalPrice, order.currency)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.quantity} × {formatCurrency(item.unitPrice, order.currency)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center mb-4">
                            <MapPinIcon className="w-5 h-5 text-gray-600 mr-2" />
                            <h2 className="text-xl font-semibold">Shipping Address</h2>
                        </div>
                        <address className="not-italic text-gray-700">
                            <p className="font-medium">
                                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                            </p>
                            {order.shippingAddress.company && (
                                <p>{order.shippingAddress.company}</p>
                            )}
                            <p>{order.shippingAddress.address1}</p>
                            {order.shippingAddress.address2 && (
                                <p>{order.shippingAddress.address2}</p>
                            )}
                            <p>
                                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                                {order.shippingAddress.postalCode}
                            </p>
                            <p>{order.shippingAddress.country}</p>
                            <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
                        </address>
                    </div>

                    {/* Billing Address */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center mb-4">
                            <CreditCardIcon className="w-5 h-5 text-gray-600 mr-2" />
                            <h2 className="text-xl font-semibold">Billing Address</h2>
                        </div>
                        <address className="not-italic text-gray-700">
                            <p className="font-medium">
                                {order.billingAddress.firstName} {order.billingAddress.lastName}
                            </p>
                            {order.billingAddress.company && (
                                <p>{order.billingAddress.company}</p>
                            )}
                            <p>{order.billingAddress.address1}</p>
                            {order.billingAddress.address2 && (
                                <p>{order.billingAddress.address2}</p>
                            )}
                            <p>
                                {order.billingAddress.city}, {order.billingAddress.state}{' '}
                                {order.billingAddress.postalCode}
                            </p>
                            <p>{order.billingAddress.country}</p>
                            <p className="mt-2">Phone: {order.billingAddress.phone}</p>
                        </address>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">
                                    {formatCurrency(order.subtotal, order.currency)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax</span>
                                <span className="font-medium">
                                    {formatCurrency(order.taxAmount, order.currency)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium">
                                    {formatCurrency(order.shippingAmount, order.currency)}
                                </span>
                            </div>
                            {order.discountAmount > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Discount</span>
                                    <span className="font-medium">
                                        -{formatCurrency(order.discountAmount, order.currency)}
                                    </span>
                                </div>
                            )}
                            <div className="border-t border-gray-200 pt-3">
                                <div className="flex justify-between">
                                    <span className="text-lg font-semibold">Total</span>
                                    <span className="text-lg font-bold text-gray-900">
                                        {formatCurrency(order.totalAmount, order.currency)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold mb-4">Order Information</h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-gray-600">Order Number</span>
                                <p className="font-medium">{order.orderNumber}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Customer ID</span>
                                <p className="font-medium">{order.userId}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Payment Status</span>
                                <p className="font-medium capitalize">{order.paymentStatus}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Fulfillment Status</span>
                                <p className="font-medium capitalize">{order.fulfillmentStatus}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Currency</span>
                                <p className="font-medium">{order.currency}</p>
                            </div>
                            {order.notes && (
                                <div>
                                    <span className="text-gray-600">Notes</span>
                                    <p className="text-gray-700 mt-1">{order.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Timestamps */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold mb-4">Timeline</h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-gray-600">Created</span>
                                <p className="font-medium">{formatDate(order.createdAt, 'long')}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Last Updated</span>
                                <p className="font-medium">{formatDate(order.updatedAt, 'long')}</p>
                            </div>
                            {order.shippedAt && (
                                <div>
                                    <span className="text-gray-600">Shipped</span>
                                    <p className="font-medium">{formatDate(order.shippedAt, 'long')}</p>
                                </div>
                            )}
                            {order.deliveredAt && (
                                <div>
                                    <span className="text-gray-600">Delivered</span>
                                    <p className="font-medium">{formatDate(order.deliveredAt, 'long')}</p>
                                </div>
                            )}
                            {order.cancelledAt && (
                                <div>
                                    <span className="text-gray-600">Cancelled</span>
                                    <p className="font-medium text-red-600">
                                        {formatDate(order.cancelledAt, 'long')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

