import { pluginCall } from "@/plugin"

export const execHelpTags = async (args: string): Promise<ReadonlyArray<string>> => {
  const grepCommand = `rg --line-number --no-heading --color=never --sort=path ${args} ${
    process.env.VIMRUNTIME
  }/doc/* ${
    process.env.FZF_PREVIEW_PLUGIN_HELP_ROOT_DIR !== ""
      ? `${process.env.FZF_PREVIEW_PLUGIN_HELP_ROOT_DIR}/**/doc/*`
      : ""
  }`
  const lines = (await pluginCall("fzf_preview#remote#resource#grep#get", [`${grepCommand}`])) as ReadonlyArray<string>

  return lines
}
