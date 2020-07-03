import { execLines } from "@/connector/lines"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { currentFilePath, existsFile } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const lines = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  if (!existsFile(await currentFilePath())) {
    return []
  }

  return execLines(await currentFilePath())
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
