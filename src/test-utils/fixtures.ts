import { Order, OrderStatus } from '@/types/order'

/**
 * Test fixtures for order management
 */

export const createMockOrder = (overrides?: Partial<Order>): Order => ({
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
    ...overrides,
})

export const createMockOrders = (count: number): Order[] => {
    return Array.from({ length: count }, (_, i) =>
        createMockOrder({
            id: `${i + 1}`,
            orderNumber: `ORD-${String(i + 1).padStart(3, '0')}`,
        })
    )
}

export const orderStatuses: OrderStatus[] = [
    'PENDING',
    'PROCESSING',
    'CONFIRMED',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
    'REFUNDED',
]

export const createOrderWithStatus = (status: OrderStatus): Order => {
    return createMockOrder({ status })
}

