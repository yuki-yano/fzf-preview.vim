import { getBuffers } from "@/connector/buffers"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { readFile } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const bufferLines = async (_args: SourceFuncArgs): Promise<Resource> => {
  const buffers = await getBuffers()

  const lines = buffers.reduce((acc: Array<string>, cur) => {
    const fileLines = readFile(cur.fileName)
      .split("\n")
      .map((line, lineIndex) => `${cur.fileName}:${lineIndex + 1}:${line}`)
      .slice(0, -1)

    return [...acc, ...fileLines]
  }, [])

  return { lines }
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
