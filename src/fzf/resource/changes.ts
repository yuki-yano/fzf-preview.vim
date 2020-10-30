import { getChanges } from "@/connector/changes"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { getCurrentFilePath } from "@/system/file"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const SPACER = "  "

export const changes = async (_args: SourceFuncArgs): Promise<Resource> => {
  const changeList = (await getChanges()).map((change) => {
    const result = /^(?<lineNumber>\d+)\s(?<text>.*)/.exec(change)

    if (result?.groups == null) {
      throw new Error(`Changes line is invalid: "${change}"`)
    }
    const { lineNumber, text } = result.groups

    return { lineNumber: Number(lineNumber), text }
  })

  const currentFile = await getCurrentFilePath()
  const displayTextList = alignLists(
    changeList.map(({ lineNumber, text }) => [lineNumber.toString(), text])
  ).map((change) => change.join(SPACER).trim())

  const resourceLines: ResourceLines = changeList.map(({ lineNumber, text }, i) => {
    return {
      data: {
        command: "FzfPreviewChanges",
        type: "line",
        file: currentFile,
        text,
        lineNumber,
      },
      displayText: displayTextList[i],
    }
  })

  return {
    type: "json",
    lines: resourceLines,
  }
}

const previewCommand = async () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} ${await getCurrentFilePath()}:{2..}"`
}

export const changesDefaultOptions = async (): Promise<FzfCommandDefinitionDefaultOption> => ({
  "--prompt": '"Changes> "',
  "--multi": true,
  "--preview": await previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
})
