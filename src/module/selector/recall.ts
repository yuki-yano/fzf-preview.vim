import type { State } from "@/module/recall"
import { store } from "@/store"

export const recallSelector = (key: keyof State): State[keyof State] => store.getState().recall[key]
