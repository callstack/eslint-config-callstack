const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [require.resolve('./node.js'), 'plugin:react/recommended'],
  env: {
    browser: true,
  },
  plugins: ['react', 'react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/display-name': OFF,
    'react/no-multi-comp': [WARNING, { ignoreStateless: true }],
    'react/no-unused-prop-types': OFF,
    'react/prop-types': OFF,
    'react/require-default-props': OFF,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': WARNING,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
