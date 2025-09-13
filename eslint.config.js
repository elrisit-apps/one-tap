// https://docs.expo.dev/guides/using-eslint/
const globals = require('globals');
const pluginJs = require('@eslint/js');
const tseslint = require('typescript-eslint');
const pluginReact = require('eslint-plugin-react');
const pluginReactConfig = require('eslint-plugin-react/configs/recommended');

module.exports = [
  {
    // Configuration for the main project files (React, TypeScript)
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node, // Add node globals for environments that might mix browser/node (e.g., React Native)
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: pluginReact,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReactConfig.rules,
      'react/react-in-jsx-scope': 'off', // Disable for React 17+ JSX transform
      '@typescript-eslint/no-require-imports': 'off', // Allow require for now, especially in config files
      'no-undef': 'off', // Temporarily disable no-undef to handle mixed environments better
    },
  },
  {
    // Configuration for Node.js specific files (e.g., scripts)
    files: ['scripts/**/*.js', 'eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off', // Allow module, require, process in Node.js files
    },
  },
];
