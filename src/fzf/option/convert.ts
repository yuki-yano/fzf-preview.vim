import type { FzfOptions } from "@/type"
import { definedFzfOptionTypesInPlugin } from "@/const/fzf-option"

const joinBind = (options: FzfOptions) => {
  const bind = options["--bind"]
  if (bind === undefined || typeof bind === "string") {
    return ""
  }

  return bind
    .map(({ key, action }) => {
      return `${key}:${action}`
    })
    .join(",")
}

const optionsToArray = (options: FzfOptions) => {
  const arrayOptions: Array<string> = []
  if (options["--ansi"]) {
    arrayOptions.push("--ansi")
  }
  if (options["--bind"] && Array.isArray(options["--bind"])) {
    arrayOptions.push(`--bind=${joinBind(options)}`)
  }
  if (options["--expect"] && Array.isArray(options["--expect"])) {
    arrayOptions.push(`--expect="${options["--expect"].join(",")}"`)
  }

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

export const fzfOptionsToString = (options: FzfOptions) => {
  return optionsToArray(options).join(" ")
}
