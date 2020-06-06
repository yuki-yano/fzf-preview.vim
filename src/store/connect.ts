import { store, Store } from "@/store/store"

type CreateSelector<S, R> = (store: Store) => (s?: S) => R

export const createConnect = <S, R>(
  createSelector: CreateSelector<S, R>,
  process: (selected: R) => void,
  option?: { once: boolean }
) => (s?: S) => {
  const selector = createSelector(store)
  let selected = selector(s)

  const unsubscribe = store.subscribe(() => {
    const newSelected = selector(s)

    if (selected !== newSelected) {
      selected = newSelected
      process(newSelected)
      if (option && option.once) {
        unsubscribe()
      }
    }
  })
}
