import { getAlternateBuffer, getCurrentBuffer, getOtherBuffers } from "@/connector/buffers"
import { isGitDirectory } from "@/connector/util"
import { filePreviewCommand } from "@/fzf/util"
import { cacheSelector } from "@/module/selector/cache"
import { existsFile } from "@/system/file"
import type {
  ConvertedLine,
  FzfCommandDefinitionDefaultOption,
  Resource,
  SelectedLine,
  SourceFuncArgs,
  VimBuffer,
} from "@/type"
import { alignLists } from "@/util/align"

const bufferToArray = (buffer: VimBuffer) => {
  return [
    `[${buffer.bufnr}] `,
    `${buffer.isAlternate ? "#" : ""}`,
    `${buffer.isCurrent ? "%" : ""}`,
    `${buffer.isModified ? " [+] " : ""}`,
    ` ${buffer.fileName}`,
  ]
}

const existsBuffer = (buffer: VimBuffer): boolean => {
  return existsFile(buffer.fileName)
}

const getSimpleBuffers = async (options?: { ignoreCurrentBuffer: boolean }) => {
  const currentBuffer = await getCurrentBuffer()
  const alternateBuffer = await getAlternateBuffer()
  const otherBuffers = await getOtherBuffers()

  if (options && options.ignoreCurrentBuffer) {
    return [alternateBuffer, ...otherBuffers]
  }
  return [currentBuffer, alternateBuffer, ...otherBuffers]
}

const getGitProjectBuffers = async (options?: { ignoreCurrentBuffer: boolean }) => {
  const currentBuffer = await getCurrentBuffer()
  const alternateBuffer = await getAlternateBuffer()
  const otherBuffers = await getOtherBuffers()

  const { mruFiles } = cacheSelector()

  const sortedBuffers = mruFiles
    .map<VimBuffer | undefined>((file) => otherBuffers.find((buffer) => buffer.fileName === file))
    .filter((buffer): buffer is VimBuffer => buffer != null)

  if (options && options.ignoreCurrentBuffer) {
    return Array.from(new Set([alternateBuffer, ...sortedBuffers, ...otherBuffers])).filter((buffer) =>
      existsBuffer(buffer)
    )
  }
  return Array.from(new Set([currentBuffer, alternateBuffer, ...sortedBuffers, ...otherBuffers])).filter((buffer) =>
    existsBuffer(buffer)
  )
}

export const buffers = async (_args: SourceFuncArgs): Promise<Resource> => {
  // TODO: sort with mru
  if (!(await isGitDirectory())) {
    const alignedLists = alignLists((await getSimpleBuffers()).map((buffer) => bufferToArray(buffer)))
    return { lines: alignedLists.map((list) => list.join("").trim()) }
  }

  const alignedLists = alignLists((await getGitProjectBuffers()).map((buffer) => bufferToArray(buffer)))

  return {
    lines: alignedLists.map((list) => list.join("").trim()),
    options: { "--header-lines": existsBuffer(await getCurrentBuffer()) ? "1" : "0" },
  }
}

export const fileFormatBuffers = async (_args: SourceFuncArgs): Promise<Resource> => {
  // TODO: sort with mru
  if (!(await isGitDirectory())) {
    return { lines: (await getSimpleBuffers({ ignoreCurrentBuffer: true })).map((buffer) => buffer.fileName) }
  }

  return {
    lines: (await getGitProjectBuffers({ ignoreCurrentBuffer: true })).map((buffer) => buffer.fileName),
  }
}

export const buffersDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Buffers> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})
