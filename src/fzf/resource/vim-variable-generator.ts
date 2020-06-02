import { VimValue } from "neovim/lib/types/VimValue"

import { store, Store } from "@/store"

type CreateSelector<K> = (store: Store) => (name: K) => VimValue

export const generateFromVimVariables = <K, R>(
  createSelector: CreateSelector<K>,
  generator: (selector: ReturnType<CreateSelector<K>>) => R
) => generator(createSelector(store))
