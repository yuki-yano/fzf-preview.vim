import yargs from "yargs"

export const argsParser = () => {
  yargs.option("add-fzf-args", { type: "string" })
  yargs.option("processors", { type: "string" })
  yargs.parserConfiguration({
    "camel-case-expansion": false,
    "unknown-options-as-args": true
  })
  return yargs
}
