import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // root: 'src',
  server: {
    open: '/index.html',
  },
  plugins: [react()],
});
