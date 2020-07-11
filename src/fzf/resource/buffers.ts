import { getBuffers } from "@/connector/buffers"
import { filePreviewCommand } from "@/fzf/util"
import { readMruFile } from "@/system/mr"
import { filterProjectEnabledFile, isGitDirectory } from "@/system/project"
import type {
  ConvertedLine,
  FzfCommandDefinitionDefaultOption,
  ResourceLines,
  SelectedLine,
  SourceFuncArgs,
} from "@/type"

type Buffer = {
  fileName: string
  modified: boolean
}

const bufferToString = (buffer: Buffer) => {
  if (buffer.modified) {
    return `+ ${buffer.fileName}`
  } else {
    return buffer.fileName
  }
}

export const buffers = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const bufferList = (await getBuffers()) as ResourceLines

  // TODO: sort with mru
  if (!isGitDirectory()) {
    return bufferList
  }

  const mruFiles = filterProjectEnabledFile(await readMruFile())

  const bufferFiles = bufferList.map<Buffer>((buffer) => {
    const splitted = buffer.split(" ")
    if (splitted[0] === "+") {
      return { fileName: splitted[1], modified: true }
    } else {
      return { fileName: splitted[0], modified: false }
    }
  })

  const sortedBufferList = mruFiles
    .map<Buffer | undefined>((file) => bufferFiles.find((buffer) => buffer.fileName === file))
    .filter((buffer): buffer is Buffer => buffer != null)

  return Array.from(new Set(sortedBufferList.concat(bufferFiles))).map((buffer) => bufferToString(buffer))
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
