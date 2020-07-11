import { getBuffers } from "@/connector/buffers"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { readFile } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const bufferLines = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const buffers = await getBuffers()

  return buffers.reduce((acc: Array<string>, cur) => {
    const fileLines = readFile(cur.fileName)
      .split("\n")
      .map((line, lineIndex) => `${cur.fileName}:${lineIndex + 1}:${line}`)
      .slice(0, -1)

    return [...acc, ...fileLines]
  }, [])
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {}"`
}

export const bufferLinesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"BufferLines> "',
  "--multi": true,
  "--preview": previewCommand(),
})
