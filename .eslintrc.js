module.exports = {
  root: true,
  extends: ['airbnb', 'prettier'],
  settings: {
    'import/resolver': {
      alias: [
        ['~/features', './features'],
        ['~/config', './config'],
        ['~/utils', './utils'],
        ['~/styles', './styles']
      ]
    }
  },
  plugins: ['prettier', 'react-hooks'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  rules: {
    /**
     * BASE
     */
    'no-debugger': 0,
    'no-alert': 0,
    'no-console': [1, { allow: ['warn', 'error'] }],
    // Disallow the use of these operations
    'no-restricted-syntax': [
      2,
      'ForInStatement',
      'LabeledStatement',
      'WithStatement'
    ],
    'no-await-in-loop': 0,
    'no-return-assign': [2, 'except-parens'],
    // Disallow trailing commas
    'comma-dangle': 0,
    // Warn of unused variables with exceptions
    'no-unused-vars': [
      1,
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: 'res|next|^err'
      }
    ],
    // Disallow unused expressions which have no effect
    'no-unused-expressions': [2, { allowTaggedTemplates: true }],
    // Require 'const' for variables that are never reassigned after declared
    'prefer-const': [2, { destructuring: 'all' }],
    'arrow-body-style': [2, 'as-needed'],
    // Disallow parameter reassign except 'props'
    'no-param-reassign': [2, { props: false }],
    // Disable space between function and parameter declaration
    'space-before-function-paren': 0,
    // Let prettier handle max-len formatting
    'max-len': 0,
    // Disable trailing underscores in variable declarations
    'no-underscore-dangle': 0,
    // Disable return statements requiring values
    'consistent-return': 0,
    // Let prettier handle arrow parens formatting
    'arrow-parens': 0,
    // Let prettier handle operator formatting
    'operator-linebreak': 0,
    // Prevent local variables to share same name as containing scope variable
    'no-shadow': [
      2,
      {
        hoist: 'all',
        allow: ['resolve', 'reject', 'done', 'next', 'err', 'error']
      }
    ],
    // Allow single quotes for template literals and character escaping
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    // Enforces function declarations
    'func-style': ['error', 'declaration'],
    /**
     * IMPORT
     */
    // Enforce import order with spaces between groups
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always'
      }
    ],
    // Ensure imports appear before other statements
    'import/first': 2,
    // Disable prefering default export for files with single export
    'import/prefer-default-export': 0,
    /**
     * PRETTIER
     */
    'prettier/prettier': [
      2,
      {
        singleQuote: true,
        printWidth: 80,
        endOfLine: 'auto',
        trailingComma: 'none',
        arrowParens: 'avoid'
      }
    ],
    /**
     * REACT
     */
    // Prevent missing 'displayName' in React component definition
    'react/display-name': 1,
    // Only allow JSX in .js and .jsx files
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx']
      }
    ],
    'react/react-in-jsx-scope': 0,
    // Allow JSX props spreading
    'react/jsx-props-no-spreading': 0,
    // Allow characters such as ' in JSX statements
    'react/no-unescaped-entities': 0,
    // Warn about missing React proptypes validation
    'react/prop-types': 0,
    'react/boolean-prop-naming': [
      'error',
      { rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }
    ],
    // Prefer function declarations for named components
    'react/function-component-definition': [
      2,
      { namedComponents: 'function-declaration' }
    ],
    // Allow the use of array index as key prop
    'react/no-array-index-key': 1,
    /**
     * REACT HOOKS
     */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
