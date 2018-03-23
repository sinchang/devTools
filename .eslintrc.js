module.exports = {
  extends: ['eslint-config-alloy/vue'],
  globals: {},
  rules: {
    semi: [2, 'never'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    'no-new': 0
  }
}
