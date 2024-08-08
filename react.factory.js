const OFF = 0;
const WARNING = 1;
const ERROR = 2;

const commonParserOptions = {
    ecmaFeatures: {
      jsx: true,
    },
  },
  commonConfig = {
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

function createReactConfig(bFlatConfig) {
  if (bFlatConfig) {
    const nodeConfig = require('./node.flat.js');
    const reactPlugin = require('eslint-plugin-react');
    const reactHooksPlugin = require('eslint-plugin-react-hooks');
    const globals = require('globals');
    const { fixupPluginRules } = require('@eslint/compat');

    return [
      ...nodeConfig,
      reactPlugin.configs.flat.recommended,
      {
        languageOptions: {
          globals: globals.browser,
          parserOptions: commonParserOptions,
        },
        plugins: {
          react: reactPlugin,
          'react-hooks': fixupPluginRules(reactHooksPlugin),
        },
        ...commonConfig,
      },
    ];
  } else {
    return {
      extends: [require.resolve('./node.js'), 'plugin:react/recommended'],
      env: {
        browser: true,
      },
      plugins: ['react', 'react-hooks'],
      parserOptions: commonParserOptions,
      ...commonConfig,
    };
  }
}

module.exports = createReactConfig;
