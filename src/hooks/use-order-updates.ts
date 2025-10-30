'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useWebSocket } from './use-websocket';
import { Order } from '@/types/order';
import { orderKeys } from './use-orders';

export function useOrderUpdates(orderId?: string) {
    const { subscribe, isConnected } = useWebSocket();
    const queryClient = useQueryClient();
    const [latestUpdate, setLatestUpdate] = useState<any>(null);

    useEffect(() => {
        if (!isConnected) return;

        // Subscribe to order events
        const unsubscribeCreated = subscribe('order.created', (event) => {
            console.log('Order created:', event);
            setLatestUpdate(event);
            // Invalidate orders list
            queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
        });

        const unsubscribeUpdated = subscribe('order.updated', (event) => {
            console.log('Order updated:', event);
            setLatestUpdate(event);

            // If we have a specific order ID, update it
            if (event.orderId) {
                queryClient.invalidateQueries({ queryKey: orderKeys.detail(event.orderId) });
            }

            // Invalidate lists
            queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
        });

        const unsubscribeStatusChanged = subscribe('order.status_changed', (event) => {
            console.log('Order status changed:', event);
            setLatestUpdate(event);

            // Update specific order if we have the ID
            if (event.orderId) {
                queryClient.invalidateQueries({ queryKey: orderKeys.detail(event.orderId) });

                // Optimistically update the order in cache if available
                queryClient.setQueryData<Order>(orderKeys.detail(event.orderId), (oldData) => {
                    if (oldData && event.data.status) {
                        return { ...oldData, status: event.data.status };
                    }
                    return oldData;
                });
            }

            // Invalidate lists
            queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
        });

        // If watching a specific order, subscribe to its updates
        let unsubscribeSpecific: (() => void) | undefined;
        if (orderId) {
            unsubscribeSpecific = subscribe('all', (event) => {
                if (event.orderId === orderId) {
                    console.log('Specific order update:', event);
                    setLatestUpdate(event);
                    queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
                }
            });
        }

        return () => {
            unsubscribeCreated();
            unsubscribeUpdated();
            unsubscribeStatusChanged();
            if (unsubscribeSpecific) unsubscribeSpecific();
        };
    }, [isConnected, subscribe, queryClient, orderId]);

    return {
        latestUpdate,
        isConnected,
    };
}

