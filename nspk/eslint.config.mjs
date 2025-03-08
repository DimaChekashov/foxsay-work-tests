import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "commonjs",
    },
  },
  pluginJs.configs.recommended,
];