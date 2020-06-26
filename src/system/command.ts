import { execSync, SpawnSyncReturns } from "child_process"

import { GREP_MAX_BUFFER_SIZE } from "@/const/system"
import type { CommandResult } from "@/type"

export const execCommand = (command: string): CommandResult => {
  try {
    const stdout = execSync(command, { encoding: "utf-8", maxBuffer: GREP_MAX_BUFFER_SIZE })

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
