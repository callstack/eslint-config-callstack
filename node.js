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

module.exports = {
  extends: ['eslint:recommended', 'plugin:promise/recommended', 'prettier'],
  env: {
    es6: true,
    node: true,
  },
  plugins: ['prettier', 'import'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'import/extensions': OFF,
    'import/no-dynamic-require': OFF,
    'import/no-unresolved': ERROR,
    'import/prefer-default-export': OFF,
    'no-restricted-globals': [ERROR].concat(restrictedGlobals),
    'no-restricted-syntax': [ERROR, 'WithStatement'],
    'prettier/prettier': ERROR,
    'promise/prefer-await-to-then': WARNING,
    'import/no-extraneous-dependencies': [
      ERROR,
      { devDependencies: TEST_PATTERNS },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      parser: 'babel-eslint',
      plugins: ['flowtype'],
      extends: ['plugin:flowtype/recommended', 'prettier/flowtype'],
      rules: {
        'no-unused-vars': [ERROR, NO_UNUSED_VARS_OPTIONS],
        'flowtype/no-weak-types': WARNING,
        'flowtype/require-parameter-type': OFF,
        'flowtype/require-return-type': [
          OFF,
          'always',
          { annotateUndefined: 'never' },
        ],
        'flowtype/require-valid-file-annotation': ERROR,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin'],
      settings: {
        'import/extensions': [...extensions.TS, ...extensions.JS],
        'import/parsers': {
          '@typescript-eslint/parser': extensions.TS,
        },
        'import/resolver': {
          node: {
            extensions: [...extensions.TS, ...extensions.JS],
          },
        },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [ERROR, NO_UNUSED_VARS_OPTIONS],
        '@typescript-eslint/prefer-optional-chain': ERROR,
        'no-dupe-class-members': OFF,
        'no-unused-vars': OFF,
      },
    },
    {
      files: TEST_PATTERNS,
      env: {
        jest: true,
        'jest/globals': true,
      },
      extends: ['plugin:jest/recommended'],
      plugins: ['jest'],
    },
  ],
};
