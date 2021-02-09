export const transpose = <T>(table: ReadonlyArray<ReadonlyArray<T>>): ReadonlyArray<ReadonlyArray<T>> =>
  table[0].map((_, index) => table.map((row) => row[index]))

export const asyncFilter = async <T>(
  array: ReadonlyArray<T>,
  asyncCallback: (args: T) => Promise<boolean>
): Promise<ReadonlyArray<T>> => {
  const bits = await Promise.all(array.map(asyncCallback))

  return array.filter((_, i) => bits[i])
}
