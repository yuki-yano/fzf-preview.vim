import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: ["js", "ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/*.test.ts"],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
}

export default config
