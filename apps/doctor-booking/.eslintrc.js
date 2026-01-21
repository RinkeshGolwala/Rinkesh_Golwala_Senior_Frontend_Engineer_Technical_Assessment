module.exports = {
  root: false,
  extends: [
    '../../.eslintrc.js', // Inherit from root config
    'next/core-web-vitals', // Next.js recommended config
  ],
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
  },
  ignorePatterns: [
    '.next/**/*',
    'dist/**/*',
    'node_modules/**/*',
    '*.config.js',
    '.eslintrc.js',
  ],
};
