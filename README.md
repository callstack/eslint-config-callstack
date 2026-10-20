# @callstack/eslint-config

Callstack ESLint config for React Native, React and Node.js projects, utilizing TypeScript, Prettier and Jest with sensible defaults.

Starting with v16 this package ships **flat config only** (`eslint.config.*`). The legacy eslintrc format is no longer supported.

## Requirements

- ESLint `^10.0.0`
- Node.js `^22.13.0` or `>=24.3.0`

## Installation

With Yarn:

```bash
yarn add --dev eslint @callstack/eslint-config
```

Or with npm:

```bash
npm install --save-dev eslint @callstack/eslint-config
```

## Usage

Pick the config that matches your project and spread it into your `eslint.config.mjs`:

| Config       | Import path                      |
| ------------ | -------------------------------- |
| React Native | `@callstack/eslint-config`       |
| React        | `@callstack/eslint-config/react` |
| Node.js      | `@callstack/eslint-config/node`  |

`@callstack/eslint-config/react-native` is an alias for the root import.

### React Native config

```js
import callstackConfig from '@callstack/eslint-config';

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

Includes everything from the **React config**, plus:

- [eslint-plugin-react-native](https://www.npmjs.com/package/eslint-plugin-react-native)
- [eslint-plugin-react-native-a11y](https://www.npmjs.com/package/eslint-plugin-react-native-a11y)
- [@react-native/eslint-plugin](https://www.npmjs.com/package/@react-native/eslint-plugin)

Additionally, it adds React Native globals and resolves platform-specific extensions (`.ios.*`, `.android.*`, `.native.*`).

### React config

```js
import callstackConfig from '@callstack/eslint-config/react';

export default [...callstackConfig];
```

Includes everything from the **Node.js config**, plus:

- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

Additionally, it adds browser globals.

### Node.js config

```js
import callstackConfig from '@callstack/eslint-config/node';

export default [...callstackConfig];
```

Includes:

- [@eslint/js](https://www.npmjs.com/package/@eslint/js) recommended rules
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) and [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)
- [eslint-plugin-import-x](https://www.npmjs.com/package/eslint-plugin-import-x)
- [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise)
- [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest) (applied for tests only, based on Jest's default `testMatch`)
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) and [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) (only for `.ts`/`.tsx` files)

Additionally, it adds Node.js globals.

### Extending the configuration

Append your own config objects after the Callstack config:

```js
import callstackConfig from '@callstack/eslint-config';

export default [
  ...callstackConfig,
  {
    rules: {
      'global-require': 'off',
      'prefer-destructuring': 'off',
    },
  },
];
```

### TypeScript

TypeScript is supported out of the box, including importing JS files from TS files and vice versa. Make sure you have [`typescript`](https://www.npmjs.com/package/typescript) installed.

Type-aware rules use the typescript-eslint [project service](https://typescript-eslint.io/packages/parser#projectservice) (`parserOptions.projectService: true`), which finds the nearest `tsconfig.json` for each linted file. This works in monorepos without extra setup. To customize it, override the parser options for TS files:

```js
import callstackConfig from '@callstack/eslint-config';

export default [
  ...callstackConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
```

## Migrating from v15

- **eslintrc is no longer supported.** Move your `.eslintrc*` / `eslintConfig` setup to `eslint.config.mjs` (see the [ESLint migration guide](https://eslint.org/docs/latest/use/configure/migration-guide)).
- **Import paths.** Use `@callstack/eslint-config`, `@callstack/eslint-config/react` and `@callstack/eslint-config/node`. The old `*.flat.js` paths still work as aliases.
- **`eslint-plugin-import` → `eslint-plugin-import-x`.** Rename `import/*` rules to `import-x/*` in your overrides and `eslint-disable` comments.
- **Flow is no longer supported.** `eslint-plugin-flowtype` and `@babel/eslint-parser` were removed; `.js`/`.jsx` files are now parsed by ESLint's default parser (espree). Remove `flowtype/*` rules from your config. If you still need Flow, add [`hermes-eslint`](https://www.npmjs.com/package/hermes-eslint) and [`eslint-plugin-ft-flow`](https://www.npmjs.com/package/eslint-plugin-ft-flow) yourself.
- **TypeScript** now uses `projectService` instead of `project: './tsconfig.json'`.
- **ESLint 10** is required. Since ESLint 8 and 9 were deprecated.
- **Node.js `^22.13.0` or `>=24.3.0`** is required.

## VSCode

If you're a VSCode user, you may find adding this config to your `.vscode/settings.json` helpful:

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
