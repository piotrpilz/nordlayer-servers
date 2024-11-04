/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import vitePluginSvgr from 'vite-plugin-svgr'
import legacy from "@vitejs/plugin-legacy"


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: [
        'regenerator-runtime/runtime',
        'whatwg-fetch',
        'abortcontroller-polyfill'
      ],
    }),
    react(),
    vitePluginSvgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setup-tests.ts',
    watch: false,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      './src/e2e/**',
    ],
  }
})
