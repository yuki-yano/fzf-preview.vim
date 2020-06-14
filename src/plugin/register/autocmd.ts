import { pluginRegisterAutocmd } from "@/plugin"
import { appendMruFile, appendMrwFile } from "@/system/mr"

export const registerAutocmd = () => {
  pluginRegisterAutocmd("BufEnter,VimEnter,BufWinEnter,BufWritePost", (fileName: string) => appendMruFile(fileName), {
    sync: false,
    pattern: "*",
    eval: 'expand("<afile>:p")'
  })

  pluginRegisterAutocmd("BufWritePost", (fileName: string) => appendMrwFile(fileName), {
    sync: false,
    pattern: "*",
    eval: 'expand("<afile>:p")'
  })
}
