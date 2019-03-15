const restrictedGlobals = require('eslint-restricted-globals');
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    'react-native/react-native': true
  },
  parser: 'babel-eslint',
  plugins: ['flowtype', 'jest', 'prettier', 'react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'class-methods-use-this': OFF,
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
    'new-cap': OFF,
    'no-class-assign': OFF,
    'no-plusplus': OFF,
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
    'no-restricted-syntax': ['error', 'WithStatement'],
    'no-underscore-dangle': OFF,
    'no-unused-expressions': OFF,
    'no-use-before-define': OFF,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    'react/forbid-prop-types': WARNING,
    'react/jsx-filename-extension': [OFF, { extensions: ['.js'] }],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.js', '**/__tests__/**'] },
    ],
    'react/prefer-stateless-function': OFF,
    'react/prop-types': OFF,
    'react/require-default-props': OFF,
    'react/sort-comp': OFF,
    'react/destructuring-assignment': OFF,
    'react-native/no-unused-styles': ERROR,
    'react-native/split-platform-components': ERROR,
    'react-native/no-inline-styles': ERROR,
    'react-native/no-color-literals': ERROR,
    'react-native/no-raw-text': ERROR
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.android.js', '.ios.js', '.native.js'],
      },
    },
  },
};
