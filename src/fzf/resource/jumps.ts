import { getJumps } from "@/connector/jumps"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

export const jumps = async (_args: SourceFuncArgs): Promise<Resource> => {
  const resourceLines: ResourceLines = (await getJumps()).map(({ file, line, text }) => {
    return {
      data: {
        command: "FzfPreviewJumps",
        type: "line",
        file,
        text,
        lineNumber: Number(line),
      },
      displayText: `${colorizeFile(file)}:${colorize(line, "green")}:${text}`,
    }
  })

  return {
    type: "json",
    lines: resourceLines,
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} {3..}"`
}

export const jumpsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Jumps> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})
