import { devServer } from "@cypress/vite-dev-server";
import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    setupNodeEvents(on, config) {
      on("dev-server:start", (options) => {
        return devServer({
          ...options,
          viteConfig: require("./vite.config"),
        });
      });

      return config;
    },
    baseUrl: "http://localhost:3000",
  },
});
