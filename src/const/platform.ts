import { platform } from "os"

export const nullStream = platform() === "win32" ? "nul" : "/dev/null"
