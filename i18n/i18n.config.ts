// Arabic plural categories (CLDR: zero/one/two/few/many/other) don't map onto
// vue-i18n's default English-shaped pluralization (singular | plural), which
// is why dashboard.statTopClassificationSub read wrong for 2 ("1 تعليقين") and
// 11 ("11 تعليق") without this. Only `ar` needs a custom rule — `en` keeps
// vue-i18n's default two-form (singular | plural) behavior.
import { arPluralRuleIndex } from '../app/utils/pluralRules'

export default defineI18nConfig(() => ({
  pluralRules: {
    ar: arPluralRuleIndex
  }
}))
