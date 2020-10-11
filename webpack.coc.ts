import path from "path"
import { DefinePlugin } from "webpack"
import { merge } from "webpack-merge"

import common from "./webpack.common"

export default merge(common, {
  entry: "./src/coc.ts",
  externals: {
    "coc.nvim": "commonjs coc.nvim",
  },
  output: {
    path: path.join(__dirname, "lib"),
    filename: "index.js",
    libraryTarget: "commonjs",
  },
  plugins: [
    new DefinePlugin({
      PLUGIN: JSON.stringify({
        ENV: "coc",
      }),
    }),
  ],
})
