import { test, expect } from '@playwright/test'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))

const waitForPreview = async (page) => {
  await page.goto('/')
  await expect(page.getByText('CURATED PREVIEW')).toBeVisible()
  await expect(page.getByText('Crispy Chili Paneer')).toBeVisible()
}

test.describe('Craveo consumer interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('opens a bite detail modal and submits a review', async ({ page }) => {
    await waitForPreview(page)
    await page.getByText('Crispy Chili Paneer').click()

    const dialog = page.getByRole('dialog', { name: 'Crispy Chili Paneer' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText('What people are saying')).toBeVisible()

    await dialog.getByRole('button', { name: '5 stars' }).click()
    await dialog.getByPlaceholder('What did you think?').fill('Smoky, crisp, and genuinely worth the detour.')
    await dialog.getByRole('button', { name: /Save review/ }).click()

    await expect(dialog.getByText('You', { exact: true })).toBeVisible()
    await expect(dialog.getByText('Smoky, crisp, and genuinely worth the detour.')).toBeVisible()
  })

  test('saves a bite and keeps it in the Saved route', async ({ page }) => {
    await waitForPreview(page)
    const card = page.locator('.bite-card').filter({ hasText: 'Crispy Chili Paneer' })
    await card.getByRole('button', { name: 'Save Crispy Chili Paneer' }).click()
    await page.goto('/saved')

    await expect(page.getByText('Crispy Chili Paneer')).toBeVisible()
    await expect(page.getByText('01')).toBeVisible()
  })
})

test.describe('Craveo partner upload', () => {
  test('accepts a video file in the upload form and shows its preview chip', async ({ page }) => {
    await page.goto('/create-food')
    const fixture = path.join(currentDir, 'fixtures', 'sample.mp4')
    await page.locator('input[type="file"]').setInputFiles(fixture)

    await expect(page.getByText('sample.mp4')).toBeVisible()
    await expect(page.locator('.file-chip-size')).toHaveText('0.0 MB')
    await expect(page.getByRole('button', { name: 'Share on Craveo' })).toBeDisabled()
  })
})

test('submits a review against the live API contract', async ({ page }) => {
  await page.route('**/api/food', async (route) => {
    if (route.request().method() !== 'GET') return route.continue()
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        foodItems: [{
          _id: 'bite-1',
          name: 'Crispy Chili Paneer',
          description: 'Smoky char and house chili oil.',
          foodPartner: { name: 'Naan & Beyond', address: 'Indiranagar · 1.2 km' },
          likeCount: 12,
          savesCount: 4,
          isLiked: false,
          isSaved: false,
        }],
      }),
    })
  })
  await page.route('**/api/food/bite-1', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        food: { _id: 'bite-1', name: 'Crispy Chili Paneer', description: 'Smoky char and house chili oil.', foodPartner: { name: 'Naan & Beyond', address: 'Indiranagar · 1.2 km' }, likeCount: 12, savesCount: 4 },
        reviews: [],
        reviewCount: 0,
        averageRating: null,
        userReview: null,
      }),
    })
  })
  await page.route('**/api/food/bite-1/reviews', async (route) => {
    if (route.request().method() !== 'POST') return route.continue()
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ review: { _id: 'review-1', rating: 4, comment: 'Great texture and a bright finish.', user: { fullName: 'Test Diner' }, createdAt: new Date().toISOString() } }),
    })
  })

  await page.goto('/')
  await expect(page.getByText('LIVE FROM CRAVEO')).toBeVisible()
  await page.getByText('Crispy Chili Paneer').click()
  const dialog = page.getByRole('dialog', { name: 'Crispy Chili Paneer' })
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: '4 stars' }).click()
  await dialog.getByPlaceholder('What did you think?').fill('Great texture and a bright finish.')
  await dialog.getByRole('button', { name: /Save review/ }).click()
  await expect(dialog.getByText('Test Diner')).toBeVisible()
  await expect(dialog.getByText('Great texture and a bright finish.')).toBeVisible()
})

test('completes the reel-to-order discovery journey', async ({ page }) => {
  await page.goto('/reels')
  await expect(page.getByText('VISUAL FOOD NETWORK')).toBeVisible()
  await expect(page.getByRole('button', { name: /Order Crispy Chili Paneer/ })).toBeVisible()
  await page.getByRole('button', { name: /Order Crispy Chili Paneer/ }).click()
  await expect(page.getByText('Added to bag')).toBeVisible()

  await page.getByRole('button', { name: /Open cart/ }).click()
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible()
  await expect(page.getByText('Crispy Chili Paneer')).toBeVisible()
  await page.getByRole('button', { name: /Place order/ }).click()

  await expect(page.getByRole('heading', { name: 'Orders' })).toBeVisible()
  await expect(page.getByText(/ORDER CRV-/)).toBeVisible()
  await expect(page.getByText('Confirmed')).toBeVisible()
})

test('explores the Lucknow catalog by neighborhood and opens a menu', async ({ page }) => {
  await page.goto('/lucknow')
  await expect(page.getByRole('heading', { name: 'Lucknow is hungry.' })).toBeVisible()
  await expect(page.getByText('STARTER CATALOG')).toBeVisible()
  await expect(page.getByText('Google Maps').first()).toBeVisible()
  await page.getByRole('button', { name: /Aminabad31/ }).click()
  await expect(page.getByText('1 places')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Aminabad Chaat Co.' })).toBeVisible()
  await page.getByRole('button', { name: 'View menu →' }).click()
  await expect(page.getByRole('heading', { name: 'Aminabad Chaat Co.' })).toBeVisible()
  await expect(page.getByText('Good things, grouped.')).toBeVisible()
})
