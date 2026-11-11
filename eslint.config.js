import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['.preview/**', 'skills/maximus-compose/assets/starter/assets/**'],
  },
  {
    files: ['**/*.mjs', 'eslint.config.js'],
    languageOptions: { globals: globals.node },
    rules: { ...js.configs.recommended.rules, curly: ['error', 'all'] },
  },
  {
    files: ['poc/maximus/verify.mjs'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  {
    files: ['skills/maximus-compose/assets/starter/compose.js'],
    languageOptions: { globals: globals.browser },
    rules: { ...js.configs.recommended.rules, curly: ['error', 'all'] },
  },
];
