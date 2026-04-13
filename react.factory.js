const OFF = 0;
const WARNING = 1;

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
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };

function createFlatReactConfig() {
  const nodeConfig = require('./node.flat.js');
  const reactPlugin = require('eslint-plugin-react');
  const reactHooksPlugin = require('eslint-plugin-react-hooks');
  const globals = require('globals');
  const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat');
  const reactHooksRules = reactHooksPlugin.configs['recommended-latest'].rules;

  return [
    ...nodeConfig,
    ...fixupConfigRules(reactPlugin.configs.flat.recommended),
    {
      ...commonConfig,
      languageOptions: {
        globals: globals.browser,
        parserOptions: commonParserOptions,
      },
      plugins: {
        react: fixupPluginRules(reactPlugin),
        'react-hooks': fixupPluginRules(reactHooksPlugin),
      },
      rules: {
        ...reactHooksRules,
        ...commonConfig.rules,
      },
    },
  ];
}

function createLegacyReactConfig() {
  const reactHooksPlugin = require('eslint-plugin-react-hooks');

  return {
    ...commonConfig,
    extends: [
      require.resolve('./node.js'),
      'plugin:react/recommended',
    ],
    env: {
      browser: true,
    },
    plugins: ['react', 'react-hooks'],
    parserOptions: commonParserOptions,
    rules: {
      ...reactHooksPlugin.configs['recommended-latest'].rules,
      ...commonConfig.rules,
    },
  };
}

module.exports = {
  createFlatReactConfig,
  createLegacyReactConfig,
};
