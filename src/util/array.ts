export const transpose = <T>(table: Array<Array<T>>): Array<Array<T>> =>
  table[0].map((_, index) => table.map((row) => row[index]))

export const asyncFilter = async <T>(
  array: Array<T>,
  asyncCallback: (args: T) => Promise<boolean>
): Promise<Array<T>> => {
  const bits = await Promise.all(array.map(asyncCallback))

  return array.filter((_, i) => bits[i])
}
