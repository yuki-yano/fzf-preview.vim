import yargs, { Argv } from "yargs"

export const argsParser = (): Argv => {
  yargs.option("add-fzf-args", { type: "string" })
  yargs.option("processes", { type: "string" })
  yargs.parserConfiguration({
    "camel-case-expansion": false,
    "unknown-options-as-args": true
  })
  return yargs
}
