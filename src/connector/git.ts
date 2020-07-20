import { pluginCall } from "@/plugin"
import { execSyncCommand } from "@/system/command"

export const gitAdd = (file: string): void => {
  const { stderr, status } = execSyncCommand(`git add ${file}`)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed: git add ${file}`)
  }
}

export const gitReset = (file: string): void => {
  const { stderr, status } = execSyncCommand(`git reset ${file}`)

  if (stderr !== "" || status !== 0) {
    throw new Error(`Failed: git reset ${file}`)
  }
}

export const gitPatch = async (file: string): Promise<void> => {
  await pluginCall("fzf_preview#remote#consumer#git#patch", [file])
}
