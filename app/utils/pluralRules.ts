/**
 * Maps a count to the pipe-separated message index for this app's Arabic
 * plural messages, shaped `one | two | few | many | other` (5 forms, no
 * `zero` — see i18n.config.ts, which registers this as vue-i18n's `ar`
 * pluralRule). Exported from here rather than written inline in
 * i18n.config.ts because that file relies on Nuxt's `defineI18nConfig`
 * auto-import and so can't be imported directly in a plain vitest test; this
 * keeps the actual category mapping unit-testable.
 */
const AR_PLURAL_FORM_INDEX: Record<string, number> = {
  one: 0,
  two: 1,
  few: 2,
  many: 3,
  other: 4,
  zero: 4
}

export function arPluralRuleIndex(choice: number): number {
  return AR_PLURAL_FORM_INDEX[new Intl.PluralRules('ar').select(choice)] ?? 4
}
