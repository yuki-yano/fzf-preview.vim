import type { ConvertedLine, SelectedLine } from "@/type"

export const convertBlamePr = (line: SelectedLine): ConvertedLine => {
  const result = /^PR #(?<prNumber>\d+)\s/.exec(line)

  if (result == null || result.groups == null) {
    throw new Error(`Not exists PR: "${line}"`)
  }

  return result.groups.prNumber
}
