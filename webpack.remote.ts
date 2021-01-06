import path from "path"
import { DefinePlugin } from "webpack"
import { merge } from "webpack-merge"

import common from "./webpack.common"

export default merge(common, {
  entry: "./src/remote.ts",
  externals: {
    "coc.nvim": "commonjs2 coc.nvim",
  },
  output: {
    path: path.join(__dirname, "rplugin/node/fzf-preview.vim"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  plugins: [
    new DefinePlugin({
      PLUGIN: JSON.stringify({
        ENV: "remote",
      }),
    }),
  ],
})
