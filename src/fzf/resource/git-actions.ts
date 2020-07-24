import { isGitDirectory } from "@/connector/util"
import { GIT_ACTIONS } from "@/const/git"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const gitActions = async (_args: SourceFuncArgs): Promise<Resource> => {
  if (!(await isGitDirectory())) {
    throw new Error("The current directory is not a git project")
  }

  return {
    type: "json",
    lines: GIT_ACTIONS.map((action) => ({
      data: {
        command: "FzfPreviewGitActions",
        type: "git-actions",
        action,
      },
      displayText: action,
    })),
  }
}

export const gitActionsDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"GitActions> "',
  "--preview": `"${globalVariableSelector("fzfPreviewScriptDir") as string}/git_actions_preview {-1}"`,
  "--preview-window": '"down:50%"',
})
