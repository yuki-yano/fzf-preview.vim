import { getAlternateBuffer, getCurrentBuffer, getOtherBuffers } from "@/connector/buffers"
import { isGitDirectory } from "@/connector/util"
import { filePreviewCommand } from "@/fzf/util"
import { cacheSelector } from "@/module/selector/cache"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { existsFile } from "@/system/file"
import { readMruFile } from "@/system/mr"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs, VimBuffer } from "@/type"
import { alignLists } from "@/util/align"
import { asyncFilter } from "@/util/array"

const bufferToArray = (buffer: VimBuffer) => {
  return [
    `[${buffer.bufnr}] `,
    `${buffer.isAlternate ? "#" : ""}`,
    `${buffer.isCurrent ? "%" : ""}`,
    `${buffer.isModified ? " [+] " : ""}`,
    ` ${buffer.fileName}`,
  ]
}

const existsBuffer = async (buffer: VimBuffer): Promise<boolean> => {
  return await existsFile(buffer.fileName)
}

const getMruFiles = () => {
  if (globalVariableSelector("fzfPreviewUseLookAheadMrCache") !== 0) {
    return cacheSelector().mruFiles
  }
  return readMruFile()
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

  const mruFiles = getMruFiles()

  const sortedBuffers = mruFiles
    .map<VimBuffer | undefined>((file) => otherBuffers.find((buffer) => buffer.fileName === file))
    .filter((buffer): buffer is VimBuffer => buffer != null)

  if (options && options.ignoreCurrentBuffer) {
    return await asyncFilter(Array.from(new Set([alternateBuffer, ...sortedBuffers, ...otherBuffers])), (buffer) =>
      existsBuffer(buffer)
    )
  }
  return await asyncFilter(
    Array.from(new Set([currentBuffer, alternateBuffer, ...sortedBuffers, ...otherBuffers])),
    (buffer) => existsBuffer(buffer)
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
    options: { "--header-lines": (await existsBuffer(await getCurrentBuffer())) ? "1" : "0" },
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
