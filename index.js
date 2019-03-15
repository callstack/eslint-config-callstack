const restrictedGlobals = require('eslint-restricted-globals');
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:flowtype/recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    'react-native/react-native': true,
  },
  parser: 'babel-eslint',
  plugins: [
    'flowtype',
    'jest',
    'prettier',
    'react',
    'react-native',
    'react-hooks',
    'import',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'flowtype/no-weak-types': WARNING,
    'flowtype/require-parameter-type': OFF,
    'flowtype/require-return-type': [
      OFF,
      'always',
      { annotateUndefined: 'never' },
    ],
    'flowtype/require-valid-file-annotation': ERROR,
    'import/extensions': OFF,
    'import/no-dynamic-require': OFF,
    'import/no-unresolved': ERROR,
    'import/prefer-default-export': OFF,
    'no-restricted-globals': [ERROR].concat(restrictedGlobals),
    'no-restricted-syntax': [ERROR, 'WithStatement'],
    'prettier/prettier': [
      ERROR,
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: [
          '**/__tests__/**/*.[jt]s?(x)',
          '**/?(*.)+(spec|test).[tj]s?(x)',
        ],
      },
    ],
    'react/prop-types': OFF,
    'react-native/no-unused-styles': ERROR,
    'react-native/split-platform-components': OFF,
    'react-native/no-inline-styles': WARNING,
    'react-native/no-color-literals': WARNING,
    'react-native/no-raw-text': ERROR,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': WARNING,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.android.js', '.ios.js', '.native.js'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
