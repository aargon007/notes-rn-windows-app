module.exports = {
  extends: ['universe', 'universe/native', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 0,
    'import/order': 0,
    'react-native/no-inline-styles': 0,
    'import/namespace': 0,
    'no-duplicate-imports': 'error',
  },
};
