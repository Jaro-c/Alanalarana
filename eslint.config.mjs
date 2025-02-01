import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwindcss from "eslint-plugin-tailwindcss";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

const eslintConfig = [
	{
		ignores: ["**/pnpm-lock.yaml", "**/node_modules/", "**/.next/"],
	},
	...compat.extends("next/core-web-vitals", "next/typescript", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"),
	{
		plugins: {
			"@typescript-eslint": typescriptEslint,
			prettier,
		},

		languageOptions: {
			parser: tsParser,
		},

		rules: {
			"prettier/prettier": [
				"error",
				{
					singleQuote: false,
					trailingComma: "es5",
					semi: true,
					useTabs: true,
					tabWidth: 4,
					arrowParens: "avoid",
					jsxSingleQuote: false,
					bracketSpacing: true,
					endOfLine: "lf",
					printWidth: 200,
					bracketSameLine: false,
					insertPragma: false,
					quoteProps: "as-needed",
					singleAttributePerLine: false,
				},
			],

			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "error",
		},
	},
	...compat.extends("plugin:tailwindcss/recommended", "next/core-web-vitals", "plugin:prettier/recommended").map(config => ({
		...config,
		files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.js", "**/*.jsx", "**/*.mjs"],
	})),
	{
		files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.js", "**/*.jsx", "**/*.mjs"],

		plugins: {
			"@typescript-eslint": typescriptEslint,
			"unused-imports": unusedImports,
			tailwindcss,
			"simple-import-sort": simpleImportSort,
		},

		languageOptions: {
			parser: tsParser,
			ecmaVersion: 5,
			sourceType: "script",

			parserOptions: {
				project: "./tsconfig.json",
			},
		},

		rules: {
			"tailwindcss/no-custom-classname": "off",
			"import/no-extraneous-dependencies": "warn",
			"no-param-reassign": "off",
			"consistent-return": "off",
			"no-empty-pattern": "off",
			"no-use-before-define": "off",
			"no-shadow": "off",
			"@typescript-eslint/no-shadow": "off",
			"@typescript-eslint/no-use-before-define": "off",
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
			"import/order": "off",

			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
		},
	},
];

export default eslintConfig;
