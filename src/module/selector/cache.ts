import { State } from "@/module/cache"
import { store } from "@/store"

export const cacheSelector = (): State => store.getState().cache
