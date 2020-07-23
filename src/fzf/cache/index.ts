import { getProjectRoot, isGitDirectory } from "@/connector/util"
import { cacheModule } from "@/module/cache"
import { dispatch } from "@/store"

export const cacheProjectRoot = async (): Promise<void> => {
  if (await isGitDirectory()) {
    const projectRoot = await getProjectRoot()
    dispatch(cacheModule.actions.setProjectRoot({ projectRoot }))
  } else {
    dispatch(cacheModule.actions.setProjectRoot({ projectRoot: "" }))
  }
}
