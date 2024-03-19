import {defineConfig} from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  jsxFramework: "react",
  include: [
    "./src/**/*.{ts,tsx}",
  ],
  outdir: "styles",
});
