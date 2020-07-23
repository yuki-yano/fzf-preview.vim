// import { parseGrepArgs } from "@/args"
// import { execGrep } from "@/connector/grep"
// import { executeCommandModule } from "@/module/execute-command"
// import { executeCommandSelector } from "@/module/selector/execute-command"
// import { globalVariableSelector } from "@/module/selector/vim-variable"
// import { dispatch } from "@/store"
// import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"
// 
// const defaultQuery = () => {
//   const executeCommandExtra = executeCommandSelector().extra
//   if (executeCommandExtra.commandGrep) {
//     return executeCommandExtra.commandGrep.defaultQuery
//   } else {
//     return ""
//   }
// }
// 
// export const projectCommandGrep = async (_args: SourceFuncArgs): Promise<Resource> => {
//   const grepArgs = defaultQuery() === "" ? "." : defaultQuery()
//   const lines = await execGrep(grepArgs)
//   return {
//     lines: lines.map((line) => ({
//       data: {
//         command: "FzfPreviewProjectCommandGrep",
//         type: "line",
//         file: line.split(":")[0],
//         lineNumber: Number(line.split(":")[1]),
//         text: line.split(":")[2],
//       },
//       displayText: line,
//     })),
//   }
// }
// 
// const previewCommand = () => {
//   const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
//   return `"${grepPreviewCommand} {}"`
// }
// 
// export const projectCommandGrepDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
//   "--prompt": '"ProjectCommandGrep> "',
//   "--multi": true,
//   "--preview": previewCommand(),
//   "--no-sort": true,
//   "--delimiter": ":",
//   "--phony": true,
//   // TODO: merge default bind settings
//   "--bind": `change:reload:"${globalVariableSelector("fzfPreviewGrepCmd") as string} {q} || true"`,
//   "--query": `"${defaultQuery()}"`,
// })
// 
// export const dispatchDefaultQueryForCommandGrep = (args: string): void => {
//   dispatch(executeCommandModule.actions.setExtraCommandGrep({ defaultQuery: parseGrepArgs(args).args.join(" ") }))
// }
