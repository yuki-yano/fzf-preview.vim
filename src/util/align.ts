import printf from "printf"

import { transpose } from "@/util/array"

export const alignLists = (lists: ReadonlyArray<ReadonlyArray<string>>): ReadonlyArray<ReadonlyArray<string>> => {
  if (lists.length === 0) {
    return lists
  }

  const maxes = transpose(lists).map((list) => list.reduce((acc, cur) => Math.max(acc, cur.length), 0))

  return lists.map((list) => list.map((value, i) => printf(`%-${maxes[i]}s`, value)))
}
