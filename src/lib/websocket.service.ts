import { WS_URL } from './constants';

export type WebSocketEventType =
    | 'order.created'
    | 'order.updated'
    | 'order.status_changed'
    | 'payment.processed'
    | 'payment.failed'
    | 'shipment.created'
    | 'shipment.updated'
    | 'shipment.delivered'
    | 'notification';

export interface WebSocketEvent<T = any> {
    type: WebSocketEventType;
    data: T;
    timestamp: string;
    userId?: string;
    orderId?: string;
}

export interface WebSocketMessage {
    event: string;
    data: any;
}

type EventListener = (event: WebSocketEvent) => void;

class WebSocketService {
    private ws: WebSocket | null = null;
    private listeners: Map<WebSocketEventType | 'all', Set<EventListener>> = new Map();
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000;
    private isIntentionallyClosed = false;
    private heartbeatInterval: NodeJS.Timeout | null = null;
    private connectionTimeout: NodeJS.Timeout | null = null;

    connect(token?: string): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                // Guard against non-browser environments
                if (typeof window === 'undefined' || typeof WebSocket === 'undefined') {
                    // Resolve silently in non-browser environments
                    return resolve();
                }
                this.isIntentionallyClosed = false;

                // Build WebSocket URL with token if provided
                const url = token ? `${WS_URL}?token=${token}` : WS_URL;

                this.ws = new WebSocket(url);

                // Connection timeout
                this.connectionTimeout = setTimeout(() => {
                    if (this.ws?.readyState !== WebSocket.OPEN) {
                        this.ws?.close();
                        // Do not reject; resolve and let reconnection logic handle it
                        resolve();
                    }
                }, 10000); // 10 seconds timeout

                this.ws.onopen = () => {
                    console.log('WebSocket connected');
                    this.reconnectAttempts = 0;

                    if (this.connectionTimeout) {
                        clearTimeout(this.connectionTimeout);
                        this.connectionTimeout = null;
                    }

                    // Start heartbeat
                    this.startHeartbeat();

                    resolve();
                };

                this.ws.onmessage = (event) => {
                    try {
                        const message: WebSocketEvent = JSON.parse(event.data);
                        this.handleMessage(message);
                    } catch (error) {
                        console.error('Failed to parse WebSocket message:', error);
                    }
                };

                this.ws.onerror = (event) => {
                    // Surface a concise, useful message without noisy object logging
                    const message = (event as any)?.message || 'Unknown error';
                    console.warn('WebSocket error:', message);
                    // Do not reject here; allow timeout/reconnect logic to govern flow
                };

                this.ws.onclose = () => {
                    console.log('WebSocket disconnected');
                    this.stopHeartbeat();

                    if (!this.isIntentionallyClosed) {
                        this.attemptReconnect(token);
                    }
                };
            } catch (error) {
                // Do not surface runtime overlay in dev; log and resolve
                console.warn('WebSocket connect threw:', error);
                resolve();
            }
        });
    }

    disconnect() {
        this.isIntentionallyClosed = true;
        this.stopHeartbeat();

        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    send(event: string, data: any) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            const message: WebSocketMessage = { event, data };
            this.ws.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket is not connected');
        }
    }

    subscribe(eventType: WebSocketEventType | 'all', listener: EventListener) {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, new Set());
        }
        this.listeners.get(eventType)!.add(listener);

        // Return unsubscribe function
        return () => {
            this.listeners.get(eventType)?.delete(listener);
        };
    }

    private handleMessage(event: WebSocketEvent) {
        // Notify specific event listeners
        const specificListeners = this.listeners.get(event.type);
        if (specificListeners) {
            specificListeners.forEach(listener => listener(event));
        }

        // Notify 'all' event listeners
        const allListeners = this.listeners.get('all');
        if (allListeners) {
            allListeners.forEach(listener => listener(event));
        }
    }

    private attemptReconnect(token?: string) {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.warn('Max reconnection attempts reached');
            return;
        }

        this.reconnectAttempts++;
        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`);

        setTimeout(() => {
            this.connect(token).catch(error => {
                console.error('Reconnection failed:', error);
            });
        }, delay);
    }

    private startHeartbeat() {
        this.heartbeatInterval = setInterval(() => {
            if (this.ws?.readyState === WebSocket.OPEN) {
                this.send('ping', { timestamp: Date.now() });
            }
        }, 30000); // Send heartbeat every 30 seconds
    }

    private stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    isConnected(): boolean {
        return this.ws?.readyState === WebSocket.OPEN;
    }

    getReadyState(): number | null {
        return this.ws?.readyState ?? null;
    }
}

// Export singleton instance
export const websocketService = new WebSocketService();

export default websocketService;

