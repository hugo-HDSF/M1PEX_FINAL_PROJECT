import onlyWarn from 'eslint-plugin-only-warn';
import globals from 'globals';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/.*.js', '**/node_modules/', '**/dist/'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:prettier/recommended',
    'turbo',
  ),
  {
    plugins: {
      'only-warn': onlyWarn,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project:
            '/Users/hugodasilvafilipe/Workspace/Fullstack/M1PEX_FINAL_PROJECT/tsconfig.json',
        },
      },
    },
  },
  {
    files: [
      '**/*.?(m)?(c)js?(x)',
      '**/*.?(m)?(c)ts?(x)',
    ],
  },
];
