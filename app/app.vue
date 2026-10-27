<script setup lang="ts">
const { siteUrl, siteName } = useRuntimeConfig().public
const route = useRoute()
const url = computed(() => siteUrl + route.path)
// hreflang alternates, og:locale and <html lang> for the current locale.
const i18nHead = useLocaleHead({ seo: true })
const colorMode = useColorMode()

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  meta: [...(i18nHead.value.meta ?? []), { name: 'theme-color', content: colorMode.value === 'light' ? '#f3f5f3' : '#1e201e' }],
  link: [...(i18nHead.value.link ?? []), { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }, { rel: 'canonical', href: url.value }],
}))

// Share defaults: crawlers need absolute URLs. Pages override title/description.
useSeoMeta({
  ogType: 'website',
  ogSiteName: siteName,
  ogUrl: url,
  ogImage: `${siteUrl}/og.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogImageAlt: siteName,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <SiteHeader />
  <main id="main">
    <NuxtPage />
  </main>
  <SiteFooter />
</template>
