<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()

const menu = useDropdownMenu('language-switcher')
const availableLocales = computed(() => (locales.value as Array<{ code: string }>).map((l) => l.code))

function pickLocale(code: string) {
  setLocale(code as 'en' | 'ar')
  menu.close()
}
</script>

<template>
  <div class="theme-switcher" :ref="menu.containerRef">
    <button :ref="menu.triggerRef" class="icon-btn" :title="t('topbar.language')" :aria-label="t('topbar.toggleLanguageMenu')" @click="menu.toggle()">
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="8" cy="8" r="6.25"></circle>
        <path d="M1.75 8h12.5"></path>
        <ellipse cx="8" cy="8" rx="2.9" ry="6.25"></ellipse>
      </svg>
    </button>
    <div class="page-menu" :class="{ open: menu.isOpen.value }">
      <button v-for="code in availableLocales" :key="code" class="page-menu-item" :class="{ active: code === locale }" @click="pickLocale(code)">
        <span class="pm-name">{{ code === 'en' ? 'English' : 'العربية' }}</span>
        <span v-if="code === locale" class="pm-check">&check;</span>
      </button>
    </div>
  </div>
</template>
