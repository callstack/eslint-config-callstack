const js = require('@eslint/js');
const tsEslintParser = require('@typescript-eslint/parser');
const tsEslintPlugin = require('@typescript-eslint/eslint-plugin');
const configPrettier = require('eslint-config-prettier/flat');
const pluginPrettier = require('eslint-plugin-prettier');
const pluginPromise = require('eslint-plugin-promise');
const pluginImport = require('eslint-plugin-import-x');
const pluginJest = require('eslint-plugin-jest');
const globals = require('globals');
const restrictedGlobals = require('eslint-restricted-globals');
const extensions = require('./extensions');

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

const NO_UNUSED_VARS_OPTIONS = {
  argsIgnorePattern: '^_',
  caughtErrorsIgnorePattern: '^_',
};

// Taken from Jest's default "testMatch" config
const TEST_PATTERNS = [
  '**/__tests__/**/*.[jt]s?(x)',
  '**/?(*.)+(spec|test).[tj]s?(x)',
];

const JS_FILES = ['**/*.js', '**/*.jsx'];
const TS_FILES = ['**/*.ts', '**/*.tsx'];

module.exports = [
  js.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  configPrettier,
  {
    name: '@callstack/node',
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      'import-x': pluginImport,
      prettier: pluginPrettier,
    },
    rules: {
      'import-x/extensions': OFF,
      'import-x/no-dynamic-require': OFF,
      'import-x/no-unresolved': ERROR,
      'import-x/prefer-default-export': OFF,
      'import-x/order': ERROR,
      'import-x/no-extraneous-dependencies': [
        ERROR,
        { devDependencies: TEST_PATTERNS },
      ],
      'no-restricted-globals': [ERROR, ...restrictedGlobals],
      'no-restricted-syntax': [ERROR, 'WithStatement'],
      'no-constant-binary-expression': ERROR,
      'prettier/prettier': ERROR,
      'promise/prefer-await-to-then': WARNING,
      'require-await': ERROR,
    },
  },
  {
    name: '@callstack/node/javascript',
    files: JS_FILES,
    settings: {
      'import-x/extensions': [...extensions.JS, ...extensions.TS],
      'import-x/resolver-next': [
        pluginImport.createNodeResolver({
          extensions: [...extensions.JS, ...extensions.TS],
        }),
      ],
    },
    rules: {
      'no-unused-vars': [ERROR, NO_UNUSED_VARS_OPTIONS],
    },
  },
  {
    name: '@callstack/node/typescript',
    files: TS_FILES,
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    settings: {
      'import-x/extensions': [...extensions.TS, ...extensions.JS],
      'import-x/resolver-next': [
        pluginImport.createNodeResolver({
          extensions: [...extensions.TS, ...extensions.JS],
        }),
      ],
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [ERROR, NO_UNUSED_VARS_OPTIONS],
      '@typescript-eslint/prefer-optional-chain': ERROR,
      '@typescript-eslint/no-floating-promises': ERROR,
      'no-dupe-class-members': OFF,
      'no-unused-vars': OFF,
      'no-undef': OFF,
    },
  },
  {
    ...pluginJest.configs['flat/recommended'],
    name: '@callstack/node/jest',
    files: TEST_PATTERNS,
  },
];
