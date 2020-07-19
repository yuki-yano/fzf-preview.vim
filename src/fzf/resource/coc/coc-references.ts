import { languages, workspace } from "coc.nvim"

import { getLineFromFile } from "@/connector/util"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { dropFileProtocol, filePathToProjectFilePath } from "@/system/project"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const cocReferences = async (_args: SourceFuncArgs): Promise<Resource> => {
  const { document, position } = await workspace.getCurrentState()

  const ranges = await languages.getSelectionRanges(document, [position])
  const currentSymbol = ranges && ranges[0] ? document.getText(ranges[0].range) : ""

  const locs = await languages.getReferences(document, { includeDeclaration: false }, position)

  const resourceLines = await Promise.all(
    locs.map(async (loc) => {
      const line = loc.range.start.line + 1
      const file = filePathToProjectFilePath(dropFileProtocol(loc.uri))
      if (file == null) {
        return ""
      }
      const text = await getLineFromFile(file, line)
      return `${file}:${line}:  ${text}`
    })
  )

  return {
    lines: resourceLines.filter((line) => line !== ""),
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
