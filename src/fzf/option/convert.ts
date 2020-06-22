import { definedFzfOptionTypesInPlugin } from "@/const/fzf-option"
import type { FzfOptions } from "@/type"

export const joinBind = (
  bind: Array<{
    key: string
    action: string
  }>
): string => {
  return bind.map(({ key, action }) => `${key}:${action}`).join(",")
}

/* eslint-disable complexity */
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
    arrayOptions.push(`--expect="${options["--expect"].join(",")}"`)
  } else if (options["--expect"] && typeof options["--expect"] === "string") {
    arrayOptions.push(`--expect=${options["--expect"]}`)
  }

  return arrayOptions
}
/* eslint-enable complexity */

const optionsToArray = (options: FzfOptions) => {
  const arrayOptions = definedOptionsToArray(options)

  Object.entries(options)
    .filter(([key]) => !(definedFzfOptionTypesInPlugin as ReadonlyArray<string>).includes(key))
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
