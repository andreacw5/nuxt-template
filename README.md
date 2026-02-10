# Nuxt Starter Template

A modern, clean Nuxt 4 starter template with Vuetify 3, Pinia state management, and TypeScript support.

## Features

✨ **Modern Stack**
- Nuxt 4
- Vue 3 with Composition API
- Vuetify 3 UI Framework
- TypeScript
- Pinia for state management
- Vue Router

🎨 **Pre-configured Components**
- Professional layout with navigation
- Data table management
- Dialog forms
- User menu with profile options
- Responsive design

📦 **Ready to Customize**
- Generic item management example
- Event management store
- Extensible architecture
- Clean code structure

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

### Generate Static Site

```bash
# Generate static version
npm run generate
```

## Project Structure

```
app/
├── layouts/
│   └── default.vue          # Main layout with navigation and header
├── pages/
│   └── index.vue            # Configuration page with item management
├── stores/
│   ├── plm.ts               # Item and rules state management
│   ├── carePath.ts          # Events state management
│   └── projects.ts          # Projects portfolio (can be removed)
└── assets/
    └── css/
        └── main.css         # Global styles
```

## Key Files

### `/app/stores/plm.ts`
Generic item store with CRUD operations. Contains:
- `Item` interface for data model
- `useItemStore()` - Pinia store for items management
- Default sample data

### `/app/stores/carePath.ts`
Generic event store with CRUD operations. Contains:
- `AppEvent` interface for data model
- `useEventStore()` - Pinia store for events management
- Default sample data

### `/app/layouts/default.vue`
Main application layout including:
- Application header with navigation
- User menu with profile options
- Dialogs for event management
- Responsive sidebar

### `/app/pages/index.vue`
Home page with:
- Data table of items
- Add item dialog
- Delete confirmation
- Item management actions

## Customization

### Adding New Pages

Create a new file in `/app/pages/` (e.g., `events.vue`):

```vue
<script setup lang="ts">
import { useEventStore } from '@/stores/carePath';

const eventStore = useEventStore();
</script>

<template>
  <v-container class="py-12">
    <!-- Your content here -->
  </v-container>
</template>
```

### Modifying the Store

Edit `/app/stores/plm.ts` or `/app/stores/carePath.ts` to change the data model:

```typescript
export interface CustomItem {
  id: number;
  // Add your fields here
}

export const useCustomStore = defineStore('custom', {
  state: () => ({
    items: [] as CustomItem[],
  }),
  actions: {
    // Add your actions here
  },
});
```

### Updating Navigation

Edit `/app/layouts/default.vue` to add new menu items:

```vue
<v-btn
  to="/your-page"
  prepend-icon="mdi-icon-name"
  variant="text"
  color="white"
>
  Your Page
</v-btn>
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run generate` - Generate static site

## Theme Customization

The theme colors are configured in `nuxt.config.ts`. Modify the `vuetify.vuetifyOptions.theme` section:

```typescript
colors: {
  primary: '#1976D2',
  secondary: '#424242',
  error: '#FF5252',
  success: '#4CAF50',
  warning: '#FFC107',
  // ... more colors
}
```

## Docker Support

A `Dockerfile` and `docker-compose.yml` are included for containerized deployment.

### Build and Run with Docker

```bash
# Build the image
docker build -t nuxt-starter .

# Run the container
docker run -p 3000:3000 nuxt-starter

# Or use docker-compose
docker-compose up
```

## License

This template is open source and available under the MIT License.

## Support

For issues and feature requests, please create an issue in the repository.
