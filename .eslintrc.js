var EXTERNAL_PACKAGES = [
  '@apollo',
  '@biesbjerg',
  '@expo',
  '@gorhom/bottom-sheet',
  '@invertase',
  '@playwright',
  '@react',
  '@shopify',
  '@stripe',
  '@vendure',
  'apollo',
  'dayjs',
  'graphql',
  'lodash',
  'react',
  'rn-async-storage-flipper',
  'rxjs',
];

module.exports = {
  root: true,
  ignorePatterns: ['node_modules/'],
  plugins: ['simple-import-sort', 'jsdoc', 'react', 'unused-imports'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.eslint.json'],
        createDefaultProgram: true,
        ecmaFeatures: {
          jsx: true
        }
      },
      settings: {
        react: {
          version: 'detect'
        }
      },
      extends: [
        // General recommended rules
        'eslint:recommended',

        // Recommended rules for Typescript
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',

        'plugin:jsdoc/recommended',

        // Recommended rules when using Prettier
        'plugin:prettier/recommended',

        // Recommended rules when using React
        "plugin:react/recommended"
      ],
      rules: {
        /**
         * Any TypeScript source code (NOT TEMPLATE) related rules you wish to use/reconfigure over and above the
         * recommended set provided by the @angular-eslint project would go here.
         */

        // TypeScript-specific rules
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array',
          },
        ],
        '@typescript-eslint/ban-tslint-comment': 'error',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/explicit-function-return-type': ['off', { allowExpressions: true }],
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            overrides: {
              accessors: 'no-public',
              constructors: 'no-public',
            },
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          },
          {
            selector: 'property',
            format: ['camelCase','PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'function',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'method',
            format: ['camelCase'],
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
          },
          {
            selector: 'class',
            format: ['PascalCase'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
          },
          {
            selector: 'enum',
            format: ['UPPER_CASE', 'PascalCase'],
          },
          {
            selector: 'enumMember',
            format: ['UPPER_CASE'],
          },
        ],
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            "checksVoidReturn": false
          }
        ],
        '@typescript-eslint/no-type-alias': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',

        // Require typedefintions for returns and variables
        '@typescript-eslint/typedef': [
          'error',
          {
            'explicit-function-return-type': false,
            memberVariableDeclaration: true,
            parameter: true,
            'property-declaration': true,
            variableDeclaration: false,
            variableDeclarationIgnoreFunction: true
          },
        ],
        '@typescript-eslint/unified-signatures': 'error',

        // ESLint rules
        'capitalized-comments': [
          'error',
          'always',
          {
            ignoreConsecutiveComments: true,
          },
        ],
        complexity: 'error',
        curly: "error",
        eqeqeq: ['error', 'smart'],
        'id-blacklist': [
          'error',
          'any',
          'Number',
          'number',
          'String',
          'string',
          'Boolean',
          'boolean',
          'Undefined',
          'undefined',
        ],
        'jsdoc/newline-after-description': 0,
        'jsdoc/require-param-type': 0,
        'jsdoc/require-returns': 0,
        'jsdoc/require-returns-type': 0,
        'jsdoc/tag-lines': 0,
        'no-bitwise': 'error',
        'no-caller': 'error',
        // Do not allow usage of console functions
        'no-console': 'error',
        'no-debugger': 'error',
        'no-duplicate-imports': 'error',
        // Do not allow empty interfaces, functions, classes
        'no-empty': [
          'error',
          {
            allowEmptyCatch: true,
          },
        ],
        'no-eval': 'error',
        'no-invalid-this': 'error',
        'no-new-wrappers': 'error',
        'no-restricted-syntax': ['error', 'ForInStatement'],
        // Do not allow shadowed variables
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        'no-throw-literal': 'error',
        'no-undef-init': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'quote-props': ['error', 'as-needed'],

        // React specific linting rules
        "react/jsx-no-bind": ['error', {
          "ignoreDOMComponents":  false,
          "ignoreRefs": false,
          "allowArrowFunctions":  true,
          "allowFunctions": true,
          "allowBind":  false
        }],

        // Sort imports and organize them in groups
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Side effect imports
              ['^\\u0000'],
              // Built-in imports
              ['^(fs|glob|os)\\w?'],
              // External imports
              ['^(' + EXTERNAL_PACKAGES.join('|') + ')\\w?'],
              // Internal imports
              [
                // Imports that start with a letter (or digit or underscore), or `@` followed by a letter.
                '^@?\\w',
                // Relative imports (anything that starts with a dot)
                '^\\.',
              ],
              // Absolute imports and other imports such as Vue-style `@/foo`.
              // Anything not matched in another group.
              ['^'],
            ],
          },
        ],
        'simple-import-sort/exports': 'error',
        'spaced-comment': [
          'error',
          'always',
          {
            markers: ['/'],
            block: { exceptions: ['*'] },
          },
        ],
        'unused-imports/no-unused-imports': 'error'
      },
    },
    {
      files: ['src/components/**/*.tsx'],
      parserOptions: {
        project: ['tsconfig.eslint.json'],
        createDefaultProgram: true,
      },
      rules: {
        "no-restricted-imports": ["error", {
          paths:  [{
            "name": "@components",
            "message": "Please use relative imports instead."
          }]
        }]
      },
    },
    {
      files: ['e2e/**/*.ts'],
      parserOptions: {
        project: ['tsconfig.eslint.json'],
        createDefaultProgram: true,
      },
      rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/typedef': [
          'error',
          {
            'explicit-function-return-type': true,
            memberVariableDeclaration: true,
            parameter: true,
            'property-declaration': true,
            // Change compared to the default rule: Removed "variableDeclaration": true
          },
        ],
        'no-console': 'off',
        'jsdoc/require-jsdoc': 0,
      },
    },
  ],
};
