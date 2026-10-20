import callstackConfig from '@callstack/eslint-config';
import react from 'eslint-plugin-react';
import rn from 'eslint-plugin-react-native';
export default [
  { ignores: ['**/*.config.mjs'] },
  ...callstackConfig.map((c) => c.plugins?.['react-native'] ? { ...c, plugins: { ...c.plugins, 'react-native': rn } } : c),
];
