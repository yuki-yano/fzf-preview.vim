module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:node/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  plugins: ["@typescript-eslint", "node", "import", "prettier", "simple-import-sort"],
  env: {
    jest: true
  },
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  settings: {
    "import/resolver": {
      typescript: {}
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    }
  },
  rules: {
    complexity: ["error", 7],
    "no-console": "off",
    "no-else-return": "off",
    "object-shorthand": "error",
    "no-restricted-syntax": "off",
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["draft", "state"]
      }
    ],

    "simple-import-sort/sort": "warn",
    "no-restricted-imports": ["error", { patterns: ["./", "../"] }],
    "import/prefer-default-export": "off",
    "import/extensions": ["error", "ignorePackages", { ts: "never" }],

    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/array-type": ["error", { default: "generic" }],
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-ignore": "off",

    "node/no-unsupported-features/es-syntax": "off",
    "node/no-missing-import": "off",

    "prettier/prettier": "error"
  }
}
