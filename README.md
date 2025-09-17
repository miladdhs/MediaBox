# MediaBox Component (Vue 3 + Vite)

Modular media box that opens a large panel with an "Add Media" button and supports zoom and rotate. Behavior is driven by a colocated setup file so each project can define its own props/emits and media rules.

## Run

```bash
npm i
npm run dev
```

## Key Files

- `src/components/MediaBox.vue` — reusable component
- `src/setup/mediaBox.setup.ts` — setup contract and defaults
- `src/App.vue` — demo usage

## Setup Contract

```ts
export interface MediaBoxSetup {
  accept: { mime: string[]; extensions: string[] };
  limits: { maxBytes: number };
  transforms: { minScale: number; maxScale: number };
  props?: Record<string, unknown>;
  emits?: string[];
}
```

Example usage:
```ts
import { defaultMediaBoxSetup } from '@/setup/mediaBox.setup';

const setupConfig = {
  ...defaultMediaBoxSetup,
  limits: { maxBytes: 15 * 1024 * 1024 },
  props: { projectName: 'Demo' },
  emits: ['saved']
};
```

## Component API

- Props:
  - `setup: MediaBoxSetup` (required)
  - `v-model` for `File | null`
- Emits: `update:modelValue`, `error`, `added`, `transformed`

Notes: Images and videos supported; validation uses setup extensions and `maxBytes`. RTL-ready.
