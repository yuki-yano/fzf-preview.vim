import chalk from "chalk"

import type { Color, Diagnostic } from "@/type"

chalk.level = 3

type Options = {
  bold?: boolean
}
export const colorize = (str: string, color: Color, options?: Options): string => {
  const line = chalk[color](str)
  if (options == null) {
    return line
  } else if (options.bold === true) {
    return chalk[color](chalk.bold(line))
  } else {
    return line
  }
}

export const colorizeFile = (filePath: string): string => {
  const splittedFilePath = filePath.split("/")
  if (splittedFilePath.length === 1) {
    return filePath
  } else {
    const file = splittedFilePath.slice(-1).toString()
    const directory = splittedFilePath.slice(0, -1).join("/")

    return `${colorize(`${directory}/`, "cyan")}${file}`
  }
}

// The colorize based on coc-fzf
// REF: https://github.com/antoinemadec/coc-fzf
// MIT: Copyright (c) 2020 Antoine
export const diagnosticToDisplayText = ({ file, lineNumber, severity, message }: Diagnostic): string => {
  const severityColor = {
    Error: "red",
    Warning: "yellow",
    Information: "blue",
    Hint: "cyan",
  } as const

  return `${colorizeFile(file)}:${colorize(lineNumber.toString(), "green")}:  ${colorize(
    severity,
    severityColor[severity] as Color
  )} ${message}`
}

const iconToColor: { [icon: string]: Color } = {
  "": "green",
  "": "magenta",
  "": "yellow",
  "": "blue",
  "": "yellow",
  "": "yellow",
  "": "yellow",
  "": "blue",
  "": "red",
  "": "magenta",
  "": "yellow",
  "": "white",
  "": "cyan",
  "": "green",
  "": "blue",
  "": "blue",
  "": "white",
  "": "yellow",
  "": "magenta",
  "": "magenta",
  "": "magenta",
  λ: "yellow",
  "": "white",
  "": "blue",
  "": "green",
  "": "green",
  "": "red",
  "": "yellow",
  "": "white",
  "": "yellow",
  "": "magenta",
  "": "blue",
  "": "yellow",
  "": "blue",
  "": "yellow",
  "": "red",
  "": "magenta",
  "": "magenta",
  "": "green",
  "": "yellow",
  "": "blue",
  "": "blue",
  "": "magenta",
  "": "white",
}

export const colorizeDevIcon = (icon: string): string => {
  const color = iconToColor[icon] ?? null

  return color != null ? chalk[color](icon) : icon
}
