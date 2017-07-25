# eslint-config-callstack-io

Callstack.io eslint config utilizing Airbnb config, Flow, Prettier and Jest support.

Plugins and configs used:
* [eslint-config-airbnb](https://yarnpkg.com/en/package/eslint-config-airbnb)
* [eslint-config-prettier](https://yarnpkg.com/en/package/eslint-config-prettier)
* [eslint-plugin-flowtype](https://yarnpkg.com/en/package/eslint-plugin-flowtype)
* [eslint-plugin-jest](https://yarnpkg.com/en/package/eslint-plugin-jest)

## Installation

```
yarn add --dev eslint eslint-config-callstack-io
```

*Note: We're using `yarn` to install deps. Feel free to change commands to use `npm` and `npx` if you like*

## Usage

Add to your eslint config:

```json
{
  "eslint": {
    "extends": "callstack-io"
  }
}
```
