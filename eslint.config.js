import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['.preview/**', 'examples/maximus/package/**'],
  },
  {
    files: ['**/*.mjs', 'eslint.config.js'],
    languageOptions: { globals: globals.node },
    rules: { ...js.configs.recommended.rules, curly: ['error', 'all'] },
  },
  {
    files: ['examples/maximus/tools/verify.mjs'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  {
    files: ['examples/**/*.js'],
    languageOptions: { globals: globals.browser },
    rules: { ...js.configs.recommended.rules, curly: ['error', 'all'] },
  },
];
