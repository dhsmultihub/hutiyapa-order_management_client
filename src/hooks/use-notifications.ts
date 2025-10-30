'use client';

import { useEffect, useState } from 'react';
import { useWebSocket } from './use-websocket';

export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    actionUrl?: string;
    orderId?: string;
}

export function useNotifications() {
    const { subscribe, isConnected } = useWebSocket();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!isConnected) return;

        // Subscribe to notification events
        const unsubscribe = subscribe('notification', (event) => {
            const notification: Notification = {
                id: event.data.id || `notif-${Date.now()}`,
                type: event.data.type || 'info',
                title: event.data.title,
                message: event.data.message,
                timestamp: event.timestamp,
                read: false,
                actionUrl: event.data.actionUrl,
                orderId: event.orderId,
            };

            setNotifications((prev) => [notification, ...prev]);
            setUnreadCount((prev) => prev + 1);

            // Show browser notification if permission granted
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification(notification.title, {
                    body: notification.message,
                    icon: '/favicon.ico',
                    tag: notification.id,
                });
            }
        });

        // Subscribe to order events and create notifications
        const unsubscribeOrders = subscribe('all', (event) => {
            let notification: Notification | null = null;

            switch (event.type) {
                case 'order.created':
                    notification = {
                        id: `order-created-${event.orderId}-${Date.now()}`,
                        type: 'success',
                        title: 'Order Created',
                        message: `New order ${event.data.orderNumber} has been created`,
                        timestamp: event.timestamp,
                        read: false,
                        orderId: event.orderId,
                        actionUrl: `/orders/${event.orderId}`,
                    };
                    break;

                case 'order.status_changed':
                    notification = {
                        id: `order-status-${event.orderId}-${Date.now()}`,
                        type: 'info',
                        title: 'Order Status Updated',
                        message: `Order ${event.data.orderNumber} status changed to ${event.data.status}`,
                        timestamp: event.timestamp,
                        read: false,
                        orderId: event.orderId,
                        actionUrl: `/orders/${event.orderId}`,
                    };
                    break;

                case 'payment.processed':
                    notification = {
                        id: `payment-processed-${event.orderId}-${Date.now()}`,
                        type: 'success',
                        title: 'Payment Processed',
                        message: `Payment for order ${event.data.orderNumber} has been processed successfully`,
                        timestamp: event.timestamp,
                        read: false,
                        orderId: event.orderId,
                        actionUrl: `/orders/${event.orderId}`,
                    };
                    break;

                case 'payment.failed':
                    notification = {
                        id: `payment-failed-${event.orderId}-${Date.now()}`,
                        type: 'error',
                        title: 'Payment Failed',
                        message: `Payment for order ${event.data.orderNumber} has failed`,
                        timestamp: event.timestamp,
                        read: false,
                        orderId: event.orderId,
                        actionUrl: `/orders/${event.orderId}`,
                    };
                    break;

                case 'shipment.delivered':
                    notification = {
                        id: `shipment-delivered-${event.orderId}-${Date.now()}`,
                        type: 'success',
                        title: 'Order Delivered',
                        message: `Order ${event.data.orderNumber} has been delivered`,
                        timestamp: event.timestamp,
                        read: false,
                        orderId: event.orderId,
                        actionUrl: `/orders/${event.orderId}`,
                    };
                    break;
            }

            if (notification) {
                setNotifications((prev) => [notification!, ...prev]);
                setUnreadCount((prev) => prev + 1);
            }
        });

        return () => {
            unsubscribe();
            unsubscribeOrders();
        };
    }, [isConnected, subscribe]);

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notif) => ({ ...notif, read: true }))
        );
        setUnreadCount(0);
    };

    const deleteNotification = (id: string) => {
        setNotifications((prev) => {
            const notification = prev.find((n) => n.id === id);
            if (notification && !notification.read) {
                setUnreadCount((count) => Math.max(0, count - 1));
            }
            return prev.filter((n) => n.id !== id);
        });
    };

    const clearAll = () => {
        setNotifications([]);
        setUnreadCount(0);
    };

    const requestPermission = async () => {
        if ('Notification' in window && Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }
        return Notification.permission === 'granted';
    };

    return {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        requestPermission,
        isConnected,
    };
}

