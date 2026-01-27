import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  modulePaths: ["<rootDir>/src/", "<rootDir>/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/*.d.ts",
    "!**/tests/**",
    "!**/coverage/**",
    "!<rootDir>/src/pages/api/**",
    "!<rootDir>/*.config.ts",
    "!<rootDir>/src/midleware.ts",
    "!<rootDir>/src/midlewares/**",
    "!<rootDir>/src/lib/**",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
