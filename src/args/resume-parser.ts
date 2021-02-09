import { argsParser } from "@/args/parser"
import { resumeSelector } from "@/module/selector/resume"
import type { FzfCommandName, ResumeQuery } from "@/type"

export const parseResume = (commandName: FzfCommandName, args: string): ResumeQuery => {
  const parser = argsParser()
  const options = parser.parse(args)

  if (options.resume == null) {
    return null
  }

  const resumeQuery = resumeSelector(commandName)

  return resumeQuery != null ? resumeQuery : null
}
