module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  setupFilesAfterEnv: [
    '<rootDir>/jest.env.ts',
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  }
};