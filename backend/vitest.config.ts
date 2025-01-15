import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/__tests__/**/*.spec.ts"],
    setupFiles: ["src/__tests__/helpers/setup.ts"],
    maxConcurrency: 1,
  },
});
