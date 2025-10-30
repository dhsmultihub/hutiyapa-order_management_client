'use client';

import { useState, Fragment } from 'react';
import { useNotifications } from '@/hooks/use-notifications';
import { formatRelativeTime } from '@/lib/utils';
import Modal, { ModalBody, ModalFooter } from '@/components/ui/modal';
import Button from '@/components/ui/button';
import Link from 'next/link';
import {
    BellIcon,
    CheckIcon,
    TrashIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function NotificationCenter() {
    const [isOpen, setIsOpen] = useState(false);
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        requestPermission,
    } = useNotifications();

    const handleRequestPermission = async () => {
        const granted = await requestPermission();
        if (granted) {
            alert('Browser notifications enabled!');
        }
    };

    return (
        <>
            {/* Notification Bell Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <BellIcon className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Notification Modal */}
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Notifications"
                size="xl"
            >
                <ModalBody>
                    {/* Browser Notification Permission */}
                    {typeof window !== 'undefined' &&
                        'Notification' in window &&
                        Notification.permission === 'default' && (
                            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-900 mb-2">
                                    Enable browser notifications to stay updated on your orders
                                </p>
                                <Button
                                    size="sm"
                                    variant="default"
                                    onClick={handleRequestPermission}
                                >
                                    Enable Notifications
                                </Button>
                            </div>
                        )}

                    {/* Actions */}
                    {notifications.length > 0 && (
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                            <span className="text-sm text-gray-600">
                                {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
                            </span>
                            <div className="flex gap-2">
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        Mark all as read
                                    </button>
                                )}
                                <button
                                    onClick={clearAll}
                                    className="text-sm text-red-600 hover:text-red-700"
                                >
                                    Clear all
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Notifications List */}
                    {notifications.length > 0 ? (
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {notifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onRead={() => markAsRead(notification.id)}
                                    onDelete={() => deleteNotification(notification.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <BellIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No notifications yet</p>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

interface NotificationItemProps {
    notification: any;
    onRead: () => void;
    onDelete: () => void;
}

function NotificationItem({ notification, onRead, onDelete }: NotificationItemProps) {
    const Icon = getNotificationIcon(notification.type);
    const colorClasses = getNotificationColor(notification.type);

    return (
        <div
            className={`p-4 rounded-lg border transition-colors ${notification.read
                    ? 'bg-white border-gray-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
        >
            <div className="flex items-start">
                <div className={`flex-shrink-0 ${colorClasses}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                        </p>
                        {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">
                            {formatRelativeTime(notification.timestamp)}
                        </p>
                        <div className="flex items-center gap-2">
                            {notification.actionUrl && (
                                <Link
                                    href={notification.actionUrl}
                                    onClick={onRead}
                                    className="text-xs text-blue-600 hover:text-blue-700"
                                >
                                    View
                                </Link>
                            )}
                            {!notification.read && (
                                <button
                                    onClick={onRead}
                                    className="text-xs text-gray-600 hover:text-gray-700"
                                    title="Mark as read"
                                >
                                    <CheckIcon className="w-4 h-4" />
                                </button>
                            )}
                            <button
                                onClick={onDelete}
                                className="text-xs text-red-600 hover:text-red-700"
                                title="Delete"
                            >
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getNotificationIcon(type: string) {
    switch (type) {
        case 'success':
            return CheckCircleIcon;
        case 'error':
            return ExclamationCircleIcon;
        case 'warning':
            return ExclamationTriangleIcon;
        case 'info':
        default:
            return InformationCircleIcon;
    }
}

function getNotificationColor(type: string) {
    switch (type) {
        case 'success':
            return 'text-green-500';
        case 'error':
            return 'text-red-500';
        case 'warning':
            return 'text-yellow-500';
        case 'info':
        default:
            return 'text-blue-500';
    }
}

