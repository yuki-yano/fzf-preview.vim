import { getQuickFix } from "@/connector/quickfix-and-locationlist"
import { parseQuickFixAndLocationListLine } from "@/fzf/util"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const quickFix = async (_args: SourceFuncArgs): Promise<Resource> => {
  const lines = (await getQuickFix()).map((line) => {
    const { fileName, lineNumber, text } = parseQuickFixAndLocationListLine(line)
    return `${fileName}:${lineNumber}:${text}`
  })

  return { lines }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {}"`
}

export const quickFixDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"QuickFix> "',
  "--multi": true,
  "--preview": previewCommand(),
})
