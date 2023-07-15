/** @type {import('jest').Config} */
const config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,  
  collectCoverage: true, 
  coverageDirectory: "coverage", 
  coverageProvider: "v8",
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};

module.exports = config;
