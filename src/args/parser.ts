import yargs from "yargs"

export const argsParser = () => {
  return yargs
    .options("add-fzf-arg", { type: "string" })
    .options("processes", { type: "string" })
    .options("resume", { type: "boolean" })
    .options("session", { type: "string" })
    .options("experimental-fast", { type: "boolean" })
    .parserConfiguration({
      "camel-case-expansion": false,
      "unknown-options-as-args": true,
    })
}
