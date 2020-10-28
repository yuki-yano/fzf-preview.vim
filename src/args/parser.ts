import type { Argv } from "yargs"
import yargs from "yargs"

export const argsParser = (): Argv => {
  yargs.option("add-fzf-arg", { type: "string" })
  yargs.option("processes", { type: "string" })
  yargs.option("resume", { type: "boolean" })
  yargs.option("session", { type: "string" })
  yargs.parserConfiguration({
    "camel-case-expansion": false,
    "unknown-options-as-args": true,
  })

  return yargs
}
