const nodeConfig = require('./node.js');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const globals = require('globals');
const { fixupPluginRules } = require('@eslint/compat');

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = [
  ...nodeConfig,
  reactPlugin.configs.flat.recommended,
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': fixupPluginRules(reactHooksPlugin),
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
  },
];
