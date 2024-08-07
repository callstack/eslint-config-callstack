const extensions = require('./extensions');
const reactConfig = require('./react.js');
const pluginA11y = require('eslint-plugin-react-native-a11y');
const eslintPluginReactNative = require('eslint-plugin-react-native');
const rnPluginEslint = require('@react-native/eslint-plugin');
const { fixupPluginRules } = require('@eslint/compat');

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

// TODO: strip the below as soon as eslint-plugin-react-native-a11y supports eslint@9
const pluginA11yConfigBase = { ...pluginA11y.configs.all };
delete pluginA11yConfigBase.parserOptions;

module.exports = [
  ...reactConfig,
  {
    ...pluginA11yConfigBase,
    // eslint-plugin-react-native-a11y does not support eslint@9 yet and: specifies plugins in array form & parserOptions in root, which we patch this here
    // TODO: strip the below as soon as eslint-plugin-react-native-a11y supports eslint@9
    plugins: {
      'react-native-a11y': pluginA11y,
    },
    languageOptions: {
      parserOptions: pluginA11y.configs.all.parserOptions,
    },
  },
  {
    languageOptions: {
      // below globals listed manually - as in https://github.com/Intellicode/eslint-plugin-react-native/blob/master/index.js
      // since the plugin does not support eslint@9 yet
      // TODO: strip the below as soon as eslint-plugin-react-native-globals supports eslint@9
      globals: require('eslint-plugin-react-native-globals').environments.all
        .globals,
    },
    plugins: {
      'react-native': fixupPluginRules(eslintPluginReactNative),
      '@react-native': rnPluginEslint,
    },
    rules: {
      '@react-native/platform-colors': WARNING,
      'react-native/no-unused-styles': ERROR,
      'react-native/split-platform-components': OFF,
      'react-native/no-inline-styles': WARNING,
      'react-native/no-color-literals': WARNING,
      'react-native/no-raw-text': ERROR,
      'react-native-a11y/has-accessibility-hint': OFF,
    },
  },
  // below two objects: ported 'overrides' from the above object
  {
    files: ['**/*.js', '**/*.jsx'],
    settings: {
      'import/extensions': extensions.ALL,
      'import/resolver': {
        node: {
          extensions: extensions.ALL,
        },
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    settings: {
      'import/extensions': extensions.ALL,
      'import/parsers': {
        '@typescript-eslint/parser': [
          ...extensions.TS,
          ...extensions.TS_REACT_NATIVE,
        ],
      },
      'import/resolver': {
        node: {
          extensions: extensions.ALL,
        },
      },
    },
  },
];
