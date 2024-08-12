const restrictedGlobals = require('eslint-restricted-globals');
const extensions = require('./extensions');

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

const NO_UNUSED_VARS_OPTIONS = {
  argsIgnorePattern: '^_',
  caughtErrorsIgnorePattern: '^_',
};

// Taken from Jest's default "testMatch" config
const TEST_PATTERNS = [
  '**/__tests__/**/*.[jt]s?(x)',
  '**/?(*.)+(spec|test).[tj]s?(x)',
];

function createNodeConfig(bFlatConfig) {
  const baseConfigOptions = {
      settings: {
        flowtype: {
          onlyFilesWithFlowAnnotation: true,
        },
      },
      rules: {
        'import/extensions': OFF,
        'import/no-dynamic-require': OFF,
        'import/no-unresolved': ERROR,
        'import/prefer-default-export': OFF,
        'import/order': ERROR,
        'no-restricted-globals': [ERROR].concat(restrictedGlobals),
        'no-restricted-syntax': [ERROR, 'WithStatement'],
        'no-constant-binary-expression': ERROR,
        'prettier/prettier': ERROR,
        'promise/prefer-await-to-then': WARNING,
        'import/no-extraneous-dependencies': [
          ERROR,
          { devDependencies: TEST_PATTERNS },
        ],
        'require-await': ERROR,
      },
    },
    babelEslintParserOptions = {
      requireConfigFile: false,
    },
    commonBabelEslintParserConfig = {
      settings: {
        'import/extensions': [...extensions.JS, ...extensions.TS],
        'import/resolver': {
          node: {
            extensions: [...extensions.JS, ...extensions.TS],
          },
        },
      },
      rules: {
        'no-unused-vars': [ERROR, NO_UNUSED_VARS_OPTIONS],
        'flowtype/no-weak-types': WARNING,
        'flowtype/require-parameter-type': OFF,
        'flowtype/require-return-type': [
          OFF,
          'always',
          { annotateUndefined: 'never' },
        ],
        'flowtype/require-valid-file-annotation': ERROR,
      },
    },
    commonTypesciptEslintParserConfig = {
      settings: {
        'import/extensions': [...extensions.TS, ...extensions.JS],
        'import/parsers': {
          '@typescript-eslint/parser': extensions.TS,
        },
        'import/resolver': {
          node: {
            extensions: [...extensions.TS, ...extensions.JS],
          },
        },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [ERROR, NO_UNUSED_VARS_OPTIONS],
        '@typescript-eslint/prefer-optional-chain': ERROR,
        '@typescript-eslint/no-floating-promises': ERROR,
        'no-dupe-class-members': OFF,
        'no-unused-vars': OFF,
        'no-undef': OFF,
      },
    };

  if (bFlatConfig) {
    const js = require('@eslint/js');
    const pluginPromise = require('eslint-plugin-promise');
    const configPrettier = require('eslint-config-prettier');
    const pluginPrettier = require('eslint-plugin-prettier');
    const pluginImport = require('eslint-plugin-import');
    const globals = require('globals');
    const pluginFlowtype = require('eslint-plugin-flowtype');
    const tsEslintPlugin = require('@typescript-eslint/eslint-plugin');
    const pluginJest = require('eslint-plugin-jest');
    const babelEslintParser = require('@babel/eslint-parser');
    const tsEslintParser = require('@typescript-eslint/parser');
    const { fixupPluginRules } = require('@eslint/compat');

    // move the parserOptions & parser properties to the languageOptions object to support flat config
    // TODO: strip the below as soon as eslint-plugin-flowtype supports eslint@9
    const pluginFlowtypeRecommendedConfig = {
      ...pluginFlowtype.configs.recommended,
    };

    if (!pluginFlowtypeRecommendedConfig.languageOptions)
      pluginFlowtypeRecommendedConfig.languageOptions = {};

    pluginFlowtypeRecommendedConfig.languageOptions.parserOptions =
      pluginFlowtypeRecommendedConfig.parserOptions;
    pluginFlowtypeRecommendedConfig.languageOptions.parser =
      pluginFlowtypeRecommendedConfig.parser;

    delete pluginFlowtypeRecommendedConfig.parser;
    delete pluginFlowtypeRecommendedConfig.parserOptions;

    // since eslint-plugin-flowtype does not support eslint@9 yet, rules do not
    // have the meta.schema property set, which is now required; this results in
    // the rules being treated as optionless, which is not the case and results in errors
    // when trying to configure them
    for (const rule of Object.values(pluginFlowtype.rules)) {
      if (!rule.meta) rule.meta = {};
      rule.meta.schema = rule.schema;
    }

    return [
      js.configs.recommended,
      pluginPromise.configs[bFlatConfig ? 'flat/recommended' : 'recommended'],
      configPrettier,
      {
        languageOptions: {
          globals: {
            ...globals.es2015, // es6
            ...globals.node,
          },
          parserOptions: {
            sourceType: 'module',
          },
        },
        plugins: {
          import: pluginImport,
          prettier: pluginPrettier,
        },
        ...baseConfigOptions,
      },
      {
        // this is a port of 'extends' for the next object
        ...pluginFlowtypeRecommendedConfig,
        files: ['**/*.js', '**/*.jsx'],
        // overriding 'plugins' directly here, as eslint-plugin-flowtype does not support eslint@9 yet
        // TODO: strip the below as soon as eslint-plugin-flowtype supports eslint@9
        plugins: {
          flowtype: fixupPluginRules(pluginFlowtype),
        },
      },
      {
        // this is a port of 'overrides' for the previous object
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
          parserOptions: babelEslintParserOptions,
          parser: babelEslintParser,
        },
        ...commonBabelEslintParserConfig,
      },
      {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
          '@typescript-eslint': tsEslintPlugin,
        },
        languageOptions: {
          parserOptions: {
            project: './tsconfig.json',
          },
          parser: tsEslintParser,
        },
        ...commonTypesciptEslintParserConfig,
      },
      {
        // this is a port of 'extends' for the next object
        ...pluginJest.configs[bFlatConfig ? 'flat/recommended' : 'recommended'],
        files: TEST_PATTERNS,
      },
      {
        // this is a port of 'overrides' for the previous object
        files: TEST_PATTERNS,
        languageOptions: {
          globals: globals.jest,
        },
        plugins: {
          jest: pluginJest,
        },
      },
    ];
  } else {
    return {
      extends: ['eslint:recommended', 'plugin:promise/recommended', 'prettier'],
      env: {
        es6: true,
        node: true,
      },
      plugins: ['prettier', 'import'],
      parserOptions: {
        sourceType: 'module',
      },
      ...baseConfigOptions,
      overrides: [
        {
          files: ['*.js', '*.jsx'],
          parser: '@babel/eslint-parser',
          parserOptions: babelEslintParserOptions,
          plugins: ['flowtype'],
          extends: ['plugin:flowtype/recommended'],
          ...commonBabelEslintParserConfig,
        },
        {
          files: ['*.ts', '*.tsx'],
          parser: '@typescript-eslint/parser',
          plugins: ['@typescript-eslint/eslint-plugin'],
          parserOptions: { project: './tsconfig.json' },
          ...commonTypesciptEslintParserConfig,
        },
        {
          files: TEST_PATTERNS,
          env: {
            jest: true,
            'jest/globals': true,
          },
          extends: ['plugin:jest/recommended'],
          plugins: ['jest'],
        },
      ],
    };
  }
}

module.exports = createNodeConfig;
