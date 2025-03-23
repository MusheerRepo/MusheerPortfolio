import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"], // Apply to all TypeScript files
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "@typescript-eslint": tseslint,
            prettier: prettierPlugin,
            import: importPlugin,
        },
        rules: {
            "array-bracket-spacing": ["error", "never"],
            "import/no-unresolved": "warn",
            "computed-property-spacing": ["warn", "never"],
            "block-spacing": ["warn", "never"],
            "keyword-spacing": "warn",
            "arrow-spacing": "warn",
            "prettier/prettier": "error",
            "@typescript-eslint/no-unused-vars": "error",
        },
        settings: {
            "import/resolver": {
                typescript: {},
            },
        },
    },
];
