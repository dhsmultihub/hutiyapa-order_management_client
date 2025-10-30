import { render, screen } from '@/test-utils/render'
import userEvent from '@testing-library/user-event'
import Input from '../input'

describe('Input Component', () => {
    it('renders correctly with label', () => {
        render(<Input label="Email" />)
        expect(screen.getByLabelText('Email')).toBeInTheDocument()
    })

    it('handles input changes', async () => {
        const handleChange = jest.fn()
        const user = userEvent.setup()

        render(<Input label="Name" onChange={handleChange} />)
        const input = screen.getByLabelText('Name')

        await user.type(input, 'John Doe')
        expect(input).toHaveValue('John Doe')
        expect(handleChange).toHaveBeenCalled()
    })

    it('displays error message', () => {
        render(<Input label="Email" error="Invalid email" />)
        expect(screen.getByText('Invalid email')).toBeInTheDocument()
        expect(screen.getByLabelText('Email')).toHaveClass('border-red-500')
    })

    it('displays helper text', () => {
        render(<Input label="Password" helperText="Minimum 8 characters" />)
        expect(screen.getByText('Minimum 8 characters')).toBeInTheDocument()
    })

    it('can be disabled', () => {
        render(<Input label="Disabled" disabled />)
        expect(screen.getByLabelText('Disabled')).toBeDisabled()
    })

    it('can be required', () => {
        render(<Input label="Required" required />)
        expect(screen.getByLabelText('Required *')).toBeRequired()
    })

    it('supports different input types', () => {
        const { rerender } = render(<Input label="Email" type="email" />)
        expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')

        rerender(<Input label="Password" type="password" />)
        expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')

        rerender(<Input label="Number" type="number" />)
        expect(screen.getByLabelText('Number')).toHaveAttribute('type', 'number')
    })

    it('forwards ref correctly', () => {
        const ref = jest.fn()
        render(<Input ref={ref} label="Ref Input" />)
        expect(ref).toHaveBeenCalled()
    })
})

