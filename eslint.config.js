import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  prettier,
  {
    ignores: [
      'node_modules/', 
      'dist/', 
      '.husky/', 
      'vite.config.ts', 
      'script/', 
      'bun.lockb', 
      'eslint.config.js', 
      'tsconfig.json', 
      'tsconfig.node.json', 
      '*.min.js', 
      '*.bundle.js'
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        setTimeout: true,
        localStorage: true,
        HTMLButtonElement: true,
        console: true, // Ensure `console` is recognized
        window: true, // Ensure `window` is recognized
        __dirname: true, // Ensure `__dirname` is recognized
        document: true,
        process: true,
        browser: true, // Browser global variables like `window` etc.
        commonjs: true, // CommonJS global variables and CommonJS scoping.
        es6: true, // Enable all ECMAScript 6 features except for modules.
        jest: true, // Jest global variables like `it` etc.
        node: true, // Node.js global variables like `process` etc.
      },
    },
    plugins: {
      react,
      reactHooks,
      import: importPlugin,
      '@typescript-eslint': typescript,
    },
    rules: {
      // 'prettier/prettier': ['error', { endOfLine: 'auto' }],
      quotes: ['error', 'single'],
      semi: ['warn', 'always'],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { vars: 'all', varsIgnorePattern: '^_', argsIgnorePattern: '^_', ignoreRestSiblings: true }],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-named-as-default': 'error',
      'import/no-unresolved': 'warn',
      'react/self-closing-comp': 'warn',
      'no-console': ['warn', { allow: ['debug', 'warn', 'error'] }],
      'no-debugger': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        alias: {
          map: [
            ['src', './src/'],
            ['public', './public/'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];
