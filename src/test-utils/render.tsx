import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a custom render function that includes providers
function createTestQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                gcTime: Infinity,
            },
            mutations: {
                retry: false,
            },
        },
    })
}

interface AllTheProvidersProps {
    children: React.ReactNode
}

function AllTheProviders({ children }: AllTheProvidersProps) {
    const testQueryClient = createTestQueryClient()

    return (
        <QueryClientProvider client={testQueryClient}>
            {children}
        </QueryClientProvider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render, createTestQueryClient }

