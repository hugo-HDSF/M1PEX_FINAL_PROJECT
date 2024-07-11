import sharedConfig from '@repo/eslint-config/eslint.config.shared.js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...sharedConfig,
  {
    ignores: ['apps/**', 'packages/**'],
  },
  {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: true,
    },
  },
];
