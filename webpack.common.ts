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
  node: {
    __dirname: false,
    __filename: false,
  },
}
