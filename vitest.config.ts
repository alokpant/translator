import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Use jsdom for React Native testing
    setupFiles: './test/setup.ts', // Path to setup file
  },
});
