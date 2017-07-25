# eslint-config-callstack-io

Eslint config for Callstack.io utilizing Airbnb config, Flow, Prettier and Jest support.

Plugins and configs used:
* [eslint-config-airbnb](https://yarnpkg.com/en/package/eslint-config-airbnb)
* [eslint-config-prettier](https://yarnpkg.com/en/package/eslint-config-prettier)
* [eslint-plugin-flowtype](https://yarnpkg.com/en/package/eslint-plugin-flowtype)
* [eslint-plugin-jest](https://yarnpkg.com/en/package/eslint-plugin-jest)

## Installation

1. Install correct version of each package:
* Linux/OSX users can run
  ```shell
  (
    export PKG=eslint-config-callstack-io;
    npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add --dev "$PKG"
  )
  ```

* Windows users can either install all the peer dependencies manually, or use the `install-peerdeps` cli tool.

  ```shell
  npm install -g install-peerdeps
  install-peerdeps --dev eslint-config-airbnb
  ```

1. Add to your eslint config:
```json
{
  "eslint": {
    "extends": "callstack-io"
  }
}
```
