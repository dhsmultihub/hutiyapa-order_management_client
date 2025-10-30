import { render, screen } from '@/test-utils/render'
import userEvent from '@testing-library/user-event'
import Button from '../button'

describe('Button Component', () => {
    it('renders correctly with default props', () => {
        render(<Button>Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toBeInTheDocument()
    })

    it('handles click events', async () => {
        const handleClick = jest.fn()
        const user = userEvent.setup()

        render(<Button onClick={handleClick}>Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })

        await user.click(button)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('renders different variants', () => {
        const { rerender } = render(<Button variant="default">Default</Button>)
        expect(screen.getByRole('button')).toHaveClass('bg-blue-600')

        rerender(<Button variant="outline">Outline</Button>)
        expect(screen.getByRole('button')).toHaveClass('border-gray-300')

        rerender(<Button variant="ghost">Ghost</Button>)
        expect(screen.getByRole('button')).toHaveClass('hover:bg-gray-100')

        rerender(<Button variant="danger">Danger</Button>)
        expect(screen.getByRole('button')).toHaveClass('bg-red-600')
    })

    it('renders different sizes', () => {
        const { rerender } = render(<Button size="sm">Small</Button>)
        expect(screen.getByRole('button')).toHaveClass('text-sm')

        rerender(<Button size="md">Medium</Button>)
        expect(screen.getByRole('button')).toHaveClass('text-base')

        rerender(<Button size="lg">Large</Button>)
        expect(screen.getByRole('button')).toHaveClass('text-lg')
    })

    it('shows loading state', () => {
        render(<Button isLoading>Loading</Button>)
        const button = screen.getByRole('button')

        expect(button).toBeDisabled()
        expect(button).toHaveTextContent('Loading...')
    })

    it('can be disabled', () => {
        render(<Button disabled>Disabled</Button>)
        const button = screen.getByRole('button')

        expect(button).toBeDisabled()
        expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
    })

    it('renders with custom className', () => {
        render(<Button className="custom-class">Custom</Button>)
        expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    it('forwards ref correctly', () => {
        const ref = jest.fn()
        render(<Button ref={ref}>Ref Button</Button>)
        expect(ref).toHaveBeenCalled()
    })
})

