const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup/traineePayments.setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/__tests__/**/traineePayments/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/src/__tests__/features/traineePayments/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/src/__tests__/hooks/usePayments.test.{js,jsx,ts,tsx}',
    '<rootDir>/src/__tests__/components/TraineePayments/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/src/__tests__/utils/traineePaymentUtils.test.{js,jsx,ts,tsx}',
    '<rootDir>/src/__tests__/app/TraineePayments/**/*.test.{js,jsx,ts,tsx}',
  ],
  collectCoverageFrom: [
    'src/lip/features/traineePayments/**/*.{js,jsx,ts,tsx}',
    'src/hooks/usePayments.{js,jsx,ts,tsx}',
    'src/components/TraineePayments/**/*.{js,jsx,ts,tsx}',
    'src/utils/traineePaymentUtils.{js,jsx,ts,tsx}',
    'src/app/TraineePayments/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    'src/lip/features/traineePayments/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    'src/hooks/usePayments.ts': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    'src/utils/traineePaymentUtils.ts': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testTimeout: 10000,
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
