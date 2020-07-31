import { languages, workspace } from "coc.nvim"

import { getLineFromFile } from "@/connector/util"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { dropFileProtocol, filePathToProjectFilePath } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"

type Reference = {
  file: string
  lineNumber: number
  text: string
}

export const cocReferences = async (_args: SourceFuncArgs): Promise<Resource> => {
  const { document, position } = await workspace.getCurrentState()

  const ranges = await languages.getSelectionRanges(document, [position])
  const currentSymbol = ranges && ranges[0] ? document.getText(ranges[0].range) : ""

  const locs = await languages.getReferences(document, { includeDeclaration: false }, position)

  const references = (
    await Promise.all(
      locs.map(async (loc) => {
        const lineNumber = loc.range.start.line + 1
        const file = filePathToProjectFilePath(dropFileProtocol(loc.uri))
        if (file == null) {
          return ""
        }
        const text = await getLineFromFile(file, lineNumber)
        return { file, lineNumber, text }
      })
    )
  ).filter((reference): reference is Reference => reference !== "")

  const resourceLines: ResourceLines = references.map(({ file, lineNumber, text }) => ({
    data: {
      command: "FzfPreviewCocReferences",
      type: "line",
      file,
      text,
      lineNumber,
    },
    displayText: `${colorizeFile(file)}:${colorize(lineNumber.toString(), "green")}:  ${text}`,
  }))

  return {
    type: "json",
    lines: resourceLines,
    options: { "--header": `"[Symbol] ${currentSymbol}"` },
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {}"`
}

export const cocReferencesDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"References> "',
  "--multi": true,
  "--preview": previewCommand(),
})
