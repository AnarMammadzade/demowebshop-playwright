import { defineConfig } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  reporter: [['html']],

  use: {
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    baseURL: process.env.BASE_URL,
  },
});
