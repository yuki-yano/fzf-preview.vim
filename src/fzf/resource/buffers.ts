import { getAlternateBuffer, getCurrentBuffer, getOtherBuffers } from "@/connector/buffers"
import { isGitDirectory } from "@/connector/util"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { filePreviewCommand } from "@/fzf/util"
import { existsFileAsync } from "@/system/file"
import { readMruFile } from "@/system/mr"
import { filterProjectEnabledFile } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs, VimBuffer } from "@/type"
import { alignLists } from "@/util/align"
import { asyncFilter } from "@/util/array"

const bufferToArray = (buffer: VimBuffer) => {
  if (buffer.isCurrent === true) {
    return [`[${buffer.bufnr}] `, "%", `${buffer.isModified ? " [+] " : ""}`, ` ${buffer.fileName}`]
  }

  return [
    `[${buffer.bufnr}] `,
    `${buffer.isAlternate ? "#" : ""}`,
    `${buffer.isModified ? " [+] " : ""}`,
    ` ${buffer.fileName}`,
  ]
}

// Colorize after align
// If it contains ansi escape, it will not align well
const colorizeArrayedBuffer = (list: Array<string>): string => {
  const [bufnr, symbol, modified, fileName] = list
  if (symbol.includes("%")) {
    return list.join("").trim()
  } else {
    return [colorize(bufnr, "blue"), symbol, colorize(modified, "red"), colorizeFile(fileName)].join("").trim()
  }
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

  const mruFiles = await filterProjectEnabledFile(readMruFile())
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
  const bufferList = await getGitProjectBuffers()
  const displayLines = alignLists(bufferList.map((buffer) => bufferToArray(buffer))).map((list) =>
    colorizeArrayedBuffer(list)
  )

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
  "--keep-right": true,
})
