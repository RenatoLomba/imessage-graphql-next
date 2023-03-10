module.exports = {
  extends: ['@rocketseat/eslint-config/react'],
  plugins: [
    'eslint-plugin-import-helpers'
  ],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "no-useless-constructor": "off",
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: [
          'PascalCase'
        ],
        custom: {
          regex: '^I[A-Z]',
          match: true
        }
      }
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^@/',
          [
            'parent',
            'sibling',
            'index'
          ]
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true
        }
      }
    ]
  }
}
