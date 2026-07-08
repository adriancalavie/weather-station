import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default tseslint.config(
  // Global ignores
  includeIgnoreFile(gitignorePath),
  {
    ignores: ["**/dist/**", "**/.turbo/**", "**/node_modules/**", "**/routeTree.gen.ts"],
  },

  // Base config: all JS/TS files
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Perfectionist - natural sort order
  // sort-objects is disabled because it conflicts with TanStack Router's
  // type inference chain (validateSearch must precede loaderDeps/loader).
  // All other sorting (imports, JSX props, named imports, modules, types) remain active.
  {
    ...perfectionist.configs["recommended-natural"],
    rules: {
      ...perfectionist.configs["recommended-natural"].rules,
      "perfectionist/sort-objects": "off",
    },
  },

  // Disable type-checked rules for non-TS files
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    ...tseslint.configs.disableTypeChecked,
  },

  // ---- React config (web app only) ----
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    ...react.configs.flat.recommended,
  },
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    ...react.configs.flat["jsx-runtime"],
  },
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    plugins: {
      "react-compiler": reactCompiler,
      "react-hooks": reactHooks,
    },
    rules: {
      "react-compiler/react-compiler": "error",
      ...reactHooks.configs.recommended.rules,
    },
    settings: {
      react: {
        version: "19.0",
      },
    },
  },

  // ---- Custom rules overrides (all files) ----
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "error",
    },
  },
);
