# eslint-config-callstack

Callstack eslint config utilizing Airbnb config, Flow, Prettier and Jest support.

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

## Known issues

Latest `create-react-app` ships with different version of `eslint-plugin-jsx-a11y` that causes the following error to happen as soon as you integrate the preset to your application: `Definition for rule 'jsx-a11y/label-has-associated-control' was not found`. 

Thankfully, this can be easily fixed by using yarn resolution mechanism to tell it to use the right version.

```js
  "resolutions": {
    "eslint-plugin-jsx-a11y": "6.1.1"
  }
```

