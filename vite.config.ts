import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/dominoes-scorecard",
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: ["resolved-fly-deadly.ngrok-free.app"],
  },
});
