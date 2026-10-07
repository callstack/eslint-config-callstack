const js = require('@eslint/js');
const { fixupPluginRules } = require('@eslint/compat');
const babelEslintParser = require('@babel/eslint-parser');
const tsEslintParser = require('@typescript-eslint/parser');
const tsEslintPlugin = require('@typescript-eslint/eslint-plugin');
const configPrettier = require('eslint-config-prettier/flat');
const pluginPrettier = require('eslint-plugin-prettier');
const pluginPromise = require('eslint-plugin-promise');
const pluginImport = require('eslint-plugin-import-x');
const pluginFtFlow = require('eslint-plugin-ft-flow');
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

// eslint-plugin-ft-flow's recommended preset also turns off core rules
// (e.g. `no-undef`), so only its own rules are picked
const ftFlowRecommendedRules = Object.fromEntries(
  Object.entries(pluginFtFlow.configs.recommended.rules).filter(([rule]) =>
    rule.startsWith('ft-flow/')
  )
);

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
    languageOptions: {
      parser: babelEslintParser,
      parserOptions: {
        requireConfigFile: false,
        // Babel is only used for parsing here, so the project's Babel config
        // (often still on Babel 7) is intentionally not loaded.
        babelOptions: {
          babelrc: false,
          configFile: false,
          parserOpts: {
            plugins: ['jsx', 'flow'],
          },
        },
      },
    },
    plugins: {
      // eslint-plugin-ft-flow relies on context APIs removed in ESLint 10
      'ft-flow': fixupPluginRules(pluginFtFlow),
    },
    settings: {
      'ft-flow': {
        onlyFilesWithFlowAnnotation: true,
      },
      'import-x/extensions': [...extensions.JS, ...extensions.TS],
      'import-x/resolver-next': [
        pluginImport.createNodeResolver({
          extensions: [...extensions.JS, ...extensions.TS],
        }),
      ],
    },
    rules: {
      ...ftFlowRecommendedRules,
      'no-unused-vars': [ERROR, NO_UNUSED_VARS_OPTIONS],
      'ft-flow/no-weak-types': WARNING,
      'ft-flow/require-parameter-type': OFF,
      'ft-flow/require-return-type': [
        OFF,
        'always',
        { annotateUndefined: 'never' },
      ],
      'ft-flow/require-valid-file-annotation': ERROR,
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
