import { getAlternateBuffer, getCurrentBuffer, getOtherBuffers } from "@/connector/buffers"
import { isGitDirectory } from "@/connector/util"
import { filePreviewCommand } from "@/fzf/util"
import { existsFileAsync } from "@/system/file"
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
  return await existsFileAsync(buffer.fileName)
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

  if (options && options.ignoreCurrentBuffer) {
    return await asyncFilter(Array.from(new Set([alternateBuffer, ...otherBuffers])), (buffer) => existsBuffer(buffer))
  }
  return await asyncFilter(Array.from(new Set([currentBuffer, alternateBuffer, ...otherBuffers])), (buffer) =>
    existsBuffer(buffer)
  )
}

const createBuffers = (bufferList: Array<VimBuffer>, displayLines: Array<string>): Resource => ({
  type: "json",
  lines: bufferList.map((buffer, i) => ({
    data: {
      command: "FzfPreviewBuffers",
      type: "buffer",
      file: buffer.fileName,
      bufnr: buffer.bufnr,
    },
    displayText: displayLines[i],
  })),
})

export const buffers = async (_args: SourceFuncArgs): Promise<Resource> => {
  // TODO: sort with mru
  if (!(await isGitDirectory())) {
    const bufferList = await getSimpleBuffers()
    const displayLines = alignLists(bufferList.map((buffer) => bufferToArray(buffer))).map((list) =>
      list.join("").trim()
    )

    return createBuffers(bufferList, displayLines)
  }

  const bufferList = await getGitProjectBuffers()
  const displayLines = alignLists(bufferList.map((buffer) => bufferToArray(buffer))).map((list) => list.join("").trim())

  return {
    ...createBuffers(bufferList, displayLines),
    ...{ options: { "--header-lines": (await existsBuffer(await getCurrentBuffer())) ? "1" : "0" } },
  }
}

export const fileFormatBuffers = async (_args: SourceFuncArgs): Promise<Resource> => {
  // TODO: sort with mru
  if (!(await isGitDirectory())) {
    const bufferList = await getSimpleBuffers({ ignoreCurrentBuffer: true })
    const displayLines = bufferList.map((buffer) => buffer.fileName)
    return createBuffers(bufferList, displayLines)
  }

  const bufferList = await getGitProjectBuffers({ ignoreCurrentBuffer: true })
  const displayLines = bufferList.map((buffer) => buffer.fileName)
  return createBuffers(bufferList, displayLines)
}

export const buffersDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Buffers> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})
