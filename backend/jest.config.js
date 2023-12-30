/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["./src/__tests__/mockedHero.ts"],
  moduleNameMapper: {
    "@exmpl/(.*)": "<rootDir>/src/$1",
  },
};