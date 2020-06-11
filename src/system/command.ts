import { execSync, SpawnSyncReturns } from "child_process"

import type { CommandResult } from "@/type"

export const execCommand = (command: string): CommandResult => {
  try {
    const stdout = execSync(command, { encoding: "utf-8" })

    return {
      stdout,
      stderr: "",
      status: 0
    }
  } catch (error) {
    const { stdout, stderr, status } = error as SpawnSyncReturns<string>

    return {
      stdout,
      stderr,
      status
    }
  }
}
