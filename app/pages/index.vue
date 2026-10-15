<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead(() => ({
  title: t('landing.title'),
  meta: [{ name: 'description', content: t('landing.description') }],
}))
</script>

<template>
  <div class="landing">
    <header class="landing-topbar">
      <LanguageSwitcher />
    </header>
    <main class="landing-main">
      <AppLogo :size="64" />
      <p class="landing-brand">{{ t('brand.name') }}</p>
      <p class="landing-description">{{ t('landing.description') }}</p>
      <h1 class="landing-coming-soon">{{ t('landing.comingSoon') }}</h1>
      <p class="landing-about">{{ t('landing.about') }}</p>
      <NuxtLink :to="localePath('/legal')" class="landing-legal-link">
        {{ t('landing.legalLink') }}
      </NuxtLink>
    </main>
    <footer class="landing-footer">
      <span>{{ t('landing.footer') }}</span>
    </footer>
  </div>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
}

.landing-topbar {
  display: flex;
  justify-content: flex-end;
  padding: 14px 20px;
}

.landing-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 24px;
  gap: 10px;
  max-width: 520px;
  margin: 0 auto;
}

.landing-brand {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 500;
  color: var(--text);
  margin: 18px 0 0;
}

.landing-description {
  font-size: 15px;
  color: var(--text-dim);
  margin: 0;
  line-height: 1.6;
}

.landing-coming-soon {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 600;
  color: var(--primary);
  margin: 18px 0 0;
}

.landing-about {
  font-size: 13.5px;
  color: var(--text-dim);
  margin: 6px 0 0;
  line-height: 1.6;
}

.landing-legal-link {
  margin-top: 18px;
  font-size: 13.5px;
  color: var(--primary);
  text-decoration: none;
}

.landing-legal-link:hover {
  text-decoration: underline;
}

.landing-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 18px 20px calc(18px + env(safe-area-inset-bottom));
  font-size: 12.5px;
  color: var(--text-dim);
  border-top: 1px solid var(--border);
}

@media (max-width: 480px) {
  .landing-coming-soon {
    font-size: 26px;
  }
}
</style>
