import { getQuickFix } from "@/connector/quickfix-and-locationlist"
import { parseQuickFixAndLocationListLine } from "@/fzf/util"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const quickFix = async (_args: SourceFuncArgs): Promise<Resource> => {
  const resourceLines: ResourceLines = (await getQuickFix()).map((line) => {
    const { fileName, lineNumber, text } = parseQuickFixAndLocationListLine(line)
    return {
      data: {
        command: "FzfPreviewQuickFix",
        type: "line",
        file: fileName,
        text,
        lineNumber,
      },
      displayText: `${fileName}:${lineNumber}:${text}`,
    }
  })

  return {
    type: "json",
    lines: resourceLines,
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {2..}"`
}

export const quickFixDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"QuickFix> "',
  "--multi": true,
  "--preview": previewCommand(),
})
