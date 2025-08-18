import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Aeon Credit/)
    
    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading).toContainText('Aeon Credit')
    await expect(mainHeading).toContainText('Management System')
  })

  test('displays hero section content', async ({ page }) => {
    await expect(page.getByText('Secure, modern credit management with advanced authentication')).toBeVisible()
  })

  test('has working navigation buttons', async ({ page }) => {
    const getStartedButton = page.getByRole('link', { name: /get started/i })
    await expect(getStartedButton).toBeVisible()
    await expect(getStartedButton).toHaveAttribute('href', '/login')

    const learnMoreButton = page.getByRole('button', { name: /learn more/i })
    await expect(learnMoreButton).toBeVisible()
  })

  test('displays all feature cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Advanced Security' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Transaction Management' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'User Experience' })).toBeVisible()
  })

  test('is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    
    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading).toBeVisible()
    
    const featureCards = page.locator('.grid.md\\:grid-cols-3 > div')
    await expect(featureCards).toHaveCount(3)
  })

  test('has proper semantic structure', async ({ page }) => {
    const h1Elements = page.locator('h1')
    await expect(h1Elements).toHaveCount(1)
    
    const h3Elements = page.locator('h3')
    await expect(h3Elements).toHaveCount(3)
  })
})