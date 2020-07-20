import { execLines } from "@/connector/lines"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { currentFilePath, existsFile } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const lines = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await existsFile(await currentFilePath()))) {
    return { lines: [] }
  }

  return { lines: await execLines(await currentFilePath()) }
}

const previewCommand = async () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} ${await currentFilePath()}:{1}"`
}

export const linesDefaultOptions = async (): Promise<FzfCommandDefinitionDefaultOption> => ({
  "--prompt": '"Lines> "',
  "--multi": true,
  "--preview": await previewCommand(),
})
