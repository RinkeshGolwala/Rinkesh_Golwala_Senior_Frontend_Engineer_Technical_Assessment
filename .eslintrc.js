module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  plugins: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // General rules
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-unused-vars': 'off', // Disabled for TypeScript files
  },
  ignorePatterns: [
    'dist/**/*',
    'node_modules/**/*',
    '*.config.js',
    'coverage/**/*',
    'storybook-static/**/*',
    '.next/**/*',
  ],
  overrides: [
    {
      files: ['*.stories.@(js|jsx|ts|tsx)'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['*.test.@(js|jsx|ts|tsx)', '*.spec.@(js|jsx|ts|tsx)'],
      env: {
        jest: true,
      },
    },
  ],
};
