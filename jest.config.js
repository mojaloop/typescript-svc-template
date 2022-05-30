module.exports = {
  displayName: 'tsc',
  testMatch: [
    '**/test/unit/**/*.test.ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '^.+\\.json$',
    'jest.config.js'
  ],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  verbose: true,
  coverageThreshold: {
    global: {
      statements: 90,
      functions: 90,
      branches: 90,
      lines: 90
    }
  },
  coveragePathIgnorePatterns: [
    "src/index.ts"
  ]
}
