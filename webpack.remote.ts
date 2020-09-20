import path from "path"
import webpack from "webpack"
import { merge } from "webpack-merge"

import common from "./webpack.common"

module.exports = merge(common, {
  entry: "./src/remote.ts",
  output: {
    path: path.join(__dirname, "rplugin/node/fzf-preview.vim"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  plugins: [
    new webpack.DefinePlugin({
      PLUGIN: JSON.stringify({
        ENV: "remote",
      }),
    }),
  ],
})
