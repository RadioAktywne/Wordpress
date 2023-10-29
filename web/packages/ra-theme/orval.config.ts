import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "./api.yaml",
    },
    output: {
      client: "react-query",
      clean: true,
      mode: "split",
      schemas: "./models",
      target: "./api.ts",
      workspace: "./src/api",
    },
  },
});
