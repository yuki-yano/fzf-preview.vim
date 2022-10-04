import { argsParser } from "@/args/parser"

type Experimental = {
  fast: boolean
}

export const parseExperimental = (args: string): Experimental => {
  const parser = argsParser()
  const options = parser.parseSync(args)

  return {
    fast: options["experimental-fast"] != null,
  }
}
