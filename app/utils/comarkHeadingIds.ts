import { defineComarkPlugin } from 'comark'
import type { Node } from 'comark'

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

// Comark's built-in `headingIds` option prefixes nested headings with their
// parent's slug (h3 under h2 -> "parent-slug-child-slug"). MDC's github-slugger
// based ids were flat, per-heading — this replicates that so existing anchor
// URLs in the legal doc don't change. Unlike Comark's own internal slugify
// (which strips to `\w`, i.e. ASCII only — it collapses every Arabic heading
// to an empty string), this keeps letters/digits from any script via \p{L}/\p{N}
// so Arabic headings get real, distinct slugs instead of empty-string clashes.
function slugify(text: string): string {
  let slug = text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}_-]+/gu, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
  if (/^\d/.test(slug)) slug = '_' + slug
  return slug
}

function textContent(node: Node): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.slice(2).map((child) => textContent(child as Node)).join('')
  return ''
}

function assignFlatIds(nodes: Node[], counts: Map<string, number>) {
  for (const node of nodes) {
    if (!Array.isArray(node)) continue
    const [tag, props] = node
    if (typeof tag === 'string' && HEADING_TAGS.has(tag) && props && typeof props === 'object' && !props.id) {
      const base = slugify(textContent(node))
      const count = counts.get(base) ?? 0
      counts.set(base, count + 1)
      props.id = count === 0 ? base : `${base}-${count}`
    }
    assignFlatIds(node.slice(2) as Node[], counts)
  }
}

/** Assigns flat, MDC-compatible `id`s to h1-h6 nodes. Pair with `headingIds: false`. */
export default defineComarkPlugin(() => ({
  name: 'flat-heading-ids',
  post(state) {
    assignFlatIds(state.tree.nodes, new Map())
  }
}))
