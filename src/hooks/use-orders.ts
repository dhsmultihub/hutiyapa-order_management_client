'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Order, 
  CreateOrderRequest, 
  UpdateOrderRequest, 
  OrderFilters,
  PaginatedResponse 
} from '@/types/order';
import { 
  getOrders, 
  getOrderById, 
  createOrder, 
  updateOrder, 
  deleteOrder,
  updateOrderStatus 
} from '@/lib/api';

// Query Keys
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters?: OrderFilters) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
};

// Fetch Orders Hook
export function useOrders(filters?: OrderFilters, page = 1, limit = 10) {
  return useQuery<PaginatedResponse<Order>>({
    queryKey: orderKeys.list({ ...filters, page, limit } as any),
    queryFn: () => getOrders({ ...filters, page, limit }),
  });
}

// Fetch Single Order Hook
export function useOrder(orderId: string) {
  return useQuery<Order>({
    queryKey: orderKeys.detail(orderId),
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
}

// Create Order Hook
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: CreateOrderRequest) => createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}

// Update Order Hook
export function useUpdateOrder(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: UpdateOrderRequest) => updateOrder(orderId, orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}

// Update Order Status Hook
export function useUpdateOrderStatus(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: string) => updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}

// Delete Order Hook
export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => deleteOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}

// Custom hook for order statistics
export function useOrderStatistics() {
  const { data: orders, isLoading } = useOrders();

  const statistics = {
    total: orders?.pagination.total || 0,
    pending: orders?.data.filter(o => o.status === 'pending').length || 0,
    processing: orders?.data.filter(o => o.status === 'processing').length || 0,
    shipped: orders?.data.filter(o => o.status === 'shipped').length || 0,
    delivered: orders?.data.filter(o => o.status === 'delivered').length || 0,
    cancelled: orders?.data.filter(o => o.status === 'cancelled').length || 0,
    totalRevenue: orders?.data.reduce((sum, o) => sum + o.totalAmount, 0) || 0,
  };

  return { statistics, isLoading };
}

