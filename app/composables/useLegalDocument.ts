import { parseMarkdown } from 'comark'
import type { MarkdownDocument as ParsedMarkdownDocument } from 'comark'
import toc from 'comark/plugins/toc'
import security from 'comark/plugins/security'
import flatHeadingIds from '../utils/comarkHeadingIds'
import termsEn from '../../content/legal/privacy-terms.en.md?raw'
import termsAr from '../../content/legal/privacy-terms.ar.md?raw'

const RAW_BY_LOCALE: Record<string, string> = { en: termsEn, ar: termsAr }
const parsedCache = new Map<string, Promise<ParsedMarkdownDocument>>()

/**
 * Parses and caches the legal document per locale. Pages await this directly
 * (top-level await in <script setup>) rather than the prototype's
 * useState+watchEffect pattern, so the parsed content is present in the
 * prerendered/SSR HTML instead of only appearing after client-side hydration.
 */
export function getLegalDocument(locale: string): Promise<ParsedMarkdownDocument> {
  const raw = RAW_BY_LOCALE[locale] ?? termsEn
  let cached = parsedCache.get(locale)
  if (!cached) {
    cached = parseMarkdown(raw, {
      headingIds: false,
      plugins: [
        flatHeadingIds(),
        toc({ depth: 1, searchDepth: 1 }),
        security({
          blockedTags: [
            'script',
            'style',
            'iframe',
            'frame',
            'frameset',
            'embed',
            'object',
            'base',
            'link',
            'meta',
            'form',
          ],
        }),
      ],
    })
    parsedCache.set(locale, cached)
  }
  return cached
}
