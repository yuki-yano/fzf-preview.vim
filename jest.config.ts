import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest/presets/js-with-ts",
  transform: {
    "^.+\\.ts$": "ts-jest",
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
