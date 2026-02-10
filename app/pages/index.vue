<script setup lang="ts">
import { useItemStore } from '~/stores';
import { useThemeStore } from '~/stores/theme';

const { t } = useI18n();
const itemStore = useItemStore();
const themeStore = useThemeStore();

const dialog = ref(false);
const deleteDialog = ref(false);
const itemToDelete = ref<number | null>(null);

const itemName = ref('');
const itemDescription = ref('');
const itemEnabled = ref(true);
const itemType = ref('');
const itemPriority = ref(1);

const typeOptions = [
  'Type A',
  'Type B',
  'Type C',
  'Type D',
];

useHead(() => ({
  title: t('configuration.title'),
}));

useSeoMeta({
  title: t('seo.title'),
  description: t('seo.description'),
  ogTitle: t('seo.ogTitle'),
  ogDescription: t('seo.ogDescription'),
  ogType: 'website',
  ogImage: t('seo.ogImage'),
  twitterCard: 'summary_large_image',
})

const addItem = () => {
  if (itemName.value && itemDescription.value && itemType.value) {
    itemStore.addItem(itemName.value, itemDescription.value, itemEnabled.value, itemType.value, itemPriority.value);
    dialog.value = false;
    resetForm();
  }
};

const deleteItem = (id: number) => {
  itemToDelete.value = id;
  deleteDialog.value = true;
};

const confirmDelete = () => {
  if (itemToDelete.value !== null) {
    itemStore.removeItem(itemToDelete.value);
    deleteDialog.value = false;
    itemToDelete.value = null;
  }
};

const cancelDelete = () => {
  deleteDialog.value = false;
  itemToDelete.value = null;
};

const resetForm = () => {
  itemName.value = '';
  itemDescription.value = '';
  itemEnabled.value = true;
  itemType.value = '';
  itemPriority.value = 1;
};

const headers = computed(() => [
  { title: t('configuration.table.id'), key: 'id', align: 'start' },
  { title: t('configuration.table.name'), key: 'name', align: 'start' },
  { title: t('configuration.table.description'), key: 'description', align: 'start' },
  { title: t('configuration.table.type'), key: 'type', align: 'start' },
  { title: t('configuration.table.priority'), key: 'priority', align: 'start' },
  { title: t('configuration.table.enabled'), key: 'enabled', align: 'center' },
  { title: t('configuration.table.actions'), key: 'actions', align: 'center', sortable: false },
] as const);
</script>

<template>
  <v-container class="py-12">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h5 font-weight-bold mb-6">{{ t('configuration.title') }}</h1>

        <v-card elevation="2">
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :items="itemStore.items"
              :items-per-page="10"
              class="elevation-0"
            >
              <template v-slot:item.enabled="{ item }">
                <v-chip
                  :color="item.enabled ? 'success' : 'error'"
                  size="small"
                  @click="item.enabled = !item.enabled"
                  style="cursor: pointer;"
                >
                  {{ item.enabled ? t('configuration.status.enabled') : t('configuration.status.disabled') }}
                </v-chip>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn
                  icon="mdi-delete"
                  size="small"
                  color="error"
                  variant="text"
                  @click="deleteItem(item.id)"
                />
              </template>

              <template v-slot:bottom>
                <div class="pa-4 d-flex justify-end">
                  <v-btn
                    color="primary"
                    prepend-icon="mdi-plus"
                    @click="dialog = true"
                  >
                    {{ t('configuration.add') }}
                  </v-btn>
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog per aggiungere item -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="bg-primary text-white d-flex align-center">
          <v-icon class="mr-2" color="white">mdi-plus</v-icon>
          {{ t('configuration.addNewItem') }}
        </v-card-title>

        <v-card-text class="pt-6">
          <v-text-field
            v-model="itemName"
            :label="t('configuration.form.itemName')"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />

          <v-text-field
            v-model="itemDescription"
            :label="t('configuration.form.description')"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />

          <v-text-field
            v-model.number="itemPriority"
            :label="t('configuration.form.priority')"
            type="number"
            min="1"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />

          <v-select
            v-model="itemType"
            :items="typeOptions"
            :label="t('configuration.form.type')"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />

          <v-switch
            v-model="itemEnabled"
            :label="t('configuration.form.enabled')"
            color="primary"
            hide-details
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="text"
            @click="dialog = false"
          >
            {{ t('dialog.cancel') }}
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            @click="addItem"
          >
            {{ t('configuration.add') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog di conferma eliminazione -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-icon class="mr-2" color="error">mdi-alert-circle</v-icon>
          {{ t('configuration.confirmDelete') }}
        </v-card-title>

        <v-card-text class="pt-4">
          <p class="text-body-1">
            {{ t('configuration.deleteMessage') }}
          </p>
          <p class="text-body-2 text-grey mt-2">
            {{ t('configuration.deleteNote') }}
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="text"
            @click="cancelDelete"
          >
            {{ t('dialog.cancel') }}
          </v-btn>
          <v-btn
            color="error"
            variant="elevated"
            @click="confirmDelete"
          >
            {{ t('configuration.delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
/* Custom styles */
</style>
