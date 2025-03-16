# Vue 3 Project Folder Structure 

## Some features and practices followed

- i18n localization  
- Error boundary  
- Lazy loading  
- Scalable file folder structure  
- Composables  
- Layouts  
- Many more...

## Root-Level Folders & Files
```
/src
  ├── assets/
  ├── components/
  ├── composables/
  ├── interfaces/
  ├── layouts/
  ├── locales/
  ├── router.ts
  ├── utils/
  ├── views/
  ├── App.vue
  ├── main.ts
  ├── shims-vue.d.ts
  ├── site.css
  ├── vite-env.d.ts
  ├── .gitignore
```

---
## Folder Structure Explanation

### 1. **`src/` (Source Directory)**
   - The main directory where all application source files exist.

### 2. **`assets/` (Static Assets)**
   - Contains static files like images, SVGs, and global styles.

### 3. **`components/` (Reusable UI Components)**
   - Contains Vue components that are reusable throughout the app.
   - Structured into subfolders:
     - `custom/`: Core reusable UI components (e.g., buttons, modals, inputs, charts, selects).
     - `general/`: App-specific components like sidebar, table, filters, modals.
   
### 4. **`composables/` (Reusable Logic - Vue Composition API)**
   - Contains custom Composition API functions for better modularity.
   - **Example Composables:**
     - `useCharts.ts` (Chart-related logic)
     - `useFilters.ts` (Filters logic)
     - `useModal.ts` (Modal handling logic)
     - `useProducts.ts` (Product-related logic)

### 5. **`interfaces/` (TypeScript Interfaces & Types)**
   - Contains TypeScript type definitions for objects, props, and API responses.

### 6. **`layouts/` (Application Layouts)**
   - Defines page layouts, such as default layouts, admin layouts, etc.
   - **Example:**
     - `DefaultLayout.vue` (Base layout for most views)

### 7. **`locales/` (Localization & Internationalization)**
   - Contains translation files for different languages.
   - **Example:**
     - `en/` (English translations)
     - `mh/` (Marathi translations)

### 8. **`router.ts` (Vue Router Configuration)**
   - Defines application routes and lazy loading of views for optimization.
   - Consider modularizing routes (e.g., `routes/admin.ts`, `routes/user.ts`) if the app scales.

### 9. **`utils/` (Helper Functions & Utilities)**
   - Stores general-purpose utility functions for reuse across the app.

### 10. **`views/` (Page-Level Components / Routes)**
   - Stores Vue components that represent full pages/views.

---
## Root-Level Files

### **`App.vue`**
   - The root Vue component that wraps the entire application.

### **`main.ts`**
   - Entry point of the Vue application, where the Vue instance is created and mounted.

### **`shims-vue.d.ts`**
   - TypeScript shim for `.vue` files to enable type checking.

### **`site.css`**
   - Global CSS file for styles that apply across the application.

### **`vite-env.d.ts`**
   - TypeScript environment definitions for Vite.

### **`.gitignore`**
   - Specifies files and folders that should be ignored by Git.
