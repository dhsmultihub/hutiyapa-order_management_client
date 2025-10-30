import {
    cn,
    formatDate,
    formatCurrency,
    generateRandomId,
    calculateOrderTotals,
    debounce,
    throttle,
    truncate,
    formatPhoneNumber,
    formatCompactNumber,
} from '../utils'

describe('Utility Functions', () => {
    describe('cn (className merge)', () => {
        it('merges class names correctly', () => {
            expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500')
        })

        it('handles conditional classes', () => {
            expect(cn('base', true && 'active', false && 'inactive')).toBe('base active')
        })

        it('overrides Tailwind classes correctly', () => {
            expect(cn('p-4', 'p-8')).toBe('p-8')
        })
    })

    describe('formatDate', () => {
        const testDate = new Date('2024-01-15T10:30:00Z')

        it('formats date in short format', () => {
            const result = formatDate(testDate, 'short')
            expect(result).toContain('Jan')
            expect(result).toContain('15')
            expect(result).toContain('2024')
        })

        it('formats date in long format', () => {
            const result = formatDate(testDate, 'long')
            expect(result).toContain('January')
            expect(result).toContain('15')
            expect(result).toContain('2024')
        })

        it('formats date in relative format', () => {
            const now = new Date()
            const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
            const result = formatDate(yesterday, 'relative')
            expect(result).toContain('day')
            expect(result).toContain('ago')
        })

        it('handles string dates', () => {
            const result = formatDate('2024-01-15', 'short')
            expect(result).toBeTruthy()
        })
    })

    describe('formatCurrency', () => {
        it('formats USD correctly', () => {
            expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56')
        })

        it('formats with different currencies', () => {
            expect(formatCurrency(1000, 'EUR')).toContain('€')
        })

        it('handles zero', () => {
            expect(formatCurrency(0, 'USD')).toBe('$0.00')
        })

        it('handles negative numbers', () => {
            expect(formatCurrency(-100, 'USD')).toBe('-$100.00')
        })
    })

    describe('generateRandomId', () => {
        it('generates random IDs', () => {
            const id1 = generateRandomId()
            const id2 = generateRandomId()
            expect(id1).not.toBe(id2)
        })

        it('includes prefix when provided', () => {
            const id = generateRandomId('order')
            expect(id).toMatch(/^order_/)
        })

        it('generates IDs without prefix', () => {
            const id = generateRandomId()
            expect(id).not.toContain('_')
        })
    })

    describe('calculateOrderTotals', () => {
        it('calculates totals correctly', () => {
            const items = [
                { quantity: 2, price: 100 },
                { quantity: 1, price: 50 },
            ]
            const result = calculateOrderTotals(items)

            expect(result.subtotal).toBe(250)
            expect(result.tax).toBe(25) // 10%
            expect(result.total).toBe(275)
        })

        it('handles empty items array', () => {
            const result = calculateOrderTotals([])

            expect(result.subtotal).toBe(0)
            expect(result.tax).toBe(0)
            expect(result.total).toBe(0)
        })

        it('handles decimal prices', () => {
            const items = [{ quantity: 3, price: 19.99 }]
            const result = calculateOrderTotals(items)

            expect(result.subtotal).toBeCloseTo(59.97, 2)
        })
    })

    describe('debounce', () => {
        jest.useFakeTimers()

        it('debounces function calls', () => {
            const func = jest.fn()
            const debouncedFunc = debounce(func, 100)

            debouncedFunc()
            debouncedFunc()
            debouncedFunc()

            expect(func).not.toHaveBeenCalled()

            jest.advanceTimersByTime(100)
            expect(func).toHaveBeenCalledTimes(1)
        })

        jest.useRealTimers()
    })

    describe('throttle', () => {
        jest.useFakeTimers()

        it('throttles function calls', () => {
            const func = jest.fn()
            const throttledFunc = throttle(func, 100)

            throttledFunc()
            throttledFunc()
            throttledFunc()

            expect(func).toHaveBeenCalledTimes(1)

            jest.advanceTimersByTime(100)
            throttledFunc()
            expect(func).toHaveBeenCalledTimes(2)
        })

        jest.useRealTimers()
    })

    describe('truncate', () => {
        it('truncates long strings', () => {
            expect(truncate('Hello World', 5)).toBe('Hello...')
        })

        it('does not truncate short strings', () => {
            expect(truncate('Hello', 10)).toBe('Hello')
        })

        it('handles exact length', () => {
            expect(truncate('Hello', 5)).toBe('Hello')
        })
    })

    describe('formatPhoneNumber', () => {
        it('formats 10-digit phone numbers', () => {
            expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890')
        })

        it('handles already formatted numbers', () => {
            const formatted = '(123) 456-7890'
            expect(formatPhoneNumber(formatted)).toBe(formatted)
        })

        it('handles invalid formats gracefully', () => {
            expect(formatPhoneNumber('123')).toBe('123')
        })
    })

    describe('formatCompactNumber', () => {
        it('formats numbers under 1000', () => {
            expect(formatCompactNumber(999)).toBe('999')
        })

        it('formats thousands', () => {
            expect(formatCompactNumber(1500)).toBe('1.5K')
        })

        it('formats millions', () => {
            expect(formatCompactNumber(2500000)).toBe('2.5M')
        })

        it('handles zero', () => {
            expect(formatCompactNumber(0)).toBe('0')
        })
    })
})

