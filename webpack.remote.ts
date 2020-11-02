import path from "path"
import { DefinePlugin } from "webpack"
import { merge } from "webpack-merge"

import common from "./webpack.common"

export default merge(common, {
  entry: "./src/remote.ts",
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
