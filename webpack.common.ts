import path from "path"
import type { Configuration } from "webpack"

const common: Configuration = {
  target: "node",
  mode: "none",
  resolve: {
    mainFields: ["module", "main"],
    extensions: [".js", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  ignoreWarnings: [{ module: /yargs/ }],
  node: {
    __dirname: false,
    __filename: false,
  },
}

export default common
