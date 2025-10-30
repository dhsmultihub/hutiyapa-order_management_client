'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Payment } from '@/types/order';
import { 
  getPayments, 
  getPaymentById, 
  processPayment, 
  refundPayment 
} from '@/lib/api';

// Query Keys
export const paymentKeys = {
  all: ['payments'] as const,
  lists: () => [...paymentKeys.all, 'list'] as const,
  list: (filters?: any) => [...paymentKeys.lists(), filters] as const,
  details: () => [...paymentKeys.all, 'detail'] as const,
  detail: (id: string) => [...paymentKeys.details(), id] as const,
};

// Fetch Payments Hook
export function usePayments(orderId?: string) {
  return useQuery<Payment[]>({
    queryKey: paymentKeys.list({ orderId }),
    queryFn: () => getPayments(orderId),
  });
}

// Fetch Single Payment Hook
export function usePayment(paymentId: string) {
  return useQuery<Payment>({
    queryKey: paymentKeys.detail(paymentId),
    queryFn: () => getPaymentById(paymentId),
    enabled: !!paymentId,
  });
}

// Process Payment Hook
export function useProcessPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentData: {
      orderId: string;
      paymentMethod: string;
      amount: number;
      paymentGateway: string;
    }) => processPayment(paymentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.lists() });
    },
  });
}

// Refund Payment Hook
export function useRefundPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refundData: {
      paymentId: string;
      amount: number;
      reason: string;
    }) => refundPayment(refundData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.lists() });
    },
  });
}

// Custom hook for payment statistics
export function usePaymentStatistics(orderId?: string) {
  const { data: payments, isLoading } = usePayments(orderId);

  const statistics = {
    total: payments?.length || 0,
    totalAmount: payments?.reduce((sum, p) => sum + p.amount, 0) || 0,
    paid: payments?.filter(p => p.status === 'paid').length || 0,
    pending: payments?.filter(p => p.status === 'pending').length || 0,
    failed: payments?.filter(p => p.status === 'failed').length || 0,
    refunded: payments?.filter(p => p.status === 'refunded').length || 0,
  };

  return { statistics, isLoading };
}

