import { getOutline } from "@/connector/coc"
import { colorize, colorizeFile } from "@/fzf/syntax/colorize"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, ResourceLines, SourceFuncArgs } from "@/type"
import { alignLists } from "@/util/align"

const colorizeOutline = (list: ReadonlyArray<string>): string => {
  const [file, lineNumber, kind, text] = list

  return `${colorizeFile(file)}:${colorize(lineNumber, "green")} ${colorize(kind, "red")}${text}`
}

export const cocOutline = async (_args: SourceFuncArgs): Promise<Resource> => {
  const outline = await getOutline()
  const displayLines = alignLists(
    outline.map(({ kind, label, file, lineNumber }) => [
      `${file}`,
      `${lineNumber.toString()}:`,
      kind != null ? `[${kind}]` : "",
      ` ${label.split("\t")[0]}`,
    ])
  ).map((line) => colorizeOutline(line))

  const resourceLines: ResourceLines = outline.map(({ file, lineNumber, text }, i) => ({
    data: {
      command: "FzfPreviewCocOutline",
      type: "line",
      file,
      text,
      lineNumber,
    },
    displayText: displayLines[i],
  }))

  return {
    type: "json",
    lines: resourceLines,
  }
}

const previewCommand = () => {
  const grepPreviewCommand = globalVariableSelector("fzfPreviewGrepPreviewCmd") as string

  return `"${grepPreviewCommand} {3..}"`
}

export const cocOutlineDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Outline> "',
  "--multi": true,
  "--preview": previewCommand(),
  "--preview-window": '"+{2}-10"',
  "--with-nth": '"3.."',
  "--nth": '"4.."',
})
