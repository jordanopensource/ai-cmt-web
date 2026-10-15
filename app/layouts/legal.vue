<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="legal-shell">
    <header class="legal-topbar">
      <NuxtLink :to="localePath('/')" class="legal-brand">
        <AppLogo :size="28" />
        <b>{{ t('brand.name') }}</b>
      </NuxtLink>
      <LanguageSwitcher />
    </header>
    <main class="legal-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.legal-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
}

.legal-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.legal-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text);
}

.legal-brand b {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 500;
}

.legal-main {
  flex: 1;
}
</style>
