const extensions = require('./extensions');

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [require.resolve('./react.js'), 'plugin:react-native-a11y/all'],
  env: {
    'react-native/react-native': true,
  },
  plugins: ['react-native'],
  rules: {
    'react-native/no-unused-styles': ERROR,
    'react-native/split-platform-components': OFF,
    'react-native/no-inline-styles': WARNING,
    'react-native/no-color-literals': WARNING,
    'react-native/no-raw-text': ERROR,
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      settings: {
        'import/extensions': [...extensions.JS, ...extensions.JS_REACT_NATIVE],
        'import/resolver': {
          node: {
            extensions: [...extensions.JS, ...extensions.JS_REACT_NATIVE],
          },
        },
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      settings: {
        'import/extensions': [...extensions.TS, ...extensions.TS_REACT_NATIVE],
        'import/parsers': {
          '@typescript-eslint/parser': [
            ...extensions.TS,
            ...extensions.TS_REACT_NATIVE,
          ],
        },
        'import/resolver': {
          node: {
            extensions: [...extensions.TS, ...extensions.TS_REACT_NATIVE],
          },
        },
      },
    },
  ],
};
