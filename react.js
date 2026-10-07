const { fixupPluginRules } = require('@eslint/compat');
const pluginReact = require('eslint-plugin-react');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const globals = require('globals');
const nodeConfig = require('./node');

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = [
  ...nodeConfig,
  {
    ...pluginReact.configs.flat.recommended,
    // eslint-plugin-react relies on context APIs removed in ESLint 10
    plugins: { react: fixupPluginRules(pluginReact) },
  },
  {
    name: '@callstack/react',
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect',
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
  },
];
