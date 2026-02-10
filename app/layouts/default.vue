<script setup lang="ts">
import { useTheme } from 'vuetify';
import { useThemeStore } from '~/stores/theme';

const route = useRoute();
const { locale, locales, setLocale, t } = useI18n();
const theme = useTheme();
const themeStore = useThemeStore();

const userMenu = ref(false);
const logoutDialog = ref(false);
const dialog = ref(false);

// Inizializza il tema al caricamento
onMounted(() => {
  themeStore.initTheme();
  theme.global.name.value = themeStore.currentTheme;
});

// Osserva i cambiamenti del tema
watch(() => themeStore.isDark, (isDark) => {
  theme.global.name.value = isDark ? 'dark' : 'light';
});

const toggleTheme = () => {
  themeStore.toggleTheme();
};

const handleLogout = () => {
  userMenu.value = false;
  logoutDialog.value = true;
};

const confirmLogout = () => {
  logoutDialog.value = false;
  // Logica di logout
};

const cancelLogout = () => {
  logoutDialog.value = false;
};

const isCurrentPage = (path: string) => {
  return route.path === path;
};

const openAddEventDialog = () => {
  userMenu.value = false;
  dialog.value = true;
};

const changeLanguage = (lang: string) => {
  setLocale(lang as 'en' | 'it');
};

const getLanguageFlag = (lang: string) => {
  const flags: Record<string, string> = {
    'en': '🇬🇧',
    'it': '🇮🇹'
  };
  return flags[lang] || '🌐';
};

const getLanguageName = (lang: string) => {
  const names: Record<string, string> = {
    'en': 'English',
    'it': 'Italiano'
  };
  return names[lang] || lang.toUpperCase();
};

const isMonitoringPage = computed(() => route.path === '/events');
</script>

