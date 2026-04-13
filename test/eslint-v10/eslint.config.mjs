import callstackConfig from '@callstack/eslint-config/react-native.flat.js';

export default [
  {
    ignores: ['**/eslint.config.mjs'],
  },
  {
    settings: {
      jest: {
        version: 'latest',
      },
    },
  },
  ...callstackConfig,
];
