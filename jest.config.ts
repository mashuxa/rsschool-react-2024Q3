/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "!./src/pages/_app.tsx",
    "!./src/pages/_document.tsx",
    "!./src/store/hooks.ts",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          "@babel/preset-typescript",
          "@babel/preset-env",
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },
};

export default config;
