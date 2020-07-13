import { execAsyncCommand } from "@/system/command"

export const getLineFromFile = async (file: string, line: number): Promise<string> =>
  (await execAsyncCommand(`sed -n ${line}p ${file}`)).stdout.trim()
