module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  modulePaths: ['<rootDir>'],
  testRegex: '.*\\.spec\\.ts$',
  transform: { '.+\\.(t|j)s$': ['ts-jest', { isolatedModules: true }] },
  collectCoverageFrom: ['**/*.ts', '!main.ts', '!migrations/**', '!utils/logger.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coverageReporters: ['lcov', 'text-summary'],
  testTimeout: 20000
};
