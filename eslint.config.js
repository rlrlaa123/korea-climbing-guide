// @ts-check
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      globals: globals.browser,
    },
    plugins: { react },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  // ⛳️ Supabase Edge Functions(Deno) 폴더는 규칙 완화(Phase A)
  {
    files: ["src/supabase/functions/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // 우선 해제 → 나중에 복구
    },
  },
];
