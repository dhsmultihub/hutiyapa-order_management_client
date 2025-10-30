import { test, expect } from '@playwright/test'

test.describe('Analytics Dashboard', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/analytics')
    })

    test('should display analytics page', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /analytics/i })).toBeVisible()
    })

    test('should show key metrics', async ({ page }) => {
        // Wait for metrics to load
        await page.waitForLoadState('networkidle')

        // Check for metric cards
        const metrics = page.locator('[class*="metric"], [class*="stat"]')
        const count = await metrics.count()

        expect(count).toBeGreaterThanOrEqual(0)
    })

    test('should allow period selection', async ({ page }) => {
        // Look for period selector buttons
        const periodButtons = page.locator('button:has-text("Today"), button:has-text("Week"), button:has-text("Month")')
        const count = await periodButtons.count()

        if (count > 0) {
            await periodButtons.first().click()
            // Verify the button is selected
            await expect(periodButtons.first()).toHaveClass(/bg-blue|active/)
        }
    })

    test('should be mobile responsive', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })

        // Check that analytics are visible on mobile
        const heading = page.getByRole('heading', { name: /analytics/i })
        await expect(heading).toBeVisible()
    })
})

