module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'jsx', 'css', 'ts', 'tsx'],
  moduleNameMapper: {
    '^~/components(.*)$': '<rootDir>/components$1',
    '^~/config(.*)$': '<rootDir>/config$1'
  }
};
