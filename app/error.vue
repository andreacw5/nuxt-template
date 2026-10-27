<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const localePath = useLocalePath()

const key = computed(() => (props.error.statusCode === 404 ? 'notFound' : 'generic'))

// error.vue replaces app.vue, so the page sets its own lang and keeps itself out of the index.
const i18nHead = useLocaleHead()
useHead(() => ({ htmlAttrs: i18nHead.value.htmlAttrs, meta: [{ name: 'robots', content: 'noindex' }] }))
useSeoMeta({ title: () => t(`error.${key.value}.title`) })

// The error state stays until it is cleared: a plain link would keep showing this page.
const goHome = () => clearError({ redirect: localePath('/') })
</script>

<template>
  <NuxtRouteAnnouncer />
  <SiteHeader />
  <main id="main" class="wrap page">
    <p class="code mono" aria-hidden="true">{{ error.statusCode }}</p>
    <h1>{{ t(`error.${key}.title`) }}</h1>
    <p class="text">{{ t(`error.${key}.text`) }}</p>
    <a class="btn btn--primary" :href="localePath('/')" @click.prevent="goHome">{{ t('error.home') }}</a>
  </main>
  <SiteFooter />
</template>

<style scoped>
.page {
  padding-top: clamp(4rem, 14vh, 9rem);
  padding-bottom: var(--section);
  min-height: 70svh;
}
.code {
  font-size: clamp(3.5rem, 9vw, 6rem);
  font-weight: 600;
  line-height: 0.9;
  color: var(--accent-light);
}
h1 { margin-top: 1.5rem; font-size: clamp(2rem, 4.2vw, 3.25rem); }
.text { margin: 1.2rem 0 2.2rem; max-width: 46ch; color: var(--ink-2); font-size: var(--text-md); }
</style>
