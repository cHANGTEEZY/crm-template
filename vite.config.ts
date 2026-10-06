import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  preview: {
    allowedHosts: true,
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: "@/public",
        replacement: fileURLToPath(new URL("./public", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  plugins: [
    tanstackStart(),
    svgr(),
    tailwindcss(),
    viteReact(),
  ],
});
