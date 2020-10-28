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
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/standard",
  ],
  plugins: ["@typescript-eslint", "node", "import", "prettier", "simple-import-sort"],
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
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
        ignorePropertyModificationsFor: ["draft", "state"],
      },
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
    ],
    "no-return-await": "off",

    "simple-import-sort/sort": "warn",
    "no-restricted-imports": ["error", { patterns: ["./", "../"] }],
    "import/prefer-default-export": "off",
    "import/extensions": ["error", "ignorePackages", { ts: "never" }],
    "@typescript-eslint/consistent-type-imports": "error",

    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/array-type": ["error", { default: "generic" }],
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],

    "node/no-unsupported-features/es-syntax": "off",
    "node/no-missing-import": "off",

    "prettier/prettier": "error",
  },
  overrides: [
    {
      files: ["**/*.test.ts"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
      plugins: ["jest"],
      env: {
        jest: true,
      },
      rules: {
        "@typescript-eslint/no-empty-function": "off",
      },
    },
    {
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.webpack-jest.json",
      },
      files: ["./webpack.*.ts", "./jest.config.ts"],
      rules: {
        "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
        "no-restricted-imports": "off",
      },
    },
  ],
}
