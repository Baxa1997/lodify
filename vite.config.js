import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8888,
  },
  build: {
    rollupOptions: {
      external: (id) => {
        // Exclude problematic native modules from bundling
        return id.includes('@rollup/rollup-linux-x64-gnu') || 
               id.includes('@rollup/rollup-darwin-x64') ||
               id.includes('@rollup/rollup-win32-x64');
      }
    }
  },
  optimizeDeps: {
    exclude: ['@rollup/rollup-linux-x64-gnu']
  }
});
