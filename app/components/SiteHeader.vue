<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { siteName } = useRuntimeConfig().public
</script>

<template>
  <a class="skip" href="#main">{{ t('nav.skip') }}</a>
  <header class="hdr">
    <nav class="wrap bar" :aria-label="t('nav.main')">
      <NuxtLink :to="localePath('/')" class="brand">{{ siteName }}</NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.skip {
  position: absolute;
  left: 1rem;
  top: -4rem;
  z-index: 100;
  padding: 0.6rem 1rem;
  background: var(--accent);
  color: var(--on-accent);
  border-radius: var(--r-sm);
  font-weight: 600;
}
.skip:focus { top: 1rem; }

.hdr {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg);
  border-bottom: 1px solid var(--hair);
}
/* Short viewports (landscape phones, 400% zoom): a fixed bar would cover a third of the screen. */
@media (max-height: 500px) { .hdr { position: static; } }

.bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-height: 4rem;
}
.brand {
  color: var(--ink);
  text-decoration: none;
  font-weight: 800;
  font-size: 1.2rem;
  letter-spacing: -0.02em;
  margin-right: auto;
}
</style>
