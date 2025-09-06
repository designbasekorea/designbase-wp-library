import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pagePath = 'examples/css-examples/custom-themes.html';

// Helper to get container id by data-accordion attr
async function getAccordionId(page, dataId: string) {
    const container = page.locator(`[data-accordion="${dataId}"]`);
    await expect(container).toBeVisible();
    return dataId;
}

test.describe('Accordion - a11y and keyboard', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(pagePath);
    });

    test('has no critical a11y violations', async ({ page }) => {
        const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
        const critical = results.violations.filter(v => v.impact === 'critical');
        expect(critical, JSON.stringify(critical, null, 2)).toHaveLength(0);
    });

    test('toggle with keyboard (Enter/Space) updates aria-expanded', async ({ page }) => {
        const id = await getAccordionId(page, 'basic-demo');
        const header = page.locator(`[data-accordion="${id}"] [data-accordion-item] [data-accordion-header]`).first();
        const content = page.locator(`[data-accordion="${id}"] [data-accordion-item] [data-accordion-content]`).first();

        await header.focus();
        await expect(header).toHaveAttribute('aria-expanded', 'false');

        await page.keyboard.press('Enter');
        await expect(header).toHaveAttribute('aria-expanded', 'true');
        await expect(content).toBeVisible();

        await page.keyboard.press(' ');
        await expect(header).toHaveAttribute('aria-expanded', 'false');
    });

    test('Tab order: headers are tabbable', async ({ page }) => {
        const headers = page.locator('[data-accordion] [data-accordion-header]');
        const count = await headers.count();
        expect(count).toBeGreaterThan(0);

        await headers.first().focus();
        for (let i = 0; i < Math.min(count, 3); i++) {
            await expect(headers.nth(i)).toBeFocused();
            await page.keyboard.press('Tab');
        }
    });
});
