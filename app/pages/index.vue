<script setup lang="ts">
const { t } = useI18n()
useSeoMeta({ title: () => t('home.title'), description: () => t('home.description') })
</script>

<template>
  <section class="wrap hero">
    <h1>{{ t('home.title') }}</h1>
    <p>{{ t('home.description') }}</p>
  </section>
</template>

<style scoped>
.hero { padding-block: var(--section); }
h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); }
p { margin-top: 1.2rem; max-width: 46ch; color: var(--ink-2); font-size: var(--text-md); }
</style>
