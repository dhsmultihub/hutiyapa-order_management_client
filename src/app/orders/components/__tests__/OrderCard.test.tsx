import { render, screen } from '@/test-utils/render'
import OrderCard from '../OrderCard'
import { createMockOrder } from '@/test-utils/fixtures'

// Mock Next.js Link
jest.mock('next/link', () => {
    return ({ children, href }: any) => {
        return <a href={href}>{children}</a>
    }
})

describe('OrderCard Component', () => {
    const mockOrder = createMockOrder()

    it('renders order information correctly', () => {
        render(<OrderCard order={mockOrder} />)

        expect(screen.getByText(mockOrder.orderNumber)).toBeInTheDocument()
        expect(screen.getByText('PENDING')).toBeInTheDocument()
    })

    it('displays order amount', () => {
        render(<OrderCard order={mockOrder} />)

        expect(screen.getByText(/\$230\.00/)).toBeInTheDocument()
    })

    it('shows number of items', () => {
        render(<OrderCard order={mockOrder} />)

        expect(screen.getByText(/1 item/)).toBeInTheDocument()
    })

    it('links to order details page', () => {
        render(<OrderCard order={mockOrder} />)

        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', `/orders/${mockOrder.id}`)
    })

    it('renders different order statuses', () => {
        const processingOrder = createMockOrder({ status: 'PROCESSING' })
        const { rerender } = render(<OrderCard order={processingOrder} />)

        expect(screen.getByText('PROCESSING')).toBeInTheDocument()

        const deliveredOrder = createMockOrder({ status: 'DELIVERED' })
        rerender(<OrderCard order={deliveredOrder} />)

        expect(screen.getByText('DELIVERED')).toBeInTheDocument()
    })

    it('displays formatted date', () => {
        render(<OrderCard order={mockOrder} />)

        // Check that some date is displayed
        expect(screen.getByText(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/)).toBeInTheDocument()
    })

    it('handles multiple items correctly', () => {
        const orderWithMultipleItems = createMockOrder({
            items: [
                ...mockOrder.items,
                {
                    id: 'item-2',
                    orderId: '1',
                    productId: 'prod-2',
                    productName: 'Another Product',
                    quantity: 1,
                    price: 50,
                    subtotal: 50,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
        })

        render(<OrderCard order={orderWithMultipleItems} />)

        expect(screen.getByText(/2 items/)).toBeInTheDocument()
    })
})

