module.exports = {
  root: false, // Inherit from parent config
  extends: [
    '../../.eslintrc.js', // Inherit from root config
  ],
  parserOptions: {
    project: './tsconfig.json', // Point to local tsconfig
  },
  ignorePatterns: [
    'dist/**/*',
    'node_modules/**/*',
    '*.config.js',
    '.eslintrc.js',
    'coverage/**/*',
    'storybook-static/**/*',
    '*.stories.@(js|jsx|ts|tsx)',
  ],
};
