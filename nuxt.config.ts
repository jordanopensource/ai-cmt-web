// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Without pathPrefix:false, Nuxt auto-names components/common/AppLogo.vue
  // as <CommonAppLogo> instead of <AppLogo> — silently unresolved in every
  // template that uses <AppLogo>/<LanguageSwitcher>.
  components: [{ path: '~/components', pathPrefix: false }],
  modules: ['@nuxtjs/i18n', '@comark/nuxt', '@nuxt/eslint'],
  i18n: {
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'en', file: 'en.json', dir: 'ltr' },
      { code: 'ar', file: 'ar.json', dir: 'rtl' },
    ],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  css: ['~/assets/css/tokens.css', '~/assets/css/fonts.css', '~/assets/css/base.css'],
  nitro: {
    prerender: {
      routes: ['/', '/legal', '/ar', '/ar/legal'],
      crawlLinks: false,
      failOnError: true,
    },
  },
})
