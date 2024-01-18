import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/particle/",
  publicDir: "/particle/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // css预处理器
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/css/custom.scss";',
      },
    },
  },
});
