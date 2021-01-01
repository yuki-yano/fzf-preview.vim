import path from "path"
import { DefinePlugin } from "webpack"
import { merge } from "webpack-merge"

import common from "./webpack.common"

export default merge(common, {
  entry: "./src/rpc.ts",
  output: {
    path: path.join(__dirname, "lib"),
    filename: "rpc.js",
    libraryTarget: "commonjs",
  },
  plugins: [
    new DefinePlugin({
      PLUGIN: JSON.stringify({
        ENV: "rpc",
      }),
    }),
  ],
})
