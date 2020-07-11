import { cacheModule } from "@/module/cache"
import { loadCache, saveStore } from "@/module/persist"
import { pluginRegisterAutocmd } from "@/plugin"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import { dispatch } from "@/store"
import { existsFile } from "@/system/file"
import { appendMruFile, appendMrwFile, readMruFile, readMrwFile } from "@/system/mr"
import { filterProjectEnabledFile, getProjectRoot } from "@/system/project"

const cacheMr = async (fileName: string) => {
  await syncVimVariable()
  await dispatch(loadCache())

  const projectRoot = getProjectRoot()
  dispatch(cacheModule.actions.setProjectRoot({ projectRoot }))

  const mruFiles = readMruFile()
  dispatch(cacheModule.actions.setMruFiles({ mruFiles: mruFiles.filter((file) => existsFile(file)) }))
  dispatch(cacheModule.actions.setProjectMruFiles({ projectMruFiles: filterProjectEnabledFile(mruFiles) }))
  appendMruFile(fileName)

  const mrwFiles = readMrwFile()
  dispatch(cacheModule.actions.setMrwFiles({ mrwFiles: mrwFiles.filter((file) => existsFile(file)) }))
  dispatch(cacheModule.actions.setProjectMrwFiles({ projectMrwFiles: filterProjectEnabledFile(mrwFiles) }))

  await dispatch(saveStore({ modules: ["cache"] }))
}

const cacheMrw = async (fileName: string) => {
  await syncVimVariable()
  await dispatch(loadCache())

  const mrwFiles = filterProjectEnabledFile(readMrwFile())
  dispatch(cacheModule.actions.setMrwFiles({ mrwFiles: mrwFiles.filter((file) => existsFile(file)) }))
  dispatch(cacheModule.actions.setProjectMrwFiles({ projectMrwFiles: filterProjectEnabledFile(mrwFiles) }))
  appendMrwFile(fileName)

  await dispatch(saveStore({ modules: ["cache"] }))
}

export const registerAutocmd = (): void => {
  pluginRegisterAutocmd(
    "BufEnter,BufWinEnter,DirChanged",
    async (fileName: string) => {
      if (existsFile(fileName)) {
        await cacheMr(fileName)
      }
    },
    {
      sync: false,
      pattern: "*",
      eval: 'expand("<afile>:p")',
    }
  )

  pluginRegisterAutocmd("VimEnter", cacheMr, {
    sync: false,
    pattern: "*",
    eval: 'expand("<afile>:p")',
  })

  pluginRegisterAutocmd("BufWritePost", cacheMrw, {
    sync: false,
    pattern: "*",
    eval: 'expand("<afile>:p")',
  })
}
