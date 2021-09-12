import { pluginCall } from "@/plugin"

export const execHelpTags = async (args: string): Promise<ReadonlyArray<string>> => {
  const runtimeHelpDir = `${process.env.VIMRUNTIME}/doc/*`
  const pluginHelpDir =
    process.env.FZF_PREVIEW_PLUGIN_HELP_ROOT_DIR == null
      ? ""
      : `${process.env.FZF_PREVIEW_PLUGIN_HELP_ROOT_DIR}/**/doc/*`

  const grepCommand = `rg --line-number --no-heading --color=never --sort=path ${args} ${runtimeHelpDir} ${pluginHelpDir}`
  const lines = (await pluginCall("fzf_preview#remote#resource#grep#get", [`${grepCommand}`])) as ReadonlyArray<string>

  return lines
}
