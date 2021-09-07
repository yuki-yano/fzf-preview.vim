import type { State } from "@/module/file-path"
import { store } from "@/store"

export const filePathSelector = (filePath: string): State[string] | undefined => store.getState().filePath[filePath]
