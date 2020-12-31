import path from "path"
import { BannerPlugin, DefinePlugin } from "webpack"
import { merge } from "webpack-merge"
import WebpackShellPluginNext from "webpack-shell-plugin-next"

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
    new BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true,
    }),
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ["chmod +x lib/rpc.js"],
      },
    }),
  ],
})
