import { cacheModule } from "@/module/cache"
import { loadCache, saveStore } from "@/module/persist"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import { dispatch } from "@/store"
import { existsFile } from "@/system/file"
import { appendMruFile, appendMrwFile, readMruFile, readMrwFile } from "@/system/mr"
import { filterProjectEnabledFile, getProjectRoot } from "@/system/project"

export const cacheMr = async (fileName: string): Promise<void> => {
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

export const cacheMrw = async (fileName: string): Promise<void> => {
  await syncVimVariable()
  await dispatch(loadCache())

  const mrwFiles = filterProjectEnabledFile(readMrwFile())
  dispatch(cacheModule.actions.setMrwFiles({ mrwFiles: mrwFiles.filter((file) => existsFile(file)) }))
  dispatch(cacheModule.actions.setProjectMrwFiles({ projectMrwFiles: filterProjectEnabledFile(mrwFiles) }))
  appendMrwFile(fileName)

  await dispatch(saveStore({ modules: ["cache"] }))
}
