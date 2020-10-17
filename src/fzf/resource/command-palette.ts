import { uniqWith } from "lodash"

import { getVimCommandHistory, getVimCommands } from "@/connector/vim-command"
import { colorize } from "@/fzf/syntax/colorize"
import type { FzfCommandDefinitionDefaultOption, Resource, SourceFuncArgs } from "@/type"

export const commandPalette = async (_args: SourceFuncArgs): Promise<Resource> => {
  const commands = await getVimCommands()
  const history = await getVimCommandHistory()

  return {
    type: "json",
    lines: uniqWith([...history, ...commands], (a, b) => a.name === b.name).map((command) => ({
      data: {
        command: "FzfPreviewCommandPalette",
        type: "command-palette",
        name: command.name,
      },
      displayText:
        command.number == null
          ? `${colorize("Command", "cyan")}: ${command.name}`
          : `${colorize("History", "magenta")} ${command.number}: ${command.name}`,
    })),
  }
}

export const commandPaletteDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"CommandPalette> "',
  "--header": '"C-e: Edit"',
})
