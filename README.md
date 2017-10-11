# eslint-config-callstack-io

Callstack.io eslint config utilizing Airbnb config, Flow, Prettier and Jest support.

Plugins and configs used:
* [eslint-config-airbnb](https://yarnpkg.com/en/package/eslint-config-airbnb)
* [eslint-config-prettier](https://yarnpkg.com/en/package/eslint-config-prettier)
* [eslint-plugin-flowtype](https://yarnpkg.com/en/package/eslint-plugin-flowtype)
* [eslint-plugin-jest](https://yarnpkg.com/en/package/eslint-plugin-jest)

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

And for test files matching default Jest `testMatch`:
```json
{
  "env": {
    "jest/globals": true
  }
}
```

## Installation

```
yarn add --dev eslint eslint-config-callstack-io
```

*Note: We're using `yarn` to install deps. Feel free to change commands to use `npm` and `npx` if you like*

## Usage

Add to your eslint config (`.eslintrc`, or `eslintConfig` field in `package.json`):

```json
{
    "extends": "callstack-io"
}
```
