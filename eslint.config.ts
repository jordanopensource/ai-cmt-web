import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import css from '@eslint/css'
import { defineConfig } from 'eslint/config'
import withNuxt from './.nuxt/eslint.config.mjs'

const codeFiles = ['**/*.{js,mjs,cjs,ts,mts,cts,vue}']

export default withNuxt(
  defineConfig([
    // content/legal holds translated legal text copied verbatim from the
    // prototype — not authored markdown, so markdown-lint rules (e.g.
    // reference-link syntax) don't meaningfully apply to it.
    { ignores: ['dist', 'node_modules', 'pnpm-lock.yaml', '.nuxt', '.output', 'content/**'] },
    {
      files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
      plugins: { js },
      extends: ['js/recommended'],
      languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    { files: ['**/*.{ts,mts,cts,vue}'], extends: [tseslint.configs.recommended] },
    {
      files: ['**/*.vue'],
      extends: [pluginVue.configs['flat/essential']],
      languageOptions: { parserOptions: { parser: tseslint.parser } },
      rules: { 'vue/multi-word-component-names': 'off' },
    },
    {
      files: ['**/*.json'],
      ignores: ['tsconfig.json'],
      plugins: { json },
      language: 'json/json',
      extends: ['json/recommended'],
    },
    {
      files: ['**/*.md'],
      plugins: { markdown },
      language: 'markdown/commonmark',
      extends: ['markdown/recommended'],
    },
    {
      files: ['tsconfig.json'],
      plugins: { json },
      language: 'json/jsonc',
      extends: ['json/recommended'],
    },
    {
      files: ['**/*.css'],
      plugins: { css },
      language: 'css/css',
      languageOptions: { tolerant: true },
      extends: ['css/recommended'],
      // no-invalid-at-rules: Nuxt's own injected at-rules trip this up.
      // no-invalid-properties: can't resolve var() custom properties
      // declared in a different CSS file (tokens.css vs base.css), so it
      // false-positives on every themed property here.
      rules: { 'css/no-invalid-at-rules': 'off', 'css/no-invalid-properties': 'off' },
    },
  ]),
).onResolved((configs) => {
  for (const config of configs) {
    const globalOnly = Object.keys(config).every((k) => k === 'name' || k === 'ignores')
    if (!config.files && !config.language && !globalOnly) config.files = codeFiles
  }
})
