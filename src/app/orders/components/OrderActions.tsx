'use client';

import { useState } from 'react';
import Button from '@/components/ui/button';
import Modal, { ModalBody, ModalFooter } from '@/components/ui/modal';
import { Order, OrderStatus } from '@/types/order';
import { ORDER_STATUS_LABELS } from '@/lib/constants';
import {
    CheckCircleIcon,
    XCircleIcon,
    TruckIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

interface OrderActionsProps {
    order: Order;
    onUpdateStatus: (status: OrderStatus) => void;
    onCancelOrder: () => void;
    isLoading?: boolean;
}

export default function OrderActions({
    order,
    onUpdateStatus,
    onCancelOrder,
    isLoading = false
}: OrderActionsProps) {
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null);

    const handleConfirmCancel = () => {
        onCancelOrder();
        setShowCancelModal(false);
    };

    const handleConfirmStatusChange = () => {
        if (selectedStatus) {
            onUpdateStatus(selectedStatus);
            setShowStatusModal(false);
            setSelectedStatus(null);
        }
    };

    const canConfirm = order.status === 'pending';
    const canProcess = order.status === 'confirmed';
    const canShip = order.status === 'processing';
    const canCancel = ['pending', 'confirmed'].includes(order.status);

    return (
        <>
            <div className="flex flex-wrap gap-2">
                {canConfirm && (
                    <Button
                        onClick={() => {
                            setSelectedStatus('confirmed');
                            setShowStatusModal(true);
                        }}
                        variant="success"
                        disabled={isLoading}
                    >
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        Confirm Order
                    </Button>
                )}

                {canProcess && (
                    <Button
                        onClick={() => {
                            setSelectedStatus('processing');
                            setShowStatusModal(true);
                        }}
                        variant="default"
                        disabled={isLoading}
                    >
                        <ArrowPathIcon className="w-4 h-4 mr-2" />
                        Process Order
                    </Button>
                )}

                {canShip && (
                    <Button
                        onClick={() => {
                            setSelectedStatus('shipped');
                            setShowStatusModal(true);
                        }}
                        variant="default"
                        disabled={isLoading}
                    >
                        <TruckIcon className="w-4 h-4 mr-2" />
                        Mark as Shipped
                    </Button>
                )}

                {canCancel && (
                    <Button
                        onClick={() => setShowCancelModal(true)}
                        variant="destructive"
                        disabled={isLoading}
                    >
                        <XCircleIcon className="w-4 h-4 mr-2" />
                        Cancel Order
                    </Button>
                )}
            </div>

            {/* Cancel Confirmation Modal */}
            <Modal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                title="Cancel Order"
                size="md"
            >
                <ModalBody>
                    <p className="text-gray-600">
                        Are you sure you want to cancel order <strong>{order.orderNumber}</strong>?
                        This action cannot be undone.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="outline"
                        onClick={() => setShowCancelModal(false)}
                    >
                        No, Keep Order
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleConfirmCancel}
                        loading={isLoading}
                    >
                        Yes, Cancel Order
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Status Change Confirmation Modal */}
            <Modal
                isOpen={showStatusModal}
                onClose={() => {
                    setShowStatusModal(false);
                    setSelectedStatus(null);
                }}
                title="Update Order Status"
                size="md"
            >
                <ModalBody>
                    <p className="text-gray-600">
                        Change order status from{' '}
                        <strong>{ORDER_STATUS_LABELS[order.status]}</strong> to{' '}
                        <strong>{selectedStatus && ORDER_STATUS_LABELS[selectedStatus]}</strong>?
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setShowStatusModal(false);
                            setSelectedStatus(null);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="default"
                        onClick={handleConfirmStatusChange}
                        loading={isLoading}
                    >
                        Confirm
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

