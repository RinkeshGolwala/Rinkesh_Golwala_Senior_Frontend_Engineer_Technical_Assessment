module.exports = {
  root: false,
  extends: [
    '../../.eslintrc.js', // Inherit from root config
    'next/core-web-vitals', // Next.js recommended config
  ],
  plugins: ['simple-import-sort'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    next: {
      rootDir: './',
    },
  },
  rules: {
    // Disable the pages directory rule since we're using App Router
    '@next/next/no-html-link-for-pages': 'off',
    // Import sorting (simple-import-sort)
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  ignorePatterns: [
    '.next/**/*',
    'dist/**/*',
    'node_modules/**/*',
    '*.config.js',
    '.eslintrc.js',
  ],
};
