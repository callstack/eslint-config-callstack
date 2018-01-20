const restrictedGlobals = require('eslint-restricted-globals');

module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react'
  ],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: 'babel-eslint',
  plugins: ['flowtype', 'jest', 'prettier'],
  rules: {
    'class-methods-use-this': 0,
    'flowtype/no-weak-types': 1,
    'flowtype/require-parameter-type': 0,
    'flowtype/require-return-type': [
      0,
      'always',
      { annotateUndefined: 'never' }
    ],
    'flowtype/require-valid-file-annotation': 2,
    'import/extensions': 0,
    'import/no-dynamic-require': 0,
    'import/no-unresolved': 2,
    'import/prefer-default-export': 0,
    'new-cap': 0,
    'no-class-assign': 0,
    'no-duplicate-imports': 0,
    'no-plusplus': 0,
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
    'no-restricted-syntax': ['error', 'WithStatement'],
    'no-underscore-dangle': 0,
    'no-unused-expressions': 0,
    'no-use-before-define': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5'
      }
    ],
    'react/forbid-prop-types': 1,
    'react/jsx-filename-extension': [0, { extensions: ['.js'] }],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.js', '**/__tests__/**'] }
    ],
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/sort-comp': 0
  },
  overrides: {
    files: ['**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)'],
    env: {
      'jest/globals': true
    }
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.android.js', '.ios.js']
      }
    }
  }
};
