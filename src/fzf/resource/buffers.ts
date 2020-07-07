import { getBuffers } from "@/connector/buffers"
import { filePreviewCommand } from "@/fzf/util"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const buffers = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const bufferList = (await getBuffers()) as ResourceLines
  return bufferList
}

export const buffersDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Buffers> "',
  "--multi": true,
  "--preview": filePreviewCommand(),
})
