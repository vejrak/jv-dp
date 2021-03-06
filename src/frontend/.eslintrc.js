module.exports = {
  env: {
    browser: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/react',
  ],
  globals: {},
  parser: 'babel-eslint',
  plugins: ['jest', 'fp', 'prettier', 'flowtype'],
  rules: {
    'flowtype/generic-spacing': 'off',
    "camelcase": 'off',
    'flowtype/space-after-type-colon': 'off',
    'fp/no-mutating-assign': 'error',
    'import/first': 'off',
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': ['error',{devDependencies: true,optionalDependencies: false,peerDependencies: false,},],
    'import/order': ['error',{groups: ['builtin','external',],'newlines-between': 'ignore',},],
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-for': 'off',
    "jsx-a11y/label-has-associated-control": [ 2, {
          "labelComponents": ["label"],
          "labelAttributes": ["htmlFor"],
          "controlComponents": ["input"]
    }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-alert': 'off',
    'no-console': [process.env.NODE_ENV === 'production' ? 'error' : 'warn',{ allow: ['error'] },],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-nested-ternary': 'warn',
    'no-param-reassign': ['error',{props: false,},],
    'no-return-assign': ['error', 'except-parens'],
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': ['error', { functions: false }],
    'prettier/prettier': 'error',
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-sort-props': ['error',{ignoreCase: true,callbacksLast: false,shorthandFirst: false,shorthandLast: false,noSortAlphabetically: false,reservedFirst: true,},],
    'react/no-danger': 'off',
    'react/require-default-props': 'off',
  },
}
