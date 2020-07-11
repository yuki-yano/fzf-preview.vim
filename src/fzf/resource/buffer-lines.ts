import { getBuffers } from "@/connector/buffers"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { readFile } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs, VimBuffer } from "@/type"

export const bufferLines = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const rawBuffers = await getBuffers()

  const buffers = rawBuffers.map<VimBuffer>((line) => {
    const splitted = line.split(" ")
    if (splitted[0] === "+") {
      return { fileName: splitted[1], modified: true }
    } else {
      return { fileName: splitted[0], modified: false }
    }
  })

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
