import type { FzfOptions } from "@/type"
import { definedFzfOptionTypesInPlugin } from "@/const/fzf-option"

export const joinBind = (options: FzfOptions) => {
  const bind = options["--bind"]
  if (!Array.isArray(bind)) {
    return ""
  }

  return bind
    .map(({ key, action }) => {
      return `${key}:${action}`
    })
    .join(",")
}

/* eslint-disable complexity */
const definedOptionsToArray = (options: FzfOptions) => {
  const arrayOptions: Array<string> = []

  if (options["--ansi"]) {
    arrayOptions.push("--ansi")
  }
  if (options["--bind"] && Array.isArray(options["--bind"])) {
    arrayOptions.push(`--bind=${joinBind(options)}`)
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

export const fzfOptionsToString = (options: FzfOptions) => {
  return optionsToArray(options).join(" ")
}
