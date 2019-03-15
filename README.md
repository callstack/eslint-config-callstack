# eslint-config-callstack

[![Greenkeeper badge](https://badges.greenkeeper.io/callstack/eslint-config-callstack.svg)](https://greenkeeper.io/)

Callstack eslint config utilizing Flow, Prettier and Jest support.

Plugins and configs used:
* [eslint-config-prettier](https://yarnpkg.com/en/package/eslint-config-prettier)
* [eslint-plugin-prettier](https://yarnpkg.com/en/package/eslint-plugin-prettier)
* [eslint-plugin-flowtype](https://yarnpkg.com/en/package/eslint-plugin-flowtype)
* [eslint-plugin-jest](https://yarnpkg.com/en/package/eslint-plugin-jest)
* [eslint-plugin-react-native](https://yarnpkg.com/en/package/eslint-plugin-react-native)
* [eslint-plugin-import](https://yarnpkg.com/en/package/eslint-plugin-import)
* [eslint-plugin-react-hooks](https://yarnpkg.com/en/package/eslint-plugin-react-hooks)

Additionally, it sets these environments:
```json
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  }
}
```

## Installation

```
yarn add --dev eslint @callstack/eslint-config
```

*Note: We're using `yarn` to install deps. Feel free to change commands to use `npm` 3+ and `npx` if you like*

## Usage

Add to your eslint config (`.eslintrc`, or `eslintConfig` field in `package.json`):

```json
{
    "extends": "@callstack"
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

