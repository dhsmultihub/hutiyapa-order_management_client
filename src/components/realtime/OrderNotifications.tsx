'use client';

import { useNotifications, Notification } from '@/hooks/use-notifications';
import { formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

export default function OrderNotifications() {
    const { notifications, markAsRead, deleteNotification } = useNotifications();

    // Only show the 3 most recent unread notifications
    const recentNotifications = notifications.filter((n) => !n.read).slice(0, 3);

    if (recentNotifications.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
            {recentNotifications.map((notification) => (
                <NotificationToast
                    key={notification.id}
                    notification={notification}
                    onClose={() => deleteNotification(notification.id)}
                    onRead={() => markAsRead(notification.id)}
                />
            ))}
        </div>
    );
}

interface NotificationToastProps {
    notification: Notification;
    onClose: () => void;
    onRead: () => void;
}

function NotificationToast({ notification, onClose, onRead }: NotificationToastProps) {
    const Icon = getIcon(notification.type);
    const colorClasses = getColorClasses(notification.type);

    return (
        <div
            className={`bg-white rounded-lg shadow-lg border-l-4 p-4 animate-slideIn ${colorClasses.border}`}
        >
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <Icon className={`w-6 h-6 ${colorClasses.icon}`} />
                </div>
                <div className="ml-3 flex-1">
                    <p className={`text-sm font-medium ${colorClasses.title}`}>
                        {notification.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                        {formatRelativeTime(notification.timestamp)}
                    </p>
                    {notification.actionUrl && (
                        <Link
                            href={notification.actionUrl}
                            onClick={onRead}
                            className={`text-sm font-medium mt-2 inline-block hover:underline ${colorClasses.link}`}
                        >
                            View Details →
                        </Link>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

function getIcon(type: Notification['type']) {
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

function getColorClasses(type: Notification['type']) {
    switch (type) {
        case 'success':
            return {
                border: 'border-green-500',
                icon: 'text-green-500',
                title: 'text-green-900',
                link: 'text-green-600',
            };
        case 'error':
            return {
                border: 'border-red-500',
                icon: 'text-red-500',
                title: 'text-red-900',
                link: 'text-red-600',
            };
        case 'warning':
            return {
                border: 'border-yellow-500',
                icon: 'text-yellow-500',
                title: 'text-yellow-900',
                link: 'text-yellow-600',
            };
        case 'info':
        default:
            return {
                border: 'border-blue-500',
                icon: 'text-blue-500',
                title: 'text-blue-900',
                link: 'text-blue-600',
            };
    }
}

