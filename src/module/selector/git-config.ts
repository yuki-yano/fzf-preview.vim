import type { State } from "@/module/git-config"
import { store } from "@/store"

export const gitConfigSelector = (name: keyof State): State[typeof name] => store.getState().gitConfig[name]
