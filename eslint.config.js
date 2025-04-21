import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['src/**/*.{js,vue}'],
    rules: {
      'vue/no-unused-vars': 'error',
      'prettier/prettier': 'warn',
      'no-console': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
    },
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
]
