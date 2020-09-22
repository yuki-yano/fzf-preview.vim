import path from "path"

export default {
  target: "node" as const,
  mode: "none" as const,
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
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                sourceMap: true,
              },
            },
          },
        ],
      },
    ],
  },
  stats: {
    warningsFilter: [/yargs/],
  },
  // TODO: yargs v16 bug workaround
  // https://github.com/yargs/yargs/issues/1754
  externals: {
    y18n: "commonjs2 y18n",
    "yargs-parser": "commonjs2 yargs-parser",
  },
  node: {
    __dirname: false,
    __filename: false,
  },
}
