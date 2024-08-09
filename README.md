# @callstack/eslint-config

Callstack ESLint config for React Native, React and Node.js projects, utilizing Flow, TypeScript, Prettier and Jest with sensible defaults. Supports both eslintrc and flat config.

## Installation

With Yarn:

```bash
yarn add --dev eslint @callstack/eslint-config
```

Or with npm:

```
npm install --save-dev eslint @callstack/eslint-config
```

## Usage

You can choose one of the following environments to work with by extending your ESLint config (`eslint.config.mjs` for flat config, or `.eslintrc` / `eslintConfig` field in `package.json` for the eslintrc config style) with `@callstack` config tailored to your project.

### React Native config

Usage:

#### eslintrc format (ESLint < v9)

```json
{
  "extends": "@callstack"
}
```

#### flat config format (`eslint.config.mjs`, ESLint 9+)

```js
import callstackConfig from '@callstack/eslint-config/react-native.flat.js';

export default [
  {
    ignores: [
      // ignored files go here
    ],
  },
  ...callstackConfig,
  {
    rules: {
      // your custom rules
    },
  },
];
```

Plugins used:

- **React config**
- [eslint-plugin-react-native](https://yarnpkg.com/en/package/eslint-plugin-react-native)
- [eslint-plugin-react-native-a11y](https://classic.yarnpkg.com/en/package/eslint-plugin-react-native-a11y)

Additionally, it sets `"react-native/react-native"` environment and native platform extensions to resolve.

### React config

Usage:

#### eslintrc format (ESLint < v9)

```json
{
  "extends": "@callstack/eslint-config/react"
}
```

#### flat config format (`eslint.config.mjs`, ESLint 9+)

```js
import callstackConfigReact from '@callstack/eslint-config/react.flat.js';

export default [
  {
    ignores: [
      // ignored files go here
    ],
  },
  ...callstackConfigReact,
  {
    rules: {
      // your custom rules
    },
  },
];
```

Plugins used:

- **Node config**
- [eslint-plugin-react](https://yarnpkg.com/en/package/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://yarnpkg.com/en/package/eslint-plugin-react-hooks)

### Node config

Usage:

#### eslintrc format (ESLint < v9)

```json
{
  "extends": "@callstack/eslint-config/node"
}
```

#### flat config format (`eslint.config.mjs`, ESLint 9+)

```js
import callstackConfigNode from '@callstack/eslint-config/node.flat.js';

export default [
  {
    ignores: [
      // ignored files go here
    ],
  },
  ...callstackConfigNode,
  {
    rules: {
      // your custom rules
    },
  },
];
```

Plugins used:

- [eslint-config-prettier](https://yarnpkg.com/en/package/eslint-config-prettier)
- [eslint-plugin-prettier](https://yarnpkg.com/en/package/eslint-plugin-prettier)
- [eslint-plugin-jest](https://yarnpkg.com/en/package/eslint-plugin-jest) (applied for tests only, based on Jest's `testMatch` config)
- [eslint-plugin-import](https://yarnpkg.com/en/package/eslint-plugin-import)
- [eslint-plugin-promise](https://yarnpkg.com/en/package/eslint-plugin-promise)
- [eslint-plugin-flowtype](https://yarnpkg.com/en/package/eslint-plugin-flowtype)
- [@typescript-eslint/eslint-plugin](https://yarnpkg.com/en/package/@typescript-eslint/eslint-plugin) (only for `.tsx?` files)
- [@typescript-eslint/parser](https://yarnpkg.com/en/package/@typescript-eslint/parser) (only for `.tsx?` files)

Additionally, it sets `es6` and `node` environments.

### Example of extending the configuration

##### eslintrc format (ESLint < v9)

```json
{
  "extends": "@callstack",
  "rules": {
    "global-require": 0,
    "prefer-destructuring": 0
  }
}
```

##### flat config format (`eslint.config.mjs`, ESLint 9+)

```js
import callstackConfig from '@callstack/eslint-config/react-native.flat.js';

export default [
  ...callstackConfig,
  {
    rules: {
      'global-require': 0,
      'prefer-destructuring': 0,
    },
  },
];
```

### TypeScript

TypeScript is supported out-of-the-box, including importing JS files from TS files and vice-versa. All you need to do is to make sure you have [`typescript`](https://yarnpkg.com/en/package/typescript) module installed.

Then when running ESLint add `--ext '.js,.ts'` (you might need also `.jsx, .tsx`) option, for example:

```bash
yarn eslint --ext '.js,.ts' ./src
```

`parserOptions.project` is set to `./tsconfig.json`. You may need to [adjust that](https://typescript-eslint.io/architecture/parser#project).

To do so, you'll need to override our setup for TS files in your ESLint config:

##### eslintrc format (ESLint < v9)

```json
{
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "parserOptions": {
        "project": "./packages/**/tsconfig.json"
      }
    }
  ]
}
```

##### flat config format (`eslint.config.mjs`, ESLint 9+)

In the flat config, just append another configuration object to the array and be sure to import the `/react-native.flat` file:

```js
import callstackConfig from '@callstack/eslint-config/react-native.flat.js';
import tsEslintParser from '@typescript-eslint/parser';

export default [
  ...callstackConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: { project: './packages/**/tsconfig.json' },
    },
  },
];
```

#### VSCode

If you're VSCode user, you may find adding this config to your `.vscode/settings.json` helpful:

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```
