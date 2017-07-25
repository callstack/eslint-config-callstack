# eslint-config-callstack-io

Callstack.io eslint config utilizing Airbnb config, Flow, Prettier and Jest support.

Plugins and configs used:
* [eslint-config-airbnb](https://yarnpkg.com/en/package/eslint-config-airbnb)
* [eslint-config-prettier](https://yarnpkg.com/en/package/eslint-config-prettier)
* [eslint-plugin-flowtype](https://yarnpkg.com/en/package/eslint-plugin-flowtype)
* [eslint-plugin-jest](https://yarnpkg.com/en/package/eslint-plugin-jest)

## Installation

You'll need to install correct version of each package.

*Note: We're using `yarn` to install deps. Feel free to change commands to use `npm` and `npx` if you like*

For convenience Linux/OSX users can run:

```shell
(
  export PKG=eslint-config-callstack-io;
  yarn info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add --dev "$PKG"
)
```

Windows users can either install all the peer dependencies manually, or use the `install-peerdeps` cli tool.

```shell
yarn global add install-peerdeps
install-peerdeps --dev eslint-config-airbnb
```

## Usage

Add to your eslint config:

```json
{
  "eslint": {
    "extends": "callstack-io"
  }
}
```
