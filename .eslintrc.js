module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-dom/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'jest'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/prefer-stateless-function': 'off',
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
