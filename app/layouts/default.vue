<script setup lang="ts">
const route = useRoute();

const userMenu = ref(false);
const logoutDialog = ref(false);
const dialog = ref(false);

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


const isMonitoringPage = computed(() => route.path === '/events');
</script>

<template>
  <v-app>
    <!-- App Bar PLM Style -->
    <v-app-bar
      color="primary"
      elevation="2"
      height="64"
    >
      <v-container class="d-flex align-center px-4" fluid>
        <!-- Logo e titolo -->
        <div class="d-flex align-center ga-3 mr-10">
          <v-avatar color="white" rounded="lg" size="40">
            <v-icon color="primary" size="24">mdi-apps</v-icon>
          </v-avatar>
          <span class="text-h6 font-weight-bold text-white">MyApp</span>
        </div>

        <!-- Navigation Menu -->
        <div class="d-flex align-center ga-1">
          <v-btn
            :class="['nav-item', { 'nav-item--active': isCurrentPage('/') }]"
            to="/"
            class="text-none px-4"
            prepend-icon="mdi-home"
            variant="text"
            color="white"
            height="64"
            rounded="0"
          >
            Home
          </v-btn>

          <v-btn
              :class="['nav-item', { 'nav-item--active': isCurrentPage('/events') }]"
              to="/events"
              class="text-none px-4"
              prepend-icon="mdi-calendar"
              variant="text"
              color="white"
              height="64"
              rounded="0"
          >
            Events
          </v-btn>

          <v-btn
            :class="['nav-item', { 'nav-item--active': isCurrentPage('/settings') }]"
            to="/settings"
            class="text-none px-4"
            prepend-icon="mdi-cog"
            variant="text"
            color="white"
            height="64"
            rounded="0"
          >
            Settings
          </v-btn>
        </div>

        <v-spacer />

        <!-- User Menu -->
        <div class="d-flex align-center ga-4">
          <div class="text-right d-none d-sm-block">
            <div class="text-body-2 font-weight-medium text-white">John Doe</div>
            <div class="text-caption" style="color: rgba(255, 255, 255, 0.8);">User • Admin</div>
          </div>

          <v-menu v-model="userMenu" location="bottom end">
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                v-bind="props"
                variant="text"
                color="white"
              >
                <v-avatar color="white" size="36">
                  <v-icon color="primary">mdi-account</v-icon>
                </v-avatar>
              </v-btn>
            </template>

            <v-list min-width="200">
              <v-list-item>
                <v-list-item-title class="font-weight-medium">John Doe</v-list-item-title>
                <v-list-item-subtitle>Administrator</v-list-item-subtitle>
              </v-list-item>

              <v-divider />

              <v-list-item
                v-if="isMonitoringPage"
                prepend-icon="mdi-plus"
                @click="openAddEventDialog"
                class="text-primary"
              >
                Add Event
              </v-list-item>

              <v-divider v-if="isMonitoringPage" />

              <v-list-item prepend-icon="mdi-account-circle" to="/profile">
                Profile
              </v-list-item>

              <v-list-item prepend-icon="mdi-cog" to="/settings">
                Settings
              </v-list-item>

              <v-divider />

              <v-list-item
                prepend-icon="mdi-logout"
                @click="handleLogout"
                class="text-error"
              >
                Logout
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
          Confirm Logout
        </v-card-title>

        <v-card-text class="pt-4">
          <p class="text-body-1">
            Are you sure you want to logout from the application?
          </p>
          <p class="text-body-2 text-grey mt-2">
            You will need to login again to use the system.
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="text"
            @click="cancelLogout"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            @click="confirmLogout"
          >
            Logout
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
  background-color: white;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-item--active::after {
  transform: scaleX(1);
}

.nav-item--active {
  background-color: rgba(255, 255, 255, 0.1);
  font-weight: 600;
}

.nav-item:not(.nav-item--active):hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.nav-item:not(.nav-item--active):hover::after {
  transform: scaleX(0.5);
  opacity: 0.5;
}
</style>

