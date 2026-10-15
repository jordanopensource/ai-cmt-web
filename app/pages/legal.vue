<script setup lang="ts">
import LegalMarkdown from '~/components/legal/LegalMarkdown'
import type { Node } from 'comark'

definePageMeta({ layout: 'legal' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const document = await getLegalDocument(locale.value)

const title = computed(() => String(document.frontmatter.title))
const version = computed(() => String(document.frontmatter.version))

const lastUpdatedLabel = computed(() => {
  const raw = document.frontmatter.lastUpdated
  if (!raw) return ''
  const date = raw instanceof Date ? raw : new Date(String(raw))
  if (Number.isNaN(date.getTime())) return String(raw)
  const formatted = new Intl.DateTimeFormat(locale.value === 'ar' ? 'ar' : 'en', {
    dateStyle: 'long',
    numberingSystem: 'latn',
    timeZone: 'UTC',
  }).format(date)
  return t('legal.lastUpdated', { date: formatted })
})

// The document's own H1 duplicates the frontmatter title we render as the real
// page heading above the "last updated / version" line and the TOC — drop it
// from the rendered body rather than showing the title twice.
const displayValue = computed(() => ({
  nodes: document.nodes.filter((node) => !(Array.isArray(node) && (node as Node)[0] === 'h1')),
}))

const tocLinks = computed(() => document.meta.toc?.links ?? [])

useHead(() => ({
  title: t('legal.title', { title: title.value }),
  meta: [{ name: 'description', content: t('legal.metaDescription') }],
}))
</script>

<template>
  <div class="legal-page">
    <article class="legal-article">
      <NuxtLink :to="localePath('/')" class="back-link">
        <span class="back-link-arrow" aria-hidden="true">←</span>
        <span>{{ t('legal.backToMarsad') }}</span>
      </NuxtLink>
      <h1 class="legal-title">{{ title }}</h1>
      <p class="legal-meta">
        <span>{{ lastUpdatedLabel }}</span>
        <span class="legal-version">v{{ version }}</span>
      </p>
      <nav v-if="tocLinks.length" class="legal-toc" :aria-label="t('legal.tocHeading')">
        <div class="legal-toc-heading">{{ t('legal.tocHeading') }}</div>
        <ol>
          <li v-for="link in tocLinks" :key="link.id">
            <a :href="`#${link.id}`">{{ link.text }}</a>
          </li>
        </ol>
      </nav>
      <div class="legal-body">
        <LegalMarkdown :value="displayValue" />
      </div>
    </article>
  </div>
</template>

<style scoped>
.legal-page {
  padding: 40px 26px 80px;
  display: flex;
  justify-content: center;
}

.legal-article {
  width: 100%;
  max-width: 760px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 10px;
  padding: 4px 2px;
  color: var(--text-dim);
  font-size: 13px;
  text-decoration: none;
}

.back-link:hover {
  color: var(--text);
}

html[dir='rtl'] .back-link-arrow {
  display: inline-block;
  transform: scaleX(-1);
}

.legal-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 8px;
}

.legal-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 24px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-dim);
}

.legal-version {
  padding: 1px 7px;
  border: 1px solid var(--border);
  border-radius: 10px;
}

.legal-toc {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px 18px;
  margin: 0 0 32px;
  background: color-mix(in srgb, var(--border) 15%, transparent);
}

.legal-toc-heading {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  margin-bottom: 8px;
}

.legal-toc ol {
  margin: 0;
  padding-inline-start: 18px;
}

.legal-toc li + li {
  margin-top: 4px;
}

.legal-toc a {
  color: var(--text);
  text-decoration: none;
}

.legal-toc a:hover {
  color: var(--primary);
  text-decoration: underline;
}

.legal-body {
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--text);
}

.legal-body :deep(h2),
.legal-body :deep(h3) {
  font-family: var(--font-display);
  scroll-margin-top: 20px;
}

.legal-body :deep(h2) {
  font-size: 20px;
  margin: 36px 0 12px;
}

.legal-body :deep(h3) {
  font-size: 16px;
  margin: 24px 0 8px;
}

.legal-body :deep(h2 a),
.legal-body :deep(h3 a) {
  color: inherit;
  text-decoration: none;
}

.legal-body :deep(h2 a:hover),
.legal-body :deep(h3 a:hover) {
  text-decoration: underline;
}

.legal-body :deep(p) {
  margin: 0 0 14px;
}

.legal-body :deep(blockquote) {
  margin: 0 0 20px;
  padding: 10px 16px;
  border-inline-start: 3px solid var(--primary);
  background: color-mix(in srgb, var(--border) 15%, transparent);
  color: var(--text-dim);
  border-radius: 0 6px 6px 0;
}

.legal-body :deep(blockquote p) {
  margin: 0;
}

.legal-body :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: color-mix(in srgb, var(--border) 25%, transparent);
  padding: 1px 5px;
  border-radius: 4px;
}

.legal-body :deep(ul),
.legal-body :deep(ol) {
  margin: 0 0 14px;
  padding-inline-start: 22px;
}

.legal-body :deep(li) {
  margin-bottom: 4px;
}

.legal-body :deep(table) {
  width: 100%;
  min-width: 480px;
}

@media (max-width: 760px) {
  .legal-page {
    padding: 24px 16px 60px;
  }

  .legal-title {
    font-size: 22px;
  }
}
</style>
