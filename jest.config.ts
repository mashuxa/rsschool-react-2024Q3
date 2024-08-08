/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const presets = ['@babel/preset-typescript', '@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]];

const config: Config = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}', '!./src/store/hooks.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { presets }],
    '^.+\\.(js|jsx)$': ['babel-jest', { presets }],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(.*esm.*|@web3-storage)/)'],
};

export default config;
