import callstackConfig from '@callstack/eslint-config';

export default [
  {
    ignores: ['**/eslint.config.mjs', '__repro__/**'],
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
