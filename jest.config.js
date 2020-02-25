module.exports = {
  resetMocks: true,
  verbose: true,
  modulePathIgnorePatterns: ['node_modules/.*'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: false,
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  testEnvironment: 'node',
};