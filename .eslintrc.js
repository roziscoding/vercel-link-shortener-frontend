module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {}
}
