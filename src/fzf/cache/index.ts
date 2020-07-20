import { cacheModule } from "@/module/cache"
import { loadCache, saveStore } from "@/module/persist"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { syncVimVariable } from "@/plugin/sync-vim-variable"
import { dispatch } from "@/store"
import { existsFile } from "@/system/file"
import { readMruFile, readMrwFile } from "@/system/mr"
import { filterProjectEnabledFile, getProjectRoot } from "@/system/project"
import { asyncFilter } from "@/util/array"

export const cacheProjectRoot = async (): Promise<void> => {
  const projectRoot = await getProjectRoot()
  dispatch(cacheModule.actions.setProjectRoot({ projectRoot }))
}

export const cacheMr = async (): Promise<void> => {
  await syncVimVariable()

  if (globalVariableSelector("fzfPreviewUseLookAheadMrCache") === 0) {
    return
  }

  await dispatch(loadCache())

  const mruFiles = readMruFile()
  dispatch(cacheModule.actions.setMruFiles({ mruFiles: await asyncFilter(mruFiles, (file) => existsFile(file)) }))
  dispatch(cacheModule.actions.setProjectMruFiles({ projectMruFiles: await filterProjectEnabledFile(mruFiles) }))

  const mrwFiles = readMrwFile()
  dispatch(cacheModule.actions.setMrwFiles({ mrwFiles: await asyncFilter(mrwFiles, (file) => existsFile(file)) }))
  dispatch(cacheModule.actions.setProjectMrwFiles({ projectMrwFiles: await filterProjectEnabledFile(mrwFiles) }))

  await dispatch(saveStore({ modules: ["cache"] }))
}
