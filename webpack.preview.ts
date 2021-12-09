import fs from "fs"
import path from "path"
import type { Configuration } from "webpack"
import { BannerPlugin } from "webpack"

const preview: Configuration = {
  entry: "./scripts/preview.js",
  output: {
    path: path.join(__dirname, "bin"),
    filename: "preview_fzf_grep",
    libraryTarget: "commonjs",
  },
  target: "node",
  mode: "production",
  resolve: {
    mainFields: ["module", "main"],
    extensions: [".js"],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new BannerPlugin({ banner: "#!/usr/bin/env node\n", raw: true }),
    function addExec(): void {
      this.hooks.done.tap("chmod", () => {
        fs.chmodSync(path.resolve(__dirname, "bin", "preview_fzf_grep"), "755")
      })
    },
  ],
}

export default preview
