module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
		"plugin:import/warnings",
    "prettier",
  ],
  ignorePatterns: ['.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.3.1' } },
  plugins: [
    "react", 
    "react-hooks", 
    "react-refresh", 
    "import", 
    "sonarjs",
    "jsx-a11y", 
    "prettier"
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": "off",
    "react/prop-types": "off",
    "react/jsx-no-target-blank": "off",
    "react-hooks/rules-of-hooks": "error",
    "camelcase": "error",
    "spaced-comment": "error",
    "quotes": ["error", "double"],
    "jsx-quotes": ["error", "prefer-double"],
    "no-duplicate-imports": "error",
    "no-console": "warn",
    "no-var": "warn",
    "no-use-before-define": ["error", { "functions": false }],
    "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],
    "prefer-const": "warn",
    "prefer-template": "error",
    "prefer-destructuring": "error",
    "prefer-rest-params": "error",
    "prefer-promise-reject-errors": "error",
    "prefer-numeric-literals": "error",
    "prefer-arrow-callback": "error",
    "no-empty-function": "error",
    "no-useless-return": "error",
    "no-array-constructor": "error",
    "no-new-func": "error",
    "no-await-in-loop": "error",
    "no-prototype-builtins": "error",
    "no-eval": "error",
    "no-useless-catch": "error",
    "no-useless-escape": "error",
    "no-useless-concat": "error",
    "jsx-a11y/anchor-has-content": "warn",
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/img-redundant-alt": "warn",
    "jsx-a11y/no-static-element-interactions": [
			"warn",
			{
				"handlers": [
					"onClick",
					"onMouseDown",
					"onMouseUp",
					"onKeyPress",
					"onKeyDown",
					"onKeyUp"
				],
				"allowExpressionValues": true
			}
		],
    "no-magic-numbers": ["warn", {
			"ignore": [1, 0, -1, 2], 
			"ignoreArrayIndexes": true,
			"ignoreDefaultValues": true
			}
		],
    "import/no-unresolved": "off",
    "sonarjs/no-duplicate-string": "warn",
		"sonarjs/prefer-immediate-return": "warn",
    "import/prefer-default-export": ["warn", {"target": "single"}],
    "import/order": [
			"error",
			{
				"groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
				"newlines-between": "always-and-inside-groups"
			}
		],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
}
