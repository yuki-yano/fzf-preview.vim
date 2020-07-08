import { getBuffers } from "@/connector/buffers"
import { filePreviewCommand } from "@/fzf/util"
import type {
  ConvertedLine,
  FzfCommandDefinitionDefaultOption,
  ResourceLines,
  SelectedLine,
  SourceFuncArgs,
} from "@/type"

export const buffers = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const bufferList = (await getBuffers()) as ResourceLines
  return bufferList
}

export const dropBufferPrefix = (line: SelectedLine): ConvertedLine => {
  const result = /\+ (?<fileName>\S+)/.exec(line)
  if (result == null) {
    return line
  }

  if (result.groups) {
    return result.groups.fileName
  }

  throw new Error(`Unexpected buffer line: "${line}"`)
}

export const buffersDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Buffers> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})
