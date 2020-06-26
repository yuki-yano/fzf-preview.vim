import { getBuffers } from "@/connector/buffers"
import { convertForFzf } from "@/connector/convert-for-fzf"
import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { readFile } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const bufferLines = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const bufferList = await getBuffers()

  const lines = bufferList.reduce((acc: Array<string>, cur) => {
    const fileLines = readFile(cur)
      .split("\n")
      .map((line, lineIndex) => `${cur}:${lineIndex + 1} ${line}`)
      .slice(0, -1)

    return [...acc, ...fileLines]
  }, [])

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    const convertedLines = await convertForFzf(lines, { disablePostProcessCommand: true })
    return convertedLines
  } else {
    return lines
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {}"`
}

export const bufferLinesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"BufferLines> "',
  "--multi": true,
  "--preview": previewCommand()
})
