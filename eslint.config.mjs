import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginAstro from 'eslint-plugin-astro';

/** @type {import('eslint').Linter.Config} */
export default [
  eslint.configs.recommended,
  eslintConfigPrettier,
  ...eslintPluginAstro.configs.recommended,
]
