import { parseEmptySourceFuncArgs } from "@/args"
import { commandDefinition, vimCommandOptions } from "@/association/command"
import { convertGrepToFileAndText } from "@/fzf/converter"
import { cocReferences, cocReferencesDefaultOptions } from "@/fzf/resource/coc"

export const cocCommandDefinition = commandDefinition.concat([
  {
    commandName: "FzfPreviewCocReferences",
    sourceFunc: cocReferences,
    convertLine: convertGrepToFileAndText,
    sourceFuncArgsParser: parseEmptySourceFuncArgs,
    vimCommandOptions,
    defaultFzfOptionFunc: cocReferencesDefaultOptions,
    defaultProcessesName: "open-file",
    enableConvertForFzf: true,
    enableDevIcons: true,
    enablePostProcessCommand: false,
  },
])
