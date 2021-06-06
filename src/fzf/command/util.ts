import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { ResourceLines } from "@/type"

export const getEnableDevIcons = (resourceLines: ResourceLines, enableDevIconsCommandSetting: boolean): boolean => {
  return (
    enableDevIconsCommandSetting &&
    globalVariableSelector("fzfPreviewUseDevIcons") !== 0 &&
    globalVariableSelector("fzfPreviewDevIconsLimit") > resourceLines.length
  )
}
