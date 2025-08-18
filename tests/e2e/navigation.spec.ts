import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('Get Started button navigates to login page', async ({ page }) => {
    await page.goto('/')
    
    const getStartedButton = page.getByRole('link', { name: /get started/i })
    await getStartedButton.click()
    
    await expect(page).toHaveURL('/login')
  })

  test('Learn More button is clickable', async ({ page }) => {
    await page.goto('/')
    
    const learnMoreButton = page.getByRole('button', { name: /learn more/i })
    await expect(learnMoreButton).toBeVisible()
    await expect(learnMoreButton).toBeEnabled()
    
    await learnMoreButton.click()
  })

  test('page loads without JavaScript errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    expect(errors.length).toBe(0)
  })
})