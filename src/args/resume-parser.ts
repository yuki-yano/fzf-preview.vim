import { argsParser } from "@/args/parser"
import { loadResume } from "@/module/persist"
import { resumeSelector } from "@/module/selector/resume"
import { dispatch } from "@/store"
import type { FzfCommandName, ResumeQuery } from "@/type"

export const parseResume = async (commandName: FzfCommandName, args: string): Promise<ResumeQuery> => {
  const parser = argsParser()
  const options = parser.parse(args)

  if (options.resume == null) {
    return null
  }

  await dispatch(loadResume())

  const resumeQuery = resumeSelector(commandName)

  return resumeQuery != null ? resumeQuery : null
}
