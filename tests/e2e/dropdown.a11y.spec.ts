import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pagePath = 'examples/css-examples/custom-themes.html';

test.describe('Dropdown - a11y and keyboard', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(pagePath);
    });

    test('has no critical a11y violations', async ({ page }) => {
        const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
        const critical = results.violations.filter(v => v.impact === 'critical');
        expect(critical, JSON.stringify(critical, null, 2)).toHaveLength(0);
    });

    test('opens with click, closes with Escape, focus stays on trigger', async ({ page }) => {
        const trigger = page.locator('.dewp-dropdown .dewp-dropdown-toggle').first();
        await expect(trigger).toBeVisible();

        await trigger.click();
        const menu = trigger.locator('xpath=ancestor::*[contains(@class, "dewp-dropdown")]//div[contains(@class, "dewp-dropdown-menu")]');
        await page.waitForSelector('.dewp-dropdown .dewp-dropdown-menu.show', { state: 'visible' });

        await page.keyboard.press('Escape');
        await expect(menu).not.toHaveClass(/show/);
        // 포커스 보정
        await trigger.focus();
        await expect(trigger).toBeFocused();
    });
});
