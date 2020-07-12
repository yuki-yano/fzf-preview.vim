const path = require("path")
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")

module.exports = merge(common, {
  entry: "./src/coc.ts",
  externals: {
    "coc.nvim": "commonjs coc.nvim",
  },
  output: {
    path: path.join(__dirname, "lib"),
    filename: "index.js",
    libraryTarget: "commonjs",
  },
})
