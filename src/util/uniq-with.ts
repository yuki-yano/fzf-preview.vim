export const uniqWith = <T>(array: Array<T>, comparator: (a: T, b: T) => boolean): Array<T> => {
  return array.reduce((acc: Array<T>, v1: T) => {
    if (!acc.some((v2) => comparator(v1, v2))) {
      acc.push(v1)
    }

    return acc
  }, [])
}
