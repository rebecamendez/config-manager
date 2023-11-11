/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  transform: { '.+\\.(t|j)s$': ['ts-jest', { isolatedModules: false }] } // https://github.com/kulshekhar/ts-jest/issues/1166
};
