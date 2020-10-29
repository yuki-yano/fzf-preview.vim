import { DEFINED_FZF_OPTION_TYPES_IN_PLUGIN } from "@/const/fzf-option"
import type { FzfOptions } from "@/type"

export const joinBind = (
  bind: Array<{
    key: string
    action: string
  }>
): string => {
  return bind.map(({ key, action }) => `${key}:${action}`).join(",")
}

// eslint-disable-next-line complexity
const definedOptionsToArray = (options: FzfOptions) => {
  const arrayOptions: Array<string> = []

  if (options["--ansi"]) {
    arrayOptions.push("--ansi")
  }
  if (options["--bind"] != null && Array.isArray(options["--bind"])) {
    arrayOptions.push(`--bind=${joinBind(options["--bind"])}`)
  } else if (options["--bind"] && typeof options["--bind"] === "string") {
    arrayOptions.push(`--bind=${options["--bind"]}`)
  }
  if (options["--expect"] && Array.isArray(options["--expect"])) {
    if (options["--expect"].length > 0) {
      arrayOptions.push(`--expect="${options["--expect"].join(",")}"`)
    } else {
      arrayOptions.push(`--expect="alt-enter"`)
    }
  } else if (options["--expect"] && typeof options["--expect"] === "string") {
    arrayOptions.push(`--expect=${options["--expect"]}`)
  }

  return arrayOptions
}

const optionsToArray = (options: FzfOptions) => {
  const arrayOptions = definedOptionsToArray(options)

  Object.entries(options)
    .filter(([key]) => !(DEFINED_FZF_OPTION_TYPES_IN_PLUGIN as ReadonlyArray<string>).includes(key))
    .forEach(([key, value]) => {
      if (typeof value !== "string") {
        arrayOptions.push(`${key}`)
      } else {
        arrayOptions.push(`${key}=${value}`)
      }
    })

  return arrayOptions
}

export const fzfOptionsToString = (options: FzfOptions): string => {
  return optionsToArray(options).join(" ")
}
