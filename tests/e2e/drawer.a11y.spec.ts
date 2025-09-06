import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pagePath = 'examples/css-examples/custom-themes.html';

// Assumes a drawer element exists on the page with class .dewp-drawer and a toggle button

test.describe('Drawer - a11y and keyboard', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(pagePath);
    });

    test('has no critical a11y violations', async ({ page }) => {
        const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
        const critical = results.violations.filter(v => v.impact === 'critical');
        expect(critical, JSON.stringify(critical, null, 2)).toHaveLength(0);
    });

    test('opens and closes with buttons and Escape', async ({ page }) => {
        const trigger = page.getByRole('button', { name: /drawer|드로|열기/i });
        const drawer = page.locator('.dewp-drawer').first();

        if (await trigger.count() > 0) {
            await trigger.first().click();
        } else {
            // fallback: try a known control id
            const known = page.locator('#open-drawer, [data-open-drawer]');
            if (await known.count() > 0) await known.first().click();
        }

        await expect(drawer).toHaveClass(/dewp-drawer-open/);

        await page.keyboard.press('Escape');
        await expect(drawer).not.toHaveClass(/dewp-drawer-open/);
    });
});
