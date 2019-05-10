const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [
    require.resolve('./node.js'),
    'plugin:react/recommended',
    'plugin:promise/recommended',
    'prettier/react',
  ],
  env: {
    'react-native/react-native': true,
  },
  plugins: [
    'react',
    'react-native',
    'react-hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'promise/prefer-await-to-then': WARNING,
    'react/display-name': OFF,
    'react/no-multi-comp': [WARNING, { "ignoreStateless": true }],
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
