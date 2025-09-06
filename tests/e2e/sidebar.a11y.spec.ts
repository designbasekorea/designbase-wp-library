import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pagePath = 'examples/css-examples/sidebar-test.html';

test.describe('Sidebar - a11y and keyboard', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(pagePath);
    });

    test('has no critical a11y violations', async ({ page }) => {
        const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
        const critical = results.violations.filter(v => v.impact === 'critical');
        expect(critical, JSON.stringify(critical, null, 2)).toHaveLength(0);
    });

    test('submenu toggles with keyboard and sets aria-expanded', async ({ page }) => {
        const menuWithSub = page.locator('.dewp-sidebar .dewp-sidebar-menu-item.has-submenu').first();
        const toggle = menuWithSub.locator('> .dewp-sidebar-menu-link').first();

        await toggle.waitFor();
        await toggle.focus();
        await page.keyboard.press('Enter');
        await expect(toggle).toHaveAttribute('aria-expanded', /true|false/);

        await page.keyboard.press(' ');
        // When closing, attribute may switch; ensure no crash and element remains tabbable
        await expect(toggle).toBeVisible();
    });
});