<template>
  <v-app>
    <!-- App Bar PLM Style -->
    <v-app-bar
      :color="themeStore.isDark ? 'surface' : 'primary'"
      :elevation="themeStore.isDark ? 4 : 2"
      height="64"
    >
      <v-container class="d-flex align-center px-4" fluid>
        <!-- Logo e titolo -->
        <div class="d-flex align-center ga-3 mr-10">
          <v-avatar :color="themeStore.isDark ? 'primary' : 'white'" rounded="lg" size="40">
            <v-icon :color="themeStore.isDark ? 'white' : 'primary'" size="24">mdi-apps</v-icon>
          </v-avatar>
          <span class="text-h6 font-weight-bold" :class="themeStore.isDark ? 'text-on-surface' : 'text-white'">{{ t('app.name') }}</span>
        </div>

        <!-- Navigation Menu -->
        <div class="d-flex align-center ga-1">
          <v-btn
            :class="['nav-item', { 'nav-item--active': isCurrentPage('/') }]"
            to="/"
            class="text-none px-4"
            prepend-icon="mdi-home"
            variant="text"
            :color="themeStore.isDark ? 'on-surface' : 'white'"
            height="64"
            rounded="0"
          >
            {{ t('nav.home') }}
          </v-btn>

          <v-btn
              :class="['nav-item', { 'nav-item--active': isCurrentPage('/events') }]"
              to="/events"
              class="text-none px-4"
              prepend-icon="mdi-calendar"
              variant="text"
              :color="themeStore.isDark ? 'on-surface' : 'white'"
              height="64"
              rounded="0"
          >
            {{ t('nav.events') }}
          </v-btn>

          <v-btn
            :class="['nav-item', { 'nav-item--active': isCurrentPage('/settings') }]"
            to="/settings"
            class="text-none px-4"
            prepend-icon="mdi-cog"
            variant="text"
            :color="themeStore.isDark ? 'on-surface' : 'white'"
            height="64"
            rounded="0"
          >
            {{ t('nav.settings') }}
          </v-btn>
        </div>

        <v-spacer />

        <!-- Theme Switcher -->
        <v-btn
          icon
          @click="toggleTheme"
          variant="text"
          :color="themeStore.isDark ? 'secondary' : 'white'"
          class="mr-2"
        >
          <v-icon>{{ themeStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
          <v-tooltip activator="parent" location="bottom">
            {{ themeStore.isDark ? t('theme.light') : t('theme.dark') }}
          </v-tooltip>
        </v-btn>

        <!-- User Menu -->
        <div class="d-flex align-center ga-4">
          <div class="text-right d-none d-sm-block">
            <div class="text-body-2 font-weight-medium" :class="themeStore.isDark ? 'text-on-surface' : 'text-white'">John Doe</div>
            <div class="text-caption" :style="{ color: themeStore.isDark ? 'rgba(193, 193, 193, 0.8)' : 'rgba(255, 255, 255, 0.8)' }">{{ t('user.role') }}</div>
          </div>

          <v-menu v-model="userMenu" location="bottom end">
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                v-bind="props"
                variant="text"
                :color="themeStore.isDark ? 'on-surface' : 'white'"
              >
                <v-avatar :color="themeStore.isDark ? 'primary' : 'white'" size="36">
                  <v-icon :color="themeStore.isDark ? 'on-primary' : 'primary'">mdi-account</v-icon>
                </v-avatar>
              </v-btn>
            </template>

            <v-list min-width="200">
              <v-list-item>
                <v-list-item-title class="font-weight-medium">John Doe</v-list-item-title>
                <v-list-item-subtitle>{{ t('user.administrator') }}</v-list-item-subtitle>
              </v-list-item>

              <v-divider />

              <v-list-item
                v-if="isMonitoringPage"
                prepend-icon="mdi-plus"
                @click="openAddEventDialog"
                class="text-primary"
              >
                {{ t('dialog.addEvent') }}
              </v-list-item>

              <v-divider v-if="isMonitoringPage" />

              <v-list-item prepend-icon="mdi-account-circle" to="/profile">
                {{ t('user.profile') }}
              </v-list-item>

              <v-list-item prepend-icon="mdi-cog" to="/settings">
                {{ t('user.settings') }}
              </v-list-item>

              <v-divider />

              <v-list-item
                v-for="lang in locales"
                :key="lang.code"
                :value="lang.code"
                :active="locale === lang.code"
                @click="changeLanguage(lang.code)"
                class="language-item"
                density="compact"
                min-height="32"
              >
                <template v-slot:prepend>
                  <div class="language-flag">{{ getLanguageFlag(lang.code) }}</div>
                </template>
                <v-list-item-title class="d-flex align-center justify-space-between text-body-2">
                  <span class="text-caption">{{ getLanguageName(lang.code) }}</span>
                  <v-icon v-if="locale === lang.code" color="primary" size="x-small">
                    mdi-check-circle
                  </v-icon>
                </v-list-item-title>
              </v-list-item>

              <v-divider />

              <v-list-item
                prepend-icon="mdi-logout"
                @click="handleLogout"
                class="text-error"
              >
                {{ t('user.logout') }}
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <slot />
    </v-main>

    <!-- Dialog per aggiungere evento -->
    <v-dialog v-model="dialog" max-width="600">
      <slot name="event-dialog" :dialog="dialog" />
    </v-dialog>

    <!-- Dialog di conferma logout -->
    <v-dialog v-model="logoutDialog" max-width="500">
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-icon class="mr-2" color="warning">mdi-logout</v-icon>
          {{ t('dialog.confirmLogout') }}
        </v-card-title>

        <v-card-text class="pt-4">
          <p class="text-body-1">
            {{ t('dialog.logoutMessage') }}
          </p>
          <p class="text-body-2 text-grey mt-2">
            {{ t('dialog.logoutNote') }}
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="text"
            @click="cancelLogout"
          >
            {{ t('dialog.cancel') }}
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            @click="confirmLogout"
          >
            {{ t('dialog.confirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style scoped>
.nav-item {
  position: relative;
  transition: all 0.3s ease;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: currentColor;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-item--active::after {
  transform: scaleX(1);
}

.nav-item--active {
  background-color: rgba(var(--v-theme-on-surface), 0.12);
  font-weight: 600;
}

.v-theme--light .nav-item--active {
  background-color: rgba(255, 255, 255, 0.15);
}

.nav-item:not(.nav-item--active):hover {
  background-color: rgba(var(--v-theme-on-surface), 0.08);
}

.v-theme--light .nav-item:not(.nav-item--active):hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.nav-item:not(.nav-item--active):hover::after {
  transform: scaleX(0.5);
  opacity: 0.5;
}

.language-item {
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 2px 12px !important;
}

.language-item:hover {
  background-color: rgb(var(--v-theme-primary), 0.12);
}

.language-flag {
  font-size: 14px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-surface-variant));
  transition: all 0.2s ease;
  margin-right: 6px;
}

.language-item:hover .language-flag {
  transform: scale(1.05);
}
</style>

