// ====================================================================================
// CONFIGURACIÓN DE ASTRO: astro.config.mjs
// ====================================================================================
// Astro es un framework "agnóstico de UI", lo que significa que puedes integrar
// React, Vue, Svelte o Tailwind mediante integraciones oficiales o plugins de Vite.
//
// 1. @astrojs/react: Habilita el soporte para componentes React dentro de Astro.
//    Solo aquellos marcados con directivas como `client:load` o `client:visible`
//    se hidratarán en el cliente (Arquitectura de Islas).
//
// 2. @tailwindcss/vite: Integra Tailwind CSS v4 directamente en el motor de Vite
//    que Astro utiliza internamente para procesar estilos con máxima velocidad.
// ====================================================================================

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Las integraciones amplían las capacidades de Astro
  integrations: [
    react(),
  ],

  // Astro utiliza Vite por debajo. Aquí inyectamos el plugin oficial de Tailwind v4
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
