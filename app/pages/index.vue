<script setup lang="ts">
import { useItemStore } from '@/stores/index';

const itemStore = useItemStore();

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

useHead({
  title: 'Configuration',
  meta: [
    {
      name: 'description',
      content: 'Item management system'
    }
  ]
});

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

const headers = [
  { title: 'ID', key: 'id', align: 'start' },
  { title: 'Name', key: 'name', align: 'start' },
  { title: 'Description', key: 'description', align: 'start' },
  { title: 'Type', key: 'type', align: 'start' },
  { title: 'Priority', key: 'priority', align: 'start' },
  { title: 'Enabled', key: 'enabled', align: 'center' },
  { title: '', key: 'actions', align: 'center', sortable: false },
] as const;
</script>

<template>
  <v-container class="py-12">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h5 font-weight-bold mb-6">Configuration</h1>

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
                  {{ item.enabled ? 'Enabled' : 'Disabled' }}
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
                    Add
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
          Add New Item
        </v-card-title>

        <v-card-text class="pt-6">
          <v-text-field
            v-model="itemName"
            label="Item Name"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />

          <v-text-field
            v-model="itemDescription"
            label="Description"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />

          <v-text-field
            v-model.number="itemPriority"
            label="Priority"
            type="number"
            min="1"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />

          <v-select
            v-model="itemType"
            :items="typeOptions"
            label="Type"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />

          <v-switch
            v-model="itemEnabled"
            label="Enabled"
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
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            @click="addItem"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog di conferma eliminazione -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-icon class="mr-2" color="error">mdi-alert-circle</v-icon>
          Confirm Delete
        </v-card-title>

        <v-card-text class="pt-4">
          <p class="text-body-1">
            Are you sure you want to delete this item?
          </p>
          <p class="text-body-2 text-grey mt-2">
            This action cannot be undone.
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="text"
            @click="cancelDelete"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            variant="elevated"
            @click="confirmDelete"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
/* Custom styles */
</style>
