'use client';

import { useEffect, useState, useCallback } from 'react';
import { websocketService, WebSocketEventType, WebSocketEvent } from '@/lib/websocket.service';

export function useWebSocket() {
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Allow disabling websockets (useful in dev without a WS backend)
        if (process.env.NEXT_PUBLIC_WEBSOCKET_DISABLED === 'true') {
            setIsConnected(false);
            setError(null);
            return;
        }

        // Get token from localStorage (if exists)
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

        // Connect to WebSocket
        websocketService
            .connect(token || undefined)
            .then(() => {
                setIsConnected(true);
                setError(null);
            })
            .catch((err) => {
                // Swallow connection errors in dev; keep UI functional
                setIsConnected(false);
                setError(err);
            });

        // Check connection status periodically
        const interval = setInterval(() => {
            setIsConnected(websocketService.isConnected());
        }, 5000);

        return () => {
            clearInterval(interval);
            websocketService.disconnect();
        };
    }, []);

    const subscribe = useCallback(
        (eventType: WebSocketEventType | 'all', callback: (event: WebSocketEvent) => void) => {
            return websocketService.subscribe(eventType, callback);
        },
        []
    );

    const send = useCallback((event: string, data: any) => {
        websocketService.send(event, data);
    }, []);

    return {
        isConnected,
        error,
        subscribe,
        send,
    };
}

