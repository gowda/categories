module.exports = {
  rules: {
    'func-names': ['error', 'never'],
    'import/no-extraneous-dependencies': ['error', {'devDependencies': ['features/**/*.js']}],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
  },
};
