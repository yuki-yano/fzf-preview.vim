const webpack = require("webpack")
const path = require("path")
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")

module.exports = merge(common, {
  entry: "./src/index.ts",
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
