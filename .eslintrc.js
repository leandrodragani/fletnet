module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'global-require': 'off',
    'no-return-assign': 'off',
    'linebreak-style': 'off',
    'no-return-await': 'off',
    'object-curly-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'arrow-parens': 'off'
  },
  globals: {
    fetch: false
  }
};
