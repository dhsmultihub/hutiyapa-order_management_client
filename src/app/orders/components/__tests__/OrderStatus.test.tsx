import { render, screen } from '@/test-utils/render'
import OrderStatus from '../OrderStatus'
import { OrderStatus as OrderStatusType } from '@/types/order'

describe('OrderStatus Component', () => {
    const statuses: OrderStatusType[] = [
        'PENDING',
        'PROCESSING',
        'CONFIRMED',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED',
        'REFUNDED',
    ]

    it.each(statuses)('renders %s status correctly', (status) => {
        render(<OrderStatus status={status} />)
        expect(screen.getByText(status)).toBeInTheDocument()
    })

    it('renders with small size', () => {
        render(<OrderStatus status="PENDING" size="sm" />)
        const badge = screen.getByText('PENDING')
        expect(badge).toHaveClass('text-xs', 'px-2', 'py-1')
    })

    it('renders with medium size', () => {
        render(<OrderStatus status="PROCESSING" size="md" />)
        const badge = screen.getByText('PROCESSING')
        expect(badge).toHaveClass('text-sm', 'px-3', 'py-1')
    })

    it('renders with large size', () => {
        render(<OrderStatus status="DELIVERED" size="lg" />)
        const badge = screen.getByText('DELIVERED')
        expect(badge).toHaveClass('text-base', 'px-4', 'py-2')
    })

    it('applies correct color classes for each status', () => {
        const { rerender } = render(<OrderStatus status="PENDING" />)
        expect(screen.getByText('PENDING')).toHaveClass('bg-yellow-100', 'text-yellow-800')

        rerender(<OrderStatus status="PROCESSING" />)
        expect(screen.getByText('PROCESSING')).toHaveClass('bg-blue-100', 'text-blue-800')

        rerender(<OrderStatus status="CONFIRMED" />)
        expect(screen.getByText('CONFIRMED')).toHaveClass('bg-purple-100', 'text-purple-800')

        rerender(<OrderStatus status="SHIPPED" />)
        expect(screen.getByText('SHIPPED')).toHaveClass('bg-indigo-100', 'text-indigo-800')

        rerender(<OrderStatus status="DELIVERED" />)
        expect(screen.getByText('DELIVERED')).toHaveClass('bg-green-100', 'text-green-800')

        rerender(<OrderStatus status="CANCELLED" />)
        expect(screen.getByText('CANCELLED')).toHaveClass('bg-red-100', 'text-red-800')

        rerender(<OrderStatus status="REFUNDED" />)
        expect(screen.getByText('REFUNDED')).toHaveClass('bg-gray-100', 'text-gray-800')
    })
})

