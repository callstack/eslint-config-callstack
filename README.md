# eslint-config-callstack

[![Greenkeeper badge](https://badges.greenkeeper.io/callstack/eslint-config-callstack.svg)](https://greenkeeper.io/)

Callstack ESLint config utilizing Flow/TypeScript, Prettier, Jest, React and React Native.

Plugins and configs used:

- React Native
  - Default config
  - [eslint-plugin-react-native-a11y](https://classic.yarnpkg.com/en/package/eslint-plugin-react-native-a11y)

- Default config (w/ React and React Native):
  - Node config
  - [eslint-plugin-react](https://yarnpkg.com/en/package/eslint-plugin-react)
  - [eslint-plugin-react-native](https://yarnpkg.com/en/package/eslint-plugin-react-native)
  - [eslint-plugin-react-hooks](https://yarnpkg.com/en/package/eslint-plugin-react-hooks)
- Node config:
  - [eslint-config-prettier](https://yarnpkg.com/en/package/eslint-config-prettier)
  - [eslint-plugin-prettier](https://yarnpkg.com/en/package/eslint-plugin-prettier)
  - [eslint-plugin-jest](https://yarnpkg.com/en/package/eslint-plugin-jest) (applied for tests only, based on Jest's `testMatch` config)
  - [eslint-plugin-import](https://yarnpkg.com/en/package/eslint-plugin-import)
  - [eslint-plugin-promise](https://yarnpkg.com/en/package/eslint-plugin-promise)
  - [eslint-plugin-flowtype](https://yarnpkg.com/en/package/eslint-plugin-flowtype)
  - [@typescript-eslint/eslint-plugin](https://yarnpkg.com/en/package/@typescript-eslint/eslint-plugin)

Additionally, it sets these environments:

Default config:

```json
{
  "env": {
    "es6": true,
    "node": true,
    "react-native/react-native": true
  }
}
```

Node config:

```json
{
  "env": {
    "es6": true,
    "node": true
  }
}
```

## Installation

```
yarn add --dev eslint @callstack/eslint-config
```

_Note: We're using `yarn` to install deps. Feel free to change commands to use `npm` 3+ and `npx` if you like_

## Usage

Add to your ESLint config (`.eslintrc`, or `eslintConfig` field in `package.json`):

```json
{
  "extends": "@callstack"
}
```

or for Node.js projects:

```json
{
  "extends": "@callstack/eslint-config/node"
}
```

### Example of extending the configuration

```json
{
  "extends": "@callstack",
  "rules": {
    "global-require": 0,
    "prefer-destructuring": 0
  }
}
```

### TypeScript

In order to use this config in TypeScript project make sure you have installed following dependencies:

- [`@typescript-eslint/eslint-plugin`](https://yarnpkg.com/en/package/@typescript-eslint/eslint-plugin)
- [`@typescript-eslint/parser`](https://yarnpkg.com/en/package/@typescript-eslint/parser)
- [`typescript`](https://yarnpkg.com/en/package/typescript)

Then when running ESLint add `--ext '.js,.ts'` (you might need also `.jsx, .tsx`) option, for example:

```bash
yarn eslint --ext '.js,.ts' ./src
```
