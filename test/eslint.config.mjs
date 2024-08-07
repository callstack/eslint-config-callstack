import callstackConfig from '@callstack/eslint-config';

export default [
  {
    ignores: ['eslint.config.mjs'],
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
