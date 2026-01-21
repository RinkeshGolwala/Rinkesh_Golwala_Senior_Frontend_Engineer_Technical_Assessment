module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './tsconfig.json',
      './packages/*/tsconfig.json',
      './apps/*/tsconfig.json',
    ],
    tsconfigRootDir: __dirname,
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
    'no-console': 'off', // TODO: change to error once logger is set up
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-unused-vars': 'off', // Disable base rule to avoid conflicts
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  ignorePatterns: [
    'dist/**/*',
    'node_modules/**/*',
    '*.config.js',
    '.eslintrc.js',
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
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
