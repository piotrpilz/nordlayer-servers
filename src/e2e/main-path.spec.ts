import { test, expect } from '@playwright/test'

const TEST_USERNAME = 'tesonet'
const TEST_PASSWORD = 'partyanimal'
const BASE_URL = process.env.VITE_E2E_BASE_URL

console.log(BASE_URL)

test('Display login error for wrong credentials', async ({ page }) => {
  await page.goto(`${BASE_URL}/`)

  await expect(page.getByTestId('login-form')).toBeVisible()

  await expect(page.getByTestId('login-button')).toBeDisabled()

  await page.getByTestId('username-field').fill('wrongUsername')
  await page.getByTestId('password-field').fill('wrongPassword')

  await expect(page.getByTestId('login-button')).not.toBeDisabled()

  await page.getByTestId('login-button').click()

  await expect(page.getByTestId('login-error')).toBeVisible()
});

test(`Login with correct credentials, display servers list and perform sorting. Logout.`, async ({ page }) => {
  await page.goto(`${BASE_URL}/`)

  // login view
  await expect(page.getByTestId('login-form')).toBeVisible()

  await expect(page.getByTestId('login-button')).toBeDisabled()

  await page.getByTestId('username-field').fill(TEST_USERNAME)
  await page.getByTestId('password-field').fill(TEST_PASSWORD)

  await expect(page.getByTestId('login-button')).not.toBeDisabled()

  await page.getByTestId('login-button').click()

  await expect(page.getByTestId('login-button')).toHaveText('Logging in...')
  await page.waitForResponse('**/v1/tokens')

  // servers view
  await page.waitForResponse('**/v1/servers')

  expect(page.getByTestId('servers-view')).toBeVisible()
  await page.waitForSelector('[data-testid="servers-list"]')

  expect(await page.locator('[data-testid^="server-"]').count()).toBeGreaterThan(0)

  await page.getByTestId('sort-by-name').click()
  let serverItems = await page.locator('[data-testid="server-name"]').allInnerTexts()

  const isSortedAlphabetically = serverItems.every((server, index) => {
    return index === 0 || serverItems[index - 1].localeCompare(server) <= 0
  })
  expect(isSortedAlphabetically).toBe(true)

  await page.getByTestId('sort-by-distance').click()
  serverItems = await page.locator('[data-testid="server-distance"]').allTextContents()
  const distancesAsNumbers = serverItems.map(item => parseFloat(item.replace(' km', '')))

  const isSortedByDistance = distancesAsNumbers.every((num, index) => {
    return index === 0 || distancesAsNumbers[index - 1] <= num
  });
  expect(isSortedByDistance).toBe(true)

  // Logout
  await page.getByTestId('logout-button').click()
  await expect(page.getByTestId('login-form')).toBeVisible()
})
