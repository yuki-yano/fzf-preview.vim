import ansi from "ansi-escape-sequences"
import { find } from "lodash"

import type { Color, Diagnostic } from "@/type"

const colorCode = {
  reset: ansi.style.reset,
  black: ansi.style.black,
  red: ansi.style.red,
  green: ansi.style.green,
  yellow: ansi.style.yellow,
  blue: ansi.style.blue,
  magenta: ansi.style.magenta,
  cyan: ansi.style.cyan,
  white: ansi.style.white,
} as const

type Options = {
  bold?: boolean
}
export const colorize = (str: string, color: Color, options?: Options): string => {
  const line = `${colorCode[color]}${str}${colorCode.reset}`
  if (options == null) {
    return line
  } else if (options.bold) {
    return `${ansi.style.bold}${line}${ansi.style.reset}`
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

type DevIcons = {
  [key: string]: {
    icon: string
    color: Color
  }
}

const extensions: DevIcons = {
  styl: { icon: "", color: "green" },
  // sass: { icon: "", color: 'white', },
  scss: { icon: "", color: "magenta" },
  // htm: { icon: "", color: 'magenta', },
  html: { icon: "", color: "yellow" },
  // slim: { icon: "", color: guiColors.orange, },
  // ejs: { icon: "", color: 'yellow', },
  css: { icon: "", color: "blue" },
  // less: { icon: "", color: 'blue', },
  md: { icon: "", color: "yellow" },
  // markdown: { icon: "", color: 'yellow', },
  // rmd: { icon: "", color: 'white', },
  json: { icon: "", color: "yellow" },
  js: { icon: "", color: "yellow" },
  mjs: { icon: "", color: "yellow" },
  jsx: { icon: "", color: "blue" },
  rb: { icon: "", color: "red" },
  php: { icon: "", color: "magenta" },
  py: { icon: "", color: "yellow" },
  pyc: { icon: "", color: "yellow" },
  pyo: { icon: "", color: "yellow" },
  pyd: { icon: "", color: "yellow" },
  // coffee: { icon: "", color: guiColors.brown },
  // mustache: { icon: "", color: guiColors.orange },
  // hbs: { icon: "", color: guiColors.orange },
  conf: { icon: "", color: "white" },
  ini: { icon: "", color: "white" },
  yml: { icon: "", color: "white" },
  yaml: { icon: "", color: "white" },
  bat: { icon: "", color: "white" },
  toml: { icon: "", color: "white" },
  jpg: { icon: "", color: "cyan" },
  jpeg: { icon: "", color: "cyan" },
  bmp: { icon: "", color: "cyan" },
  png: { icon: "", color: "cyan" },
  gif: { icon: "", color: "cyan" },
  ico: { icon: "", color: "cyan" },
  twig: { icon: "", color: "green" },
  cpp: { icon: "", color: "blue" },
  cxx: { icon: "", color: "blue" },
  cc: { icon: "", color: "blue" },
  cp: { icon: "", color: "blue" },
  c: { icon: "", color: "blue" },
  h: { icon: "", color: "white" },
  hpp: { icon: "", color: "white" },
  hxx: { icon: "", color: "white" },
  hs: { icon: "", color: "yellow" },
  lhs: { icon: "", color: "yellow" },
  lua: { icon: "", color: "magenta" },
  java: { icon: "", color: "magenta" },
  sh: { icon: "", color: "magenta" },
  // fish: { icon: "", color: 'green', },
  // bash: { icon: "", color: 'white', },
  // zsh: { icon: "", color: 'white', },
  // ksh: { icon: "", color: 'white', },
  // csh: { icon: "", color: 'white', },
  // awk: { icon: "", color: 'white', },
  // ps1: { icon: "", color: 'white', },
  ml: { icon: "λ", color: "yellow" },
  mli: { icon: "λ", color: "yellow" },
  diff: { icon: "", color: "white" },
  // db: { icon: "", color: 'blue', },
  sql: { icon: "", color: "blue" },
  // dump: { icon: "", color: 'blue', },
  clj: { icon: "", color: "green" },
  cljc: { icon: "", color: "green" },
  cljs: { icon: "", color: "green" },
  edn: { icon: "", color: "green" },
  scala: { icon: "", color: "red" },
  go: { icon: "", color: "yellow" },
  dart: { icon: "", color: "white" },
  xul: { icon: "", color: "yellow" },
  sln: { icon: "", color: "magenta" },
  suo: { icon: "", color: "magenta" },
  pl: { icon: "", color: "blue" },
  pm: { icon: "", color: "blue" },
  t: { icon: "", color: "blue" },
  rss: { icon: "", color: "yellow" },
  fsscript: { icon: "", color: "blue" },
  fsx: { icon: "", color: "blue" },
  fs: { icon: "", color: "blue" },
  fsi: { icon: "", color: "blue" },
  rs: { icon: "", color: "yellow" },
  rlib: { icon: "", color: "yellow" },
  d: { icon: "", color: "red" },
  erl: { icon: "", color: "magenta" },
  ex: { icon: "", color: "magenta" },
  exs: { icon: "", color: "magenta" },
  eex: { icon: "", color: "magenta" },
  // hrl: { icon: "", color: guiColors.pink },
  vim: { icon: "", color: "green" },
  ai: { icon: "", color: "yellow" },
  psd: { icon: "", color: "blue" },
  psb: { icon: "", color: "blue" },
  ts: { icon: "", color: "blue" },
  tsx: { icon: "", color: "blue" },
  jl: { icon: "", color: "magenta" },
  pp: { icon: "", color: "white" },
  vue: { icon: "﵂", color: "green" },
} as const

export const colorizeDevIcon = (icon: string): string => {
  const colorIcon = find(Object.values(extensions), ({ icon: devIcon }) => icon === devIcon)

  return colorIcon != null ? `${colorCode[colorIcon.color]}${icon}${colorCode.reset}` : icon
}
