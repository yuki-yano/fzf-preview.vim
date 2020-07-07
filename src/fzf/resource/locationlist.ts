import { getLocationList } from "@/connector/quickfix-and-locationlist"
import { parseQuickFixAndLocationListLine } from "@/fzf/util"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const locationList = async (_args: SourceFuncArgs): Promise<ResourceLines> =>
  (await getLocationList()).map((line) => {
    const { fileName, lineNumber, text } = parseQuickFixAndLocationListLine(line)
    return `${fileName}:${lineNumber}:${text}`
  })

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string
  return `"${grepPreviewCommand} {}"`
}

export const locationListDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"LocationList> "',
  "--multi": true,
  "--preview": previewCommand(),
})
