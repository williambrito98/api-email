/** @type {import('jest').Config} */
const config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,  
  collectCoverage: true, 
  coverageDirectory: "coverage", 
  coverageProvider: "v8",
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/protocols/',
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testPathIgnorePatterns: [
    './src/presentation/protocols/',
    './node_modules/'
  ]
};

module.exports = config;
