'use client';

import { useQuery } from '@tanstack/react-query';
import { getAnalytics, getOrderAnalytics } from '@/lib/api';

// Query Keys
export const analyticsKeys = {
    all: ['analytics'] as const,
    overview: (params?: { startDate?: string; endDate?: string }) =>
        [...analyticsKeys.all, 'overview', params] as const,
    orders: (params?: { startDate?: string; endDate?: string }) =>
        [...analyticsKeys.all, 'orders', params] as const,
};

export interface AnalyticsOverview {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    totalCustomers: number;
    orderGrowth: number;
    revenueGrowth: number;
    topProducts: Array<{
        productId: string;
        name: string;
        sales: number;
        revenue: number;
    }>;
    ordersByStatus: Record<string, number>;
    revenueByDate: Array<{
        date: string;
        revenue: number;
        orders: number;
    }>;
}

export interface OrderAnalytics {
    totalOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    pendingOrders: number;
    averageProcessingTime: number;
    ordersByDay: Array<{
        date: string;
        count: number;
    }>;
    ordersByStatus: Record<string, number>;
    ordersByPaymentMethod: Record<string, number>;
}

// Fetch Analytics Overview
export function useAnalytics(params?: { startDate?: string; endDate?: string }) {
    return useQuery<AnalyticsOverview>({
        queryKey: analyticsKeys.overview(params),
        queryFn: () => getAnalytics(params),
    });
}

// Fetch Order Analytics
export function useOrderAnalytics(params?: { startDate?: string; endDate?: string }) {
    return useQuery<OrderAnalytics>({
        queryKey: analyticsKeys.orders(params),
        queryFn: () => getOrderAnalytics(params),
    });
}

// Helper hook for date range
export function useDateRange() {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    return {
        today: formatDate(today),
        thirtyDaysAgo: formatDate(thirtyDaysAgo),
        lastWeek: formatDate(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)),
        lastMonth: formatDate(new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)),
        lastQuarter: formatDate(new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)),
        lastYear: formatDate(new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)),
    };
}

