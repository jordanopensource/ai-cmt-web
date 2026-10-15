import { defineMarkdownDocumentComponent } from '@comark/vue'
import LegalTableWrap from './LegalTableWrap.vue'

export default defineMarkdownDocumentComponent({
  name: 'LegalMarkdown',
  components: { table: LegalTableWrap }
})
