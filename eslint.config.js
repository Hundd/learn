const tseslint = require('typescript-eslint');
const angularPlugin = require('@angular-eslint/eslint-plugin');
const angularTemplatePlugin = require('@angular-eslint/eslint-plugin-template');

// Apply TypeScript recommended only to .ts files so HTML is not parsed by TypeScript rules
const tsRecommended = tseslint.configs.recommended.map((c) => ({ ...c, files: ['**/*.ts'] }));

module.exports = tseslint.config(
  ...tsRecommended,
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': angularPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './src/tsconfig.app.json', './src/tsconfig.spec.json', './e2e/tsconfig.e2e.json'],
      },
    },
    rules: {
      ...angularPlugin.configs.recommended.rules,
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@angular-eslint/contextual-lifecycle': 'warn',
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
    },
  },
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    languageOptions: {
      parser: require('@angular-eslint/template-parser'),
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
    },
  }
);