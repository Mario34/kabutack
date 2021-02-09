module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    '@vue/typescript',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'import/no-unresolved': 0,
    'import/first': 2,
    'import/no-duplicates': 1,
    'import/order': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/type-annotation-spacing': [1],
    '@typescript-eslint/member-delimiter-style': [
      1,
      {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-explicit-any': 0,
    // 数组类型始终使用[]格式声明
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/indent': ['error', 2],
    // 禁止变量在声明前使用：取消
    '@typescript-eslint/no-use-before-define': 0,
    // 空函数
    '@typescript-eslint/no-empty-function': 0,
    // class的方法必须声明public/private，constructors除外
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'no-public',
        },
      },
    ],
    'no-undef': [2],
    'no-multiple-empty-lines': [2, { max: 2, maxEOF: 0 }],
    'space-infix-ops': [1],
    'no-console': [1],
    'object-curly-spacing': [1, 'always'],
    indent: ['error', 2],
    'prefer-const': [2],
    'arrow-spacing': [1, { before: true, after: true }],
    'space-before-function-paren': [
      1,
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'comma-spacing': [2, { before: false, after: true }],
    'comma-style': [2, 'last'],
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'key-spacing': [
      1,
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    'semi-spacing': [2, { before: false, after: true }],
    semi: [2, 'never'],
    quotes: [1, 'single'],
    'space-before-blocks': [
      1,
      {
        functions: 'always',
        keywords: 'always',
        classes: 'always',
      },
    ],
    'no-trailing-spaces': [1],
    'no-multi-spaces': [1],
    'no-mixed-spaces-and-tabs': 2,
    'no-tabs': 2,
    'vue/require-default-prop': [0],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 4,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/html-self-closing': [
      2,
      {
        html: {
          void: 'any',
          normal: 'any',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/prop-name-casing': 'off',
    'vue/custom-event-name-casing': 'off',
  },
  globals: {
    ComponentSize: 'readonly',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
        jest: true,
      },
    },
  ],
  settings: {
    'import/extensions': ['.js', '.ts', '.tsx', '.vue'],
  },
}
