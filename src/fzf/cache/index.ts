import { getProjectRoot } from "@/connector/util"
import { cacheModule } from "@/module/cache"
import { dispatch } from "@/store"

export const cacheProjectRoot = async (): Promise<void> => {
  const projectRoot = await getProjectRoot()
  dispatch(cacheModule.actions.setProjectRoot({ projectRoot }))
}
