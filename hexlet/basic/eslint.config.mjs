/* eslint-disable import/no-extraneous-dependencies */
import { FlatCompat } from "@eslint/eslintrc";
/* eslint-enable import/no-extraneous-dependencies */

const compat = new FlatCompat({
  baseDirectory: new URL(".", import.meta.url).pathname,
});

export default [
  ...compat.extends("airbnb-base"),
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        process: "readonly",
        module: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      quotes: ["error", "double"],
    },
  },
];
