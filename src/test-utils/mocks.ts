import { Order, OrderStatus, PaymentStatus, ShipmentStatus } from '@/types/order'

export const mockOrder: Order = {
    id: '1',
    orderNumber: 'ORD-001',
    userId: 'user-1',
    status: 'PENDING' as OrderStatus,
    items: [
        {
            id: 'item-1',
            orderId: '1',
            productId: 'prod-1',
            productName: 'Test Product',
            quantity: 2,
            price: 100,
            subtotal: 200,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
        },
    ],
    subtotal: 200,
    tax: 20,
    shipping: 10,
    discount: 0,
    totalAmount: 230,
    currency: 'USD',
    shippingAddress: {
        street: '123 Main St',
        city: 'Test City',
        state: 'TS',
        country: 'Test Country',
        postalCode: '12345',
    },
    billingAddress: {
        street: '123 Main St',
        city: 'Test City',
        state: 'TS',
        country: 'Test Country',
        postalCode: '12345',
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
}

export const mockOrders: Order[] = [
    mockOrder,
    {
        ...mockOrder,
        id: '2',
        orderNumber: 'ORD-002',
        status: 'PROCESSING' as OrderStatus,
    },
    {
        ...mockOrder,
        id: '3',
        orderNumber: 'ORD-003',
        status: 'SHIPPED' as OrderStatus,
    },
]

export const mockOrderStatistics = {
    total: 100,
    pending: 20,
    processing: 30,
    shipped: 25,
    delivered: 20,
    cancelled: 5,
}

export const mockPayment = {
    id: '1',
    orderId: '1',
    amount: 230,
    currency: 'USD',
    status: 'COMPLETED' as PaymentStatus,
    paymentMethod: 'credit_card',
    transactionId: 'txn-123',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
}

export const mockShipment = {
    id: '1',
    orderId: '1',
    carrier: 'UPS',
    trackingNumber: 'TRK-123',
    status: 'IN_TRANSIT' as ShipmentStatus,
    estimatedDelivery: new Date('2024-01-10'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
}

// Mock API responses
export const mockApiResponse = <T,>(data: T) => ({
    success: true,
    data,
    message: 'Success',
})

export const mockPaginatedResponse = <T,>(data: T[], page = 1, pageSize = 10) => ({
    success: true,
    data,
    pagination: {
        page,
        pageSize,
        total: data.length,
        totalPages: Math.ceil(data.length / pageSize),
    },
})

export const mockApiError = (message: string, code = 'ERROR') => ({
    success: false,
    error: {
        code,
        message,
    },
})

// Mock WebSocket
export class MockWebSocket {
    url: string
    onopen: (() => void) | null = null
    onclose: (() => void) | null = null
    onmessage: ((event: { data: string }) => void) | null = null
    onerror: (() => void) | null = null

    constructor(url: string) {
        this.url = url
        setTimeout(() => {
            if (this.onopen) this.onopen()
        }, 0)
    }

    send(data: string) {
        // Mock send
    }

    close() {
        if (this.onclose) this.onclose()
    }

    // Helper method to simulate receiving messages
    simulateMessage(data: any) {
        if (this.onmessage) {
            this.onmessage({ data: JSON.stringify(data) })
        }
    }
}

// Mock localStorage
export const mockLocalStorage = () => {
    let store: Record<string, string> = {}

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value
        },
        removeItem: (key: string) => {
            delete store[key]
        },
        clear: () => {
            store = {}
        },
    }
}

// Mock next/navigation
export const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
}

export const mockPathname = '/orders'
export const mockSearchParams = new URLSearchParams()

