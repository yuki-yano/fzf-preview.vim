import { State } from "@/module/environment"
import { store } from "@/store"

export const environmentSelector = (): State => store.getState().environment
