import globals from "globals";
import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Base config for all files
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  // JavaScript-specific config
  js.configs.recommended,
  // TypeScript-specific config for source files (excluding tests)
  {
    files: ["src/**/*.ts"],
    ignores: ["**/*.test.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
    },
  },
  // TypeScript-specific config for test files
  {
    files: ["**/*.test.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
      },
      globals: {
        ...globals.jest,
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
        fail: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
    },
  },
];
