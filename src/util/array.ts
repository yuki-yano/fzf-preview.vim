export const transpose = <T>(table: Array<Array<T>>) => table[0].map((_, index) => table.map((row) => row[index]))
