const { fixupPluginRules } = require('@eslint/compat');
const pluginReactNative = require('eslint-plugin-react-native');
const pluginReactNativeA11y = require('eslint-plugin-react-native-a11y');
const pluginAtReactNative = require('@react-native/eslint-plugin');
const pluginImport = require('eslint-plugin-import-x');
const extensions = require('./extensions');
const reactConfig = require('./react');

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

// no-raw-text crashes on template literals without interpolations, e.g. <View>{`hello`}</View>
// https://github.com/Intellicode/eslint-plugin-react-native/issues/341
const noRawText = pluginReactNative.rules['no-raw-text'];
const patchedNoRawText = {
  ...noRawText,
  create(context) {
    const visitors = noRawText.create(context);
    return {
      ...visitors,
      TemplateLiteral(node) {
        if (node.expressions.length > 0) {
          return visitors.TemplateLiteral(node);
        }
        // the rule reads `node.expressions[0].name` for the report message
        return visitors.TemplateLiteral(
          Object.create(node, {
            expressions: { value: [{ name: node.quasis[0].value.cooked }] },
          })
        );
      },
    };
  },
};

module.exports = [
  ...reactConfig,
  {
    name: '@callstack/react-native',
    languageOptions: {
      globals: pluginReactNative.environments['react-native'].globals,
    },
    plugins: {
      // eslint-plugin-react-native relies on context APIs removed in ESLint 10
      'react-native': fixupPluginRules({
        ...pluginReactNative,
        rules: { ...pluginReactNative.rules, 'no-raw-text': patchedNoRawText },
      }),
      'react-native-a11y': pluginReactNativeA11y,
      '@react-native': pluginAtReactNative,
    },
    // resolve platform-specific extensions, e.g. `./Component` -> `./Component.ios.js`
    settings: {
      'import-x/extensions': extensions.ALL,
      'import-x/resolver-next': [
        pluginImport.createNodeResolver({ extensions: extensions.ALL }),
      ],
    },
    rules: {
      ...pluginReactNativeA11y.configs.all.rules,
      'react-native/no-unused-styles': ERROR,
      'react-native/split-platform-components': OFF,
      'react-native/no-inline-styles': WARNING,
      'react-native/no-color-literals': WARNING,
      'react-native/no-raw-text': ERROR,
      'react-native-a11y/has-accessibility-hint': OFF,
      '@react-native/platform-colors': WARNING,
    },
  },
];
