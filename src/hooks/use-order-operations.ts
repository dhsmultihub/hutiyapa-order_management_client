'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  useCreateOrder, 
  useUpdateOrder, 
  useUpdateOrderStatus, 
  useDeleteOrder 
} from './use-orders';
import { CreateOrderRequest, UpdateOrderRequest, OrderStatus } from '@/types/order';

export function useOrderOperations(orderId?: string) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: createOrderMutation } = useCreateOrder();
  const { mutate: updateOrderMutation } = useUpdateOrder(orderId || '');
  const { mutate: updateStatusMutation } = useUpdateOrderStatus(orderId || '');
  const { mutate: deleteOrderMutation } = useDeleteOrder();

  // Create Order
  const createOrder = async (orderData: CreateOrderRequest) => {
    setIsProcessing(true);
    setError(null);

    try {
      createOrderMutation(orderData, {
        onSuccess: (newOrder) => {
          setIsProcessing(false);
          router.push(`/orders/${newOrder.id}`);
        },
        onError: (error: any) => {
          setIsProcessing(false);
          setError(error.message || 'Failed to create order');
        },
      });
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.message || 'An unexpected error occurred');
    }
  };

  // Update Order
  const updateOrder = async (orderData: UpdateOrderRequest) => {
    if (!orderId) {
      setError('Order ID is required');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      updateOrderMutation(orderData, {
        onSuccess: () => {
          setIsProcessing(false);
        },
        onError: (error: any) => {
          setIsProcessing(false);
          setError(error.message || 'Failed to update order');
        },
      });
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.message || 'An unexpected error occurred');
    }
  };

  // Update Order Status
  const updateStatus = async (status: OrderStatus) => {
    if (!orderId) {
      setError('Order ID is required');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      updateStatusMutation(status, {
        onSuccess: () => {
          setIsProcessing(false);
        },
        onError: (error: any) => {
          setIsProcessing(false);
          setError(error.message || 'Failed to update order status');
        },
      });
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.message || 'An unexpected error occurred');
    }
  };

  // Cancel Order
  const cancelOrder = async () => {
    if (!orderId) {
      setError('Order ID is required');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      updateStatusMutation('cancelled', {
        onSuccess: () => {
          setIsProcessing(false);
        },
        onError: (error: any) => {
          setIsProcessing(false);
          setError(error.message || 'Failed to cancel order');
        },
      });
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.message || 'An unexpected error occurred');
    }
  };

  // Delete Order
  const deleteOrder = async () => {
    if (!orderId) {
      setError('Order ID is required');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      deleteOrderMutation(orderId, {
        onSuccess: () => {
          setIsProcessing(false);
          router.push('/orders');
        },
        onError: (error: any) => {
          setIsProcessing(false);
          setError(error.message || 'Failed to delete order');
        },
      });
    } catch (err: any) {
      setIsProcessing(false);
      setError(err.message || 'An unexpected error occurred');
    }
  };

  // Confirm Order (shortcut for status change)
  const confirmOrder = () => updateStatus('confirmed');

  // Process Order (shortcut for status change)
  const processOrder = () => updateStatus('processing');

  // Ship Order (shortcut for status change)
  const shipOrder = () => updateStatus('shipped');

  // Deliver Order (shortcut for status change)
  const deliverOrder = () => updateStatus('delivered');

  // Complete Order (shortcut for status change)
  const completeOrder = () => updateStatus('completed');

  return {
    createOrder,
    updateOrder,
    updateStatus,
    cancelOrder,
    deleteOrder,
    confirmOrder,
    processOrder,
    shipOrder,
    deliverOrder,
    completeOrder,
    isProcessing,
    error,
  };
}

