import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: 'tests/e2e',
    timeout: 60000,
    expect: { timeout: 5000 },
    retries: 0,
    use: {
        baseURL: 'http://localhost:5173/',
        headless: true,
    },
    webServer: {
        command: 'npm run serve:site',
        port: 5173,
        reuseExistingServer: true,
        timeout: 120000,
    },
    reporter: [['list'], ['html', { open: 'never' }]],
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
});
