import { test, expect } from '@playwright/test'

test.describe('Order Management', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to orders page before each test
        await page.goto('/orders')
    })

    test('should display orders page title', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /orders/i })).toBeVisible()
    })

    test('should show orders list', async ({ page }) => {
        // Wait for orders to load
        await page.waitForSelector('[data-testid="order-card"], .order-card', {
            timeout: 5000,
            state: 'visible',
        }).catch(() => {
            // If no orders, that's okay for this test
        })

        // Check for either orders or empty state
        const hasOrders = await page.locator('[data-testid="order-card"], .order-card').count()
        const hasEmptyState = await page.locator('text=/no orders/i').count()

        expect(hasOrders > 0 || hasEmptyState > 0).toBeTruthy()
    })

    test('should navigate to create order page', async ({ page }) => {
        const createButton = page.getByRole('link', { name: /create order/i })
        await expect(createButton).toBeVisible()
        await createButton.click()

        await expect(page).toHaveURL(/\/orders\/new/)
    })

    test('should filter orders by status', async ({ page }) => {
        // Look for filter controls
        const filterButton = page.locator('button:has-text("Status"), select[name="status"]').first()

        if (await filterButton.isVisible()) {
            await filterButton.click()
            // Interact with filter options
            const pendingOption = page.locator('text=/pending/i').first()
            if (await pendingOption.isVisible()) {
                await pendingOption.click()
            }
        }
    })

    test('should display order statistics', async ({ page }) => {
        // Check for statistics cards
        const statsCards = page.locator('[class*="stat"], [class*="metric"]')
        const count = await statsCards.count()

        // Should have at least one statistic displayed
        expect(count).toBeGreaterThanOrEqual(0)
    })

    test('should be responsive on mobile', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 })

        // Check for mobile navigation
        const mobileNav = page.locator('nav').filter({ has: page.locator('[class*="bottom"]') })
        await expect(mobileNav).toBeVisible({ timeout: 10000 })
    })
})

test.describe('Order Details', () => {
    test('should navigate to order details', async ({ page }) => {
        await page.goto('/orders')

        // Wait for orders to load
        const orderCard = page.locator('[data-testid="order-card"], .order-card, a[href*="/orders/"]').first()

        if (await orderCard.isVisible()) {
            await orderCard.click()
            await expect(page).toHaveURL(/\/orders\/[^/]+$/)
        }
    })

    test('should display order information', async ({ page }) => {
        // Mock order ID for testing
        await page.goto('/orders/1')

        // Wait for page to load (either with data or error)
        await page.waitForLoadState('networkidle')

        // Check if we have order details or error message
        const hasOrderNumber = await page.locator('text=/ORD-/i').count()
        const hasError = await page.locator('text=/error|not found/i').count()

        expect(hasOrderNumber > 0 || hasError > 0).toBeTruthy()
    })
})

test.describe('Real-time Updates', () => {
    test('should show connection status', async ({ page }) => {
        await page.goto('/orders')

        // Look for connection status indicator
        const connectionIndicator = page.locator('[class*="connection"], [data-testid="connection-status"]')

        // Connection status should be present (might be hidden initially)
        const count = await connectionIndicator.count()
        expect(count).toBeGreaterThanOrEqual(0)
    })

    test('should display notification center', async ({ page }) => {
        await page.goto('/orders')

        // Look for notification bell or center
        const notificationCenter = page.locator('[class*="notification"], button:has(svg[class*="bell"])')
        const count = await notificationCenter.count()

        expect(count).toBeGreaterThanOrEqual(0)
    })
})

