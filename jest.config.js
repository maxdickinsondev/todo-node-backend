/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["<rootDir>/src/factories/controllers/index.ts"],
};
