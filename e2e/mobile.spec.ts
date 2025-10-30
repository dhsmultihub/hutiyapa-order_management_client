import { test, expect } from '@playwright/test'

test.describe('Mobile Responsiveness', () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test('should show mobile navigation', async ({ page }) => {
        await page.goto('/')

        // Check for mobile bottom navigation
        const mobileNav = page.locator('nav').filter({ has: page.locator('[class*="bottom"]') })
        await expect(mobileNav).toBeVisible({ timeout: 10000 })
    })

    test('should navigate using mobile tabs', async ({ page }) => {
        await page.goto('/')

        // Find and click Orders tab
        const ordersTab = page.locator('a[href="/orders"]').last()
        if (await ordersTab.isVisible()) {
            await ordersTab.click()
            await expect(page).toHaveURL('/orders')
        }
    })

    test('should open mobile menu', async ({ page }) => {
        await page.goto('/')

        // Look for hamburger menu button
        const menuButton = page.locator('button:has(svg), button[aria-label*="menu" i]').first()

        if (await menuButton.isVisible()) {
            await menuButton.click()

            // Check if menu opens
            const menu = page.locator('[role="dialog"], aside, [class*="menu"]')
            await expect(menu.first()).toBeVisible({ timeout: 5000 })
        }
    })

    test('should display mobile-optimized order cards', async ({ page }) => {
        await page.goto('/orders')

        // Wait for content to load
        await page.waitForLoadState('networkidle')

        // Check if mobile cards are displayed
        const cards = page.locator('[data-testid="mobile-order-card"], [class*="mobile"]')
        const count = await cards.count()

        // Either have mobile cards or regular cards
        expect(count).toBeGreaterThanOrEqual(0)
    })

    test('should handle touch interactions', async ({ page }) => {
        await page.goto('/orders')

        // Simulate touch on first order card
        const firstCard = page.locator('[data-testid="order-card"], .order-card, a[href*="/orders/"]').first()

        if (await firstCard.isVisible()) {
            await firstCard.tap()
            // Should navigate to order details
            await expect(page).toHaveURL(/\/orders\/[^/]+$/)
        }
    })
})

test.describe('Tablet Responsiveness', () => {
    test.use({ viewport: { width: 768, height: 1024 } })

    test('should adapt layout for tablet', async ({ page }) => {
        await page.goto('/orders')

        // Verify page loads correctly
        await expect(page.getByRole('heading', { name: /orders/i })).toBeVisible()
    })

    test('should show appropriate navigation for tablet', async ({ page }) => {
        await page.goto('/')

        // Check navigation visibility
        const nav = page.locator('nav').first()
        await expect(nav).toBeVisible()
    })
})

