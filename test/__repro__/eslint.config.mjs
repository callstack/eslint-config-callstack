import callstackConfig from '@callstack/eslint-config';

export default [
  { ignores: ['**/eslint.config.mjs'] },
  ...callstackConfig,
  {
    files: ['**/rn-split-platform.js'],
    rules: {
      'react-native/split-platform-components': 'error',
      'react-native/sort-styles': 'error',
      'react-native/no-single-element-style-arrays': 'error',
      'react/display-name': 'error',
    },
  },
];
