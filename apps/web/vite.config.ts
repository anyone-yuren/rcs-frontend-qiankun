import { defineConfig, mergeConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig(
  mergeConfig({
    server: {
      port: 5200,
      proxy: {
        "/api": {
          target: "http://120.79.8.215:5200",
          secure: false,
        },
      },
    },
  })
);
