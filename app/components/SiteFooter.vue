<script setup lang="ts">
const { t, locale, locales, setLocaleCookie } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const colorMode = useColorMode()
const light = computed(() => colorMode.value === 'light')
const toggleTheme = () => { colorMode.preference = light.value ? 'dark' : 'light' }
</script>

<template>
  <footer class="ftr">
    <div class="wrap row">
      <div class="lang" role="group" :aria-label="t('footer.language')">
        <!-- The cookie goes first, or / would bounce an English visitor back to /en. -->
        <NuxtLink
          v-for="l in locales"
          :key="l.code"
          :to="switchLocalePath(l.code)"
          :lang="l.code"
          :hreflang="l.code"
          :aria-current="locale === l.code ? 'true' : undefined"
          :aria-label="l.name"
          @click="setLocaleCookie(l.code)"
        >
          {{ l.code.toUpperCase() }}
        </NuxtLink>
      </div>
      <!-- The server can't know the OS theme on a first visit: render the toggle on the client only.
           The placeholder keeps the row from shifting. -->
      <ClientOnly>
        <template #fallback><span class="theme" aria-hidden="true" /></template>
        <button type="button" class="theme" :aria-label="t(light ? 'nav.toDark' : 'nav.toLight')" :title="t(light ? 'nav.toDark' : 'nav.toLight')" @click="toggleTheme">
          <svg v-if="light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" /></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        </button>
      </ClientOnly>
    </div>
  </footer>
</template>

<style scoped>
.ftr {
  border-top: 1px solid var(--hair);
  padding: 2rem 0;
  color: var(--ink-3);
  font-size: var(--text-label);
}
.row { display: flex; align-items: center; gap: 0.6rem; }
.lang { display: inline-flex; gap: 0.2rem; }
.lang a {
  font-weight: 600;
  padding: 0.1rem 0.45rem;
  border: 1px solid transparent;
  border-radius: var(--r-sm);
  color: var(--ink-3);
  text-decoration: none;
}
.lang a:hover { color: var(--accent-light); }
.lang a[aria-current] { color: var(--ink); border-color: var(--hair); }
.theme {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid transparent;
  border-radius: var(--r-sm);
  background: none;
  color: var(--ink-3);
  cursor: pointer;
}
.theme:hover { color: var(--accent-light); border-color: var(--hair); }
.theme svg { width: 1.1em; height: 1.1em; }
/* Touch: 44px targets. */
@media (pointer: coarse) {
  .lang a, .theme { display: inline-grid; place-items: center; min-width: 44px; min-height: 44px; }
}
</style>
